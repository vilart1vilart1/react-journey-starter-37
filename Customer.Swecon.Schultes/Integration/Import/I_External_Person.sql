SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @count bigint;
	DECLARE @TableName NVARCHAR(100);
			
	BEGIN TRY
		SET @TableName = '[CRM].[Person]';

		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------	
		BEGIN
			IF OBJECT_ID('tempdb..#ContactImport') IS NOT NULL DROP TABLE #ContactImport
			CREATE TABLE #ContactImport (Change NVARCHAR(100),
												ContactId UNIQUEIDENTIFIER,
												LegacyId NVARCHAR(100),
												LegacyVersion BIGINT)

			IF OBJECT_ID('tempdb..#Person') IS NOT NULL DROP TABLE #Person
			IF OBJECT_ID('tempdb..#PersonFiltered') IS NOT NULL DROP TABLE #PersonFiltered
			IF OBJECT_ID('tempdb..#DuplicatedPerson') IS NOT NULL DROP TABLE #DuplicatedPerson

			SELECT  
							[v].[PersonNo]
							,[v].[FirstName]
							,[v].[Lastname] AS [Name]
							,[v].[Language]
							,[v].[Department]
							,[v].[BusinessTitle]
							--,[Title].[Value] as [TitleKey]
							,[Salutation].[Value] as [SalutationKey]
							--,[SalutationLetter].[Value] as [LetterSalutationKey]
							,[v].[IsTechnicialContactPerson]
							,[v].[IsSalesContactPerson]
							,[v].[MobilePhone]
							,[v].[CampaignId]
							,[v].[EventId]
							,[v].[IsContactAcquiredThroughVolvo]
							,[v].[IsWantingToJoinTheDriversClub]
							,[v].[InterestedIn]
							,[v].[IsInactive]
							,[c].[ContactId] AS [ParentKey]
							,[a].[AddressId] AS [AddressKey]
							,BINARY_CHECKSUM(
											[v].[PersonNo]
											,[v].[FirstName]
											,[v].[LastName]
											,[v].[Lastname]
											,[v].[Language]
											,[v].[Department]
											,[v].[BusinessTitle]
											--,[Title].[Value]
											,[Salutation].[Value]
											--,[Salutation Letter].[Value]
											,[v].[IsTechnicialContactPerson]
											,[v].[IsSalesContactPerson]
											,[v].[MobilePhone]
											,[v].[CampaignId]
											,[v].[EventId]
											,[v].[IsContactAcquiredThroughVolvo]
											,[v].[IsWantingToJoinTheDriversClub]
											,[v].[InterestedIn]
											,[v].[IsInactive]
														) AS [LegacyVersion]
			INTO #Person
			FROM V_External_Person AS [v]
			JOIN [CRM].[Contact] [c] ON [c].[LegacyId] = [v].[CompanyNo] AND [c].[ContactType] = 'Company'
			JOIN [CRM].[Address] [a] ON [a].[CompanyKey] = [c].[ContactId] AND a.IsCompanyStandardAddress = 1
			--OUTER APPLY (
			--	SELECT TOP 1 [Value] FROM [LU].[Title] WHERE [Name] = [v].[Title]
			--) [Title]
			OUTER APPLY (
				SELECT TOP 1 [Value] FROM [LU].[Salutation] WHERE [Name] = [v].[Salutation]
			) [Salutation]
			
			CREATE NONCLUSTERED INDEX IX_#ContactImport_LegacyId ON #ContactImport ([LegacyId] ASC)
			CREATE NONCLUSTERED INDEX IX_#Person_PersonNo ON #Person ([PersonNo] ASC)
			
			SELECT @count = COUNT(*) FROM #Person
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records transferred to input table'
			PRINT @logmessage
		END

		SELECT [PersonNo]
		INTO #DuplicatedPerson
		FROM #Person GROUP BY [PersonNo] HAVING COUNT([PersonNo]) > 1
		
		-------------------------------------------------
		-- Check quality of merge storage
		-------------------------------------------------	
		BEGIN
			IF EXISTS (SELECT [PersonNo] FROM #DuplicatedPerson)
			BEGIN
				PRINT N'Duplicate Persons found in External Persons view'
				PRINT N'Während des Imports wurden mehrere Personen mit identischer PersonNo gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'SELECT PersonNo FROM V_External_Person GROUP BY PersonNo HAVING COUNT(PersonNo) > 1'

				--EXEC dbo.SP_Send_Message
				--	N'Duplicate Persons found in External Persons view',
				--	N'Während des Imports wurden mehrere Personen mit identischer PersonNo gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT PersonNo FROM V_External_Person GROUP BY PersonNo HAVING COUNT(PersonNo) > 1'
				--RETURN	
			END			
		END

		SELECT [p].*
		INTO #PersonFiltered
		FROM #Person [p]
		LEFT JOIN #DuplicatedPerson [dp] ON [dp].[PersonNo] = [p].[PersonNo]
		WHERE [dp].[PersonNo] IS NULL

		CREATE NONCLUSTERED INDEX IX_#PersonFiltered_PersonNo ON #PersonFiltered ([PersonNo] ASC)

		-------------------------------------------------
		-- Merge Crm.Contact based on data coming from External view
		-------------------------------------------------	
		BEGIN TRANSACTION
		BEGIN
			MERGE [CRM].[Contact] AS [target]
			USING #PersonFiltered AS [source]
			ON [target].[LegacyId] = [source].[PersonNo] COLLATE DATABASE_DEFAULT
			AND [target].[ContactType] = 'Person'
					
			WHEN MATCHED 
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
				THEN
				UPDATE SET 
					[target].[ParentKey] = [source].[ParentKey]
					,[target].[Name] = Case when [source].[Name] is null then '' else [source].[Name] end
					,[target].[ContactLanguage] = [source].[Language]
					,[target].[IsActive] = 1
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[ModifyUser] = 'Import'
					,[target].[LegacyVersion] = [source].[LegacyVersion]
			WHEN NOT MATCHED 
				THEN
				INSERT (
					[ContactType]
					,[LegacyId]
					,[LegacyVersion]
					,[ParentKey]
					,[Name]
					,[ContactLanguage]
					,[IsActive]
					,[IsExported]
					,[CreateDate]
					,[ModifyDate]
					,[CreateUser]
					,[ModifyUser]
				) VALUES (
					'Person'
					,[source].[PersonNo]
					,[source].[LegacyVersion]
					,[source].[ParentKey]
					,Case when [source].[Name] is null then '' else [source].[Name] end
					,[source].[Language]
					,1
					,1
					,GETUTCDATE()
					,GETUTCDATE()
					,'Import'
					,'Import'
				)
			WHEN NOT MATCHED BY SOURCE AND [target].[IsActive] = 1 AND [target].[ContactType] = 'Person' 
				THEN
				UPDATE SET
					[IsActive] = 0
					,[ModifyDate] = GETUTCDATE()
					,[ModifyUser] = 'Import'

			OUTPUT $action
					,inserted.ContactId
					,[source].PersonNo AS LegacyId
					,[source].LegacyVersion
			INTO #ContactImport;
								
			PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
				
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'INSERT'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records inserted into CRM.Contact'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'INSERT'			
			EXEC SP_Import_WriteLog 'INSERT', @tableName, @count;
					
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'UPDATE'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records updated in CRM.Contact'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'UPDATE'			
			EXEC SP_Import_WriteLog 'UPDATE', @tableName, @count;
			
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'DELETE'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records inactivated in CRM.Contact'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'DELETE'			
			EXEC SP_Import_WriteLog 'DELETE', @tableName, @count;
		END
		
		SET @TableName = '[CRM].[Person]';
		
		-------------------------------------------------
		-- Merge Entity table
		-------------------------------------------------	
		BEGIN
			SET @TableName = '[CRM].[Person]';
			PRINT 'Processing results of merge to ' + @TableName;
				
			MERGE [CRM].[Person] AS [target]
			USING (SELECT [ci].[ContactId], [p].* 
						FROM #PersonFiltered [p]
						JOIN #ContactImport [ci] ON [p].[PersonNo] = [ci].[LegacyId]) AS [source]
			ON [target].[ContactKey] = [source].[ContactId]
				AND [source].[AddressKey] IS NOT NULL
			-- For all found temp records we update accordingly
			WHEN MATCHED 
				THEN
				UPDATE SET
					[FirstName] = [source].[FirstName],
					[Surname] = [source].[Name],
					[BusinessTitle] = [source].[BusinessTitle],
					--[TitleKey] = [source].[TitleKey],
					[SalutationKey] = [source].[SalutationKey],
					[Department] = [source].[Department],
					[AddressKey] = [source].[AddressKey]

			-- For all new records we insert to CRM.Company
			WHEN NOT MATCHED
				THEN
				INSERT (
					[ContactKey],
					[FirstName],
					[Surname],
					[BusinessTitle],
					--[TitleKey],
					[SalutationKey],
					[Department],
					[AddressKey]
				) VALUES (
					[source].[ContactId], 
					[source].[FirstName],
					[source].[Name],
					[source].[BusinessTitle],
					--[source].[TitleKey],
					[source].[SalutationKey],
					[source].[Department],
					[source].[AddressKey]
				);
		END	
	END TRY
	BEGIN CATCH
	IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;
			THROW
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
		
		SELECT
			@ErrorMessage = Substring(ERROR_MESSAGE(), 0, 1000),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();

			EXEC [dbo].[SP_Import_SendErrorMessage] @TableName, @ErrorMessage;
			EXEC SP_Import_WriteErrorLog  @TableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH;
	IF @@TRANCOUNT > 0
			COMMIT TRANSACTION;

		PRINT 'Import: TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
END
GO

