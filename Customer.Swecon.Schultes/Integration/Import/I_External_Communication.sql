SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets FROM
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @TableName NVARCHAR(100);
	DECLARE @Count as BigInt;
		
	BEGIN TRY
		SET @TableName = '[CRM].[Communication]';
		
		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------	
		BEGIN
			IF OBJECT_ID('tempdb..#CommunicationTypeMapping') IS NOT NULL DROP TABLE #CommunicationTypeMapping
			CREATE TABLE #CommunicationTypeMapping (TypeKey NVARCHAR(32),
											LmobileTypeKey NVARCHAR(32))

			INSERT INTO #CommunicationTypeMapping (TypeKey, LmobileTypeKey)
			VALUES ('Phone', 'PhoneWork'),
				('Fax', 'FaxWork'),
				('Handy', 'PhoneMobile'),
				('E-Mail', 'EmailWork'),
				('Website','WebsiteWork')
	

			IF OBJECT_ID('tempdb..#CommunicationImport') IS NOT NULL DROP TABLE #CommunicationImport
			CREATE TABLE #CommunicationImport (Change NVARCHAR(100),
											CommunicationId UNIQUEIDENTIFIER,
											LegacyId NVARCHAR(100),
											LegacyVersion BIGINT)
											
			IF OBJECT_ID('tempdb..#Communication') IS NOT NULL DROP TABLE #Communication
			
			SELECT 
				[v].[CommunicationId] + '|' + [v].[KommunicationType] AS [LegacyId]
				,[v].[Data] AS [Data]
				,CASE
					WHEN [EmailType].[Value] IS NOT NULL THEN
						'Email'
					WHEN [FaxType].[Value] IS NOT NULL THEN
						'Fax'
					WHEN [PhoneType].[Value] IS NOT NULL THEN
						'Phone'				
					WHEN [WebsiteType].[Value] IS NOT NULL THEN
						'Website'
				END	AS [GroupKey]
				,CASE
					WHEN [EmailType].[Value] IS NOT NULL THEN
						[EmailType].[Value]
					WHEN [FaxType].[Value] IS NOT NULL THEN
						[FaxType].[Value]
					WHEN [PhoneType].[Value] IS NOT NULL THEN
						[PhoneType].[Value]
					WHEN [WebsiteType].[Value] IS NOT NULL THEN
						[WebsiteType].[Value]
				END	as [TypeKey]
				,CASE
					WHEN [v].[PersonNo] IS NULL THEN
						(SELECT [ContactId] FROM [CRM].[Contact] [co] WHERE [co].[LegacyId] = [v].[CompanyNo] AND [co].[ContactType] = 'Company')
					ELSE
						(SELECT [ContactId] FROM [CRM].[Contact] [co] WHERE [co].[LegacyId] = [v].[PersonNo] AND [co].[ContactType] = 'Person')
					END AS [ContactKey]
				,[ad].[AddressId] AS [AddressKey]
				,BINARY_CHECKSUM(
								 [v].[Data]
								,[v].[CompanyNo]
								,[v].[AddressNo]
								,[v].[PersonNo]
								) AS [LegacyVersion]
			into #Communication
			from V_External_Communication [v]
			JOIN  #CommunicationTypeMapping [ctm] ON [ctm].[TypeKey] = [v].[KommunicationType]
			JOIN [CRM].[Address] [ad] ON [ad].[LegacyId] = [v].[AddressNo]
			OUTER APPLY (
				SELECT TOP 1 * FROM [LU].[EmailType] WHERE [Value] = [ctm].[LmobileTypeKey]
			) [EmailType]
			OUTER APPLY (
				SELECT TOP 1 * FROM [LU].[FaxType] WHERE [Value] = [ctm].[LmobileTypeKey]
			) [FaxType]
			OUTER APPLY (
				SELECT TOP 1 * FROM [LU].[PhoneType] WHERE [Value] = [ctm].[LmobileTypeKey]
			) [PhoneType]
			OUTER APPLY (
				SELECT TOP 1 * FROM [LU].[WebsiteType] WHERE [Value] = [ctm].[LmobileTypeKey]
			) [WebsiteType]
		END

		-------------------------------------------------
		-- Merge Entity table
		-------------------------------------------------	
		BEGIN
			MERGE [CRM].[Communication] AS [target]
			USING #Communication AS [source]
			ON ([target].[legacyId] = [source].[LegacyId])
			WHEN MATCHED
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
				AND [source].[GroupKey] IS NOT NULL
				AND [source].[TypeKey] IS NOT NULL
				THEN UPDATE SET
					[target].[LegacyVersion] = [source].[LegacyVersion]
					,[target].[Data] = [source].[Data]
					,[target].[GroupKey] = [source].[GroupKey]
					,[target].[TypeKey] = [source].[TypeKey]
					,[target].[ContactKey] = [source].[ContactKey]
					,[target].[AddressKey] = [source].[AddressKey]
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[ModifyUser] = 'Import'
					,[target].[IsActive] = 1
			WHEN NOT MATCHED
				AND [source].[GroupKey] IS NOT NULL
				AND [source].[ContactKey] IS NOT NULL
				THEN
				INSERT (
					[LegacyId]
					,[Data]
					,[GroupKey]
					,[TypeKey]
					,[ContactKey]
					,[AddressKey]
					,[CreateDate]
					,[ModifyDate]
					,[CreateUser]
					,[ModifyUser]
					,[IsActive]
					,[IsExported]
					,[LegacyVersion]
				) VALUES (
					[source].[LegacyId]
					,[source].[Data]
					,[source].[GroupKey]
					,[source].[TypeKey]
					,[source].[ContactKey]
					,[source].[AddressKey]
					,GETUTCDATE()
					,GETUTCDATE()
					,'Import'
					,'Import'
					,1
					,1
					,[source].[LegacyVersion]
				)
			WHEN NOT MATCHED BY SOURCE
				AND [target].[IsActive] = 1
				THEN UPDATE SET
					[target].[LegacyVersion] = NULL
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[ModifyUser] = 'Import'
					,[target].[IsActive] = 0
			OUTPUT $action
				,inserted.CommunicationId
				,source.LegacyId
				,source.LegacyVersion
			INTO #CommunicationImport;

			PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
			
			SELECT @count = COUNT(*) FROM #CommunicationImport WHERE Change = 'INSERT'
			EXEC SP_Import_WriteLog 'INSERT', @TableName, @count;
				
			SELECT @count = COUNT(*) FROM #CommunicationImport WHERE Change = 'UPDATE'
			EXEC SP_Import_WriteLog 'UPDATE', @TableName, @count;
		END
	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
		
		SELECT
			@ErrorMessage = Substring(ERROR_MESSAGE(), 0, 4000),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
			
		EXEC [dbo].[SP_Import_SendErrorMessage] @TableName, @ErrorMessage;
		EXEC SP_Import_WriteErrorLog  @TableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH;
END
GO
