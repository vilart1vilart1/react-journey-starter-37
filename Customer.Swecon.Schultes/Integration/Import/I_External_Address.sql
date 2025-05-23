SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @tableName NVARCHAR(100);
	DECLARE @count as BigInt;
		
	BEGIN TRY
		SET @tableName = '[CRM].[Address]';
		
		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------	
		BEGIN
			IF OBJECT_ID('tempdb..#AddressImport') IS NOT NULL DROP TABLE #AddressImport
			CREATE TABLE #AddressImport (Change NVARCHAR(100),
												AddressId UNIQUEIDENTIFIER,
												LegacyId NVARCHAR(100),
												LegacyVersion INT)
			IF OBJECT_ID('tempdb..#Address') IS NOT NULL DROP TABLE #Address
			IF OBJECT_ID('tempdb..#AddressFiltered') IS NOT NULL DROP TABLE #AddressFiltered
			IF OBJECT_ID('tempdb..#AddressDuplicatedLegacyId') IS NOT NULL DROP TABLE #AddressDuplicatedLegacyId
			IF OBJECT_ID('tempdb..#AddressMultipleStandardAdress') IS NOT NULL DROP TABLE #AddressMultipleStandardAdress
			
			SELECT
				[a].[AddressNo] as [LegacyId]
				,[a].[CompanyNo]
				,[c].[ContactId] AS [CompanyKey]
				,[a].[Name1]
				,[a].[Name2]
				,[a].[Name3]
				,[a].[City]
				,COALESCE([a].[CountryKey], NULL, '') AS [CountryKey]
				,[a].[ZipCode]
				,[a].[ZipCodePOBox]
				,[a].[POBox]
				,[a].[Street]
				,[a].[RegionKey]
				,[a].[IsCompanyStandardAddress]
				,[a].[AddressTypeKey]
				,BINARY_CHECKSUM([a].[AddressNo]
								,[a].[CompanyNo]
								,[a].[Name1]
								,[a].[Name2]
								,[a].[Name3]
								,[a].[City]
								,[a].[CountryKey]
								,[a].[ZipCode]
								,[a].[ZipCodePOBox]
								,[a].[POBox]
								,[a].[Street]
								,[a].[RegionKey]
								,[a].[IsCompanyStandardAddress]
								,[a].[AddressTypeKey]
														) AS [LegacyVersion]
				,CASE WHEN 
					[a].[CountryKey] <> [ad].[CountryKey] COLLATE DATABASE_DEFAULT
					OR [a].[City] <> [ad].[City] COLLATE DATABASE_DEFAULT
					OR [a].[ZipCode] <> [ad].[ZipCode] COLLATE DATABASE_DEFAULT
					OR [a].[Street] <> [ad].[Street] COLLATE DATABASE_DEFAULT
				THEN 1 ELSE 0 END AS [LocationChanged]
			INTO #Address
			FROM V_External_Address [a]
			JOIN [CRM].[Contact] [c] ON [c].[LegacyId] = [a].[CompanyNo] AND [c].[ContactType] = 'Company' AND [c].[IsActive] = 1
			LEFT OUTER JOIN [CRM].[Address] ad ON [a].[AddressNo] = [ad].[LegacyId]
		
			SELECT @count = COUNT(*) FROM #Address
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records transferred to input table'
			PRINT @logmessage
		END

		SELECT LegacyId
		INTO #AddressDuplicatedLegacyId
		FROM #Address GROUP BY LegacyId HAVING COUNT(LegacyId) > 1

		SELECT CompanyNo
		INTO #AddressMultipleStandardAdress
		FROM #Address WHERE IsCompanyStandardAddress = 1 GROUP BY CompanyNo HAVING COUNT(*) > 1

		SELECT [a].*
		INTO #AddressFiltered
		FROM #Address [a]
		LEFT JOIN #AddressDuplicatedLegacyId [adli] ON [adli].[LegacyId] = [a].[LegacyId]
		LEFT JOIN #AddressMultipleStandardAdress [amsa] ON [amsa].[CompanyNo] = [a].[CompanyNo]
		WHERE [adli].[LegacyId] IS NULL
			AND [amsa].[CompanyNo] IS NULL

		-------------------------------------------------
		-- Check quality of merge storage
		-------------------------------------------------	
		BEGIN
			IF EXISTS (SELECT LegacyId FROM #AddressDuplicatedLegacyId)
			BEGIN
				PRINT N'Duplicate Address found in External Address view'
				PRINT N'Während des Imports wurden mehrere Adressen mit identischer Adressnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'SELECT LegacyId FROM V_External_Company_Address GROUP BY LegacyId HAVING COUNT(LegacyId) > 1'

				--EXEC dbo.SP_Send_Message
				--	N'Duplicate Address found in External Address view',
				--	N'Während des Imports wurden mehrere Adressen mit identischer Adressnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT LegacyId FROM V_External_Company_Address GROUP BY LegacyId HAVING COUNT(LegacyId) > 1'
			END
			
			IF EXISTS (SELECT CompanyNo FROM #AddressMultipleStandardAdress)
			BEGIN
				PRINT N'Duplicate Standard-Address found in External Address view'
				PRINT N'Während des Imports wurden mehrere Standardadressen für eine Firma gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'SELECT CompanyNo FROM V_External_Company_Address	WHERE IsCompanyStandardAddress = 1 GROUP BY CompanyNo HAVING COUNT(*) > 1'

				--EXEC dbo.SP_Send_Message
				--	N'Duplicate Standard-Address found in External Address view',
				--	N'Während des Imports wurden mehrere Standardadressen für eine Firma gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT CompanyNo FROM V_External_Company_Address	WHERE IsCompanyStandardAddress = 1 GROUP BY CompanyNo HAVING COUNT(*) > 1'
			END
		END

		-------------------------------------------------
		-- Merge Entity table
		-------------------------------------------------	
		BEGIN
			MERGE [CRM].[Address] AS [target]
			USING #AddressFiltered AS [source]
			ON [target].[LegacyId] = [source].[LegacyId]
			WHEN MATCHED  
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
				THEN
				UPDATE
					SET 
						[target].[Name1] = [source].[Name1]
						,[target].[Name2] = [source].[Name2]
						,[target].[Name3] = [source].[Name3]
						,[target].[City] = [source].[City]
						,[target].[CountryKey] = [source].[CountryKey]
						,[target].[ZipCode] = [source].[ZipCode]
						,[target].[Street] = [source].[Street]
						,[target].[RegionKey] = [source].[RegionKey]
						,[target].[AddressTypeKey] = [source].[AddressTypeKey]
						,[target].[ZipCodePOBox] = [source].[ZipCodePOBox]
						,[target].[POBox] = [source].[POBox]
						,[target].[CompanyKey] = [source].[CompanyKey]
						,[target].[IsCompanyStandardAddress] = [source].[IsCompanyStandardAddress]
						,[Latitude] = CASE WHEN source.[LocationChanged] = 1 THEN NULL ELSE [target].[Latitude] END
    					,[Longitude] = CASE WHEN source.[LocationChanged] = 1 THEN NULL ELSE [target].[Longitude] END
    					,[GeocodingRetryCounter] = CASE WHEN source.[LocationChanged] = 1 THEN 0 ELSE [target].[GeocodingRetryCounter] END
						,[target].[IsActive] = 1
    					,[ModifyDate] = GETUTCDATE()
    					,[ModifyUser] = 'Import'
						,[target].[LegacyVersion] = [source].[LegacyVersion]
			WHEN NOT MATCHED 
				THEN
					INSERT (
						[LegacyId]
						,[LegacyVersion]
						,[Name1]
						,[Name2]
						,[Name3]
						,[City]
						,[CountryKey]
						,[ZipCode]
						,[Street]
						,[RegionKey]
						,[AddressTypeKey]
						,[ZipCodePOBox]
						,[POBox]
						,[CompanyKey]
						,[IsCompanyStandardAddress]
						,[IsExported]
						,[IsActive]
						,[CreateUser]
						,[ModifyUser]
						,[CreateDate]
						,[ModifyDate]
					) VALUES (
						[source].[LegacyId]
						,[source].[LegacyVersion]
						,[source].[Name1]
						,[source].[Name2]
						,[source].[Name3]
						,[source].[City]
						,[source].[CountryKey]
						,[source].[ZipCode]
						,[source].[Street]
						,[source].[RegionKey]
						,[source].[AddressTypeKey]
						,[source].[ZipCodePOBox]
						,[source].[POBox]
						,[source].[CompanyKey]
						,[source].[IsCompanyStandardAddress]
						,1
						,1
						,'Import'
						,'Import'
						,GETUTCDATE()
						,GETUTCDATE()
				)
			WHEN NOT MATCHED BY SOURCE
				AND [target].[IsActive] = 1
				THEN UPDATE SET
					[target].[isActive] = 0
					,[target].[ModifyUser] = 'InactivateCompanyAddress'
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[LegacyVersion] = NULL
			OUTPUT $action
				,inserted.AddressId
				,source.LegacyId
				,source.LegacyVersion 
			INTO #AddressImport;

			PRINT 'Import ' + @tableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
			
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'INSERT'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records inserted into CRM.Address'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'INSERT'			
			EXEC SP_Import_WriteLog 'INSERT', @tableName, @count;
					
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'UPDATE'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records updated in CRM.Address'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'UPDATE'			
			EXEC SP_Import_WriteLog 'UPDATE', @tableName, @count;
			
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'DELETE'
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records inactivated in CRM.Address'
			PRINT @logmessage
			
			SELECT @count = COUNT(*) FROM #AddressImport WHERE Change = 'DELETE'			
			EXEC SP_Import_WriteLog 'DELETE', @tableName, @count;
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
			
		EXEC [dbo].[SP_Import_SendErrorMessage] @tableName, @ErrorMessage;
		EXEC SP_Import_WriteErrorLog  @tableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH;
END
GO
