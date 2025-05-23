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
		SET @TableName = '[CRM].[Company]';

		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------		
		BEGIN
			IF OBJECT_ID('tempdb..#ContactImport') IS NOT NULL DROP TABLE #ContactImport
			CREATE TABLE #ContactImport (Change NVARCHAR(100), 
												ContactId UNIQUEIDENTIFIER,
												LegacyId NVARCHAR(100),
												LegacyVersion BIGINT)

			IF OBJECT_ID('tempdb..#Company') IS NOT NULL DROP TABLE #Company

			SELECT
				[v].[CompanyNo]
				,[v].[ParentCompanyNo]
				,[v].[ContactLanguage]
				,[v].[Name]
				,Case when [v].[CompanyTypeKey] = 'K' Then 100 when [v].[CompanyTypeKey] = 'I' Then 100 End as [CompanyTypeKey]
				,[v].[isDebitorBlocked]
				,[v].[IsBlocked]
				,[v].[EventId]
				,[v].[CampaignId]
				,[v].[IsContactAcquiredThroughVolvo]
				,[v].[BranchKey]
				,[v].[KeyAccount]
				,[v].[SennebogenContact]
				,[v].[PartnerPurchaser]
				,[v].[CustomerClassificationKey]
				,[v].[EmployeeClassKey]
				,[v].[PotentialModelKey]
				,[v].[PotentialClassificationKey]
				,[v].[HasNoForeignMachine]
				,BINARY_CHECKSUM([v].[CompanyNo]
								,[v].[ParentCompanyNo]
								,[v].[ContactLanguage]
								,[v].[Name]
								,[CompanyTypeKey]
								,[v].[isDebitorBlocked]
								,[v].[IsBlocked]
								,[v].[EventId]
								,[v].[CampaignId]
								,[v].[IsContactAcquiredThroughVolvo]
								,[v].[BranchKey]
								,[v].[KeyAccount]
								,[v].[SennebogenContact]
								,[v].[PartnerPurchaser]
								,[v].[CustomerClassificationKey]
								,[v].[EmployeeClassKey]
								,[v].[PotentialModelKey]
								,[v].[PotentialClassificationKey]
								,[v].[HasNoForeignMachine]
														) AS [LegacyVersion]
			INTO #Company
			FROM V_External_Company AS v

			CREATE NONCLUSTERED INDEX IX_#Company_CompanyNo ON #Company ([CompanyNo] ASC)

			SELECT @count = COUNT(*) FROM #Company
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records transferred to input table'
			PRINT @logmessage
		END

		-------------------------------------------------
		-- Merge Crm.Contact based on data coming from External view
		-------------------------------------------------	
		BEGIN TRANSACTION
		BEGIN
			MERGE [CRM].[Contact] AS [target]
			USING #Company AS [source]
			ON [target].[LegacyId] COLLATE DATABASE_DEFAULT = [source].[CompanyNo] COLLATE DATABASE_DEFAULT
			AND [target].[ContactType] = 'Company'
			
			-- We already know a company with this LegacyId
			WHEN MATCHED 
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion]) 
				THEN
				UPDATE SET 
					[target].[Name] = [source].[Name]
					,[target].[IsActive] = 1
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[ModifyUser] = 'Import'
					,[target].[LegacyVersion] = [source].[LegacyVersion]
							
			-- If not found we try to insert with the appropriate data
			WHEN NOT MATCHED 
				THEN
				INSERT (
					[ContactType]
					,[LegacyId] 
					,[LegacyVersion] 
					,[Name]
					,[Visibility]
					,[IsActive]
					,[IsExported]
					,[CreateDate] 
					,[ModifyDate]
					,[CreateUser] 
					,[ModifyUser]
				) VALUES (
					'Company'
					,[source].[CompanyNo]
					,[source].[LegacyVersion]
					,[source].[Name]
					,2
					,1
					,1
					,GETUTCDATE()
					,GETUTCDATE()
					,'Import'
					,'Import'
				)
			WHEN NOT MATCHED BY SOURCE 
				AND [target].[ContactType] = 'Company'
				THEN
				UPDATE SET 
					[IsActive] = 0
					,[ModifyUser] = 'Import'
					,[ModifyDate] = GETUTCDATE()
					,[LegacyVersion] = NULL
				
			-- All records to the temp table including their action
			OUTPUT $action
					,inserted.ContactId
					,[source].CompanyNo AS LegacyId
					,[source].LegacyVersion
			INTO #ContactImport;
		
			CREATE NONCLUSTERED INDEX IX_#ContactImport_LegacyId ON #ContactImport ([LegacyId] ASC)

			PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
				
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'INSERT'
			EXEC SP_Import_WriteLog 'INSERT', @TableName, @count;
					
			SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'UPDATE'
			EXEC SP_Import_WriteLog 'UPDATE', @TableName, @count;
		END
				
		SET @TableName = '[CRM].[Company]';

		-------------------------------------------------
		-- Merge Entity table
		-------------------------------------------------	
		BEGIN
			RAISERROR ('Processing results of merge to CRM.Company', 10, 0 ) WITH NOWAIT
			MERGE [CRM].[Company] AS [target]
			USING (SELECT ci.ContactId, c.*
					FROM #Company c
					JOIN #ContactImport ci ON c.CompanyNo = ci.LegacyId) AS [source]
			ON [target].[ContactKey] = [source].[ContactId]
			-- For all new records we insert to CRM.Company
			WHEN NOT MATCHED THEN
				INSERT (
					[ContactKey]
					,[ShortText]
					,[CompanyTypeKey]
					,[IsOwnCompany]
				) VALUES (
					[source].[ContactId] 
					,[source].[Name]
					,[source].[CompanyTypeKey]
					,0
				)	
		
			-- For all found temp records we update SMS.InstallationHead accordingly
			WHEN MATCHED
				THEN
				UPDATE SET 
					[ShortText] = [source].[Name]
					,[CompanyTypeKey] = source.[CompanyTypeKey]
					,[IsOwnCompany] = 0;
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
