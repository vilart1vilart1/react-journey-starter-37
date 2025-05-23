BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	SET QUOTED_IDENTIFIER ON;

	BEGIN TRY
		DECLARE @count bigint;
		DECLARE @tableName NVARCHAR(100);
		SET @tableName = 'SMS.ServiceOrderHead';

		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------		
		BEGIN
			IF OBJECT_ID('tempdb..#ContactImport') IS NOT NULL DROP TABLE #ContactImport
			CREATE TABLE #ContactImport (Change NVARCHAR(100), 
												ContactId UNIQUEIDENTIFIER, 
												LegacyId NVARCHAR(100), 
												LegacyVersion BIGINT)

			IF OBJECT_ID('tempdb..#ServiceOrderHead') IS NOT NULL DROP TABLE #ServiceOrderHead

			SELECT 
				[v].*
				,[company].[ContactId] AS [CustomerContactId]
				,[installation].[ContactKey] AS [InstallationId]
				,BINARY_CHECKSUM(
											--[v].[Commission]
											[v].[CustomerNo]
											,[v].[InstallationNo]
											,[v].[OrderTypekey]
											,[v].[OrderStateKey]
											,[v].[ErrorMessage]
											,[v].[Reported]
											,[v].[Planned]
											,[v].[Deadline]
											,[v].[Priority]
											--,[v].[StationKey]
											,[v].[PurchaseOrderNo]
											,[v].[ServiceLocationName1]
											,[v].[ServiceLocationName2]
											,[v].[ServiceLocationName3]
											,[v].[ServiceLocationCity]
											,[v].[ServiceLocationCountryKey]
											,[v].[ServiceLocationZipCode]
											,[v].[ServiceLocationStreet]
											,[v].[ServiceLocationPhone]
											--,[v].[ServiceLocationFax]
											,[v].[ServiceLocationMobile]
											,[v].[ServiceLocationEmail]
											,[v].[ServiceLocationResponsiblePerson]
											,[v].[Diagnostics]
											,[v].[ReportedIncident]
											,[v].[Fault]
											,[v].[DisponentWorkOder]
											,[v].[AdHocExportDetails]
											,[v].[MaintenanceCode]
											,[v].[ExportRetries]
											,[v].[TopLogNo]
										
														) AS [LegacyVersion]
			INTO #ServiceOrderHead
			From V_External_ServiceOrder AS [v]
			LEFT OUTER JOIN [CRM].[Contact] [company] ON [company].[LegacyId] = [v].[CustomerNo] AND [company].[ContactType] = 'Company'
			LEFT OUTER JOIN [SMS].[InstallationHead] [installation] ON [installation].[InstallationNo] = [v].[InstallationNo]
			WHERE 
				[v].[InstallationNo] IS NULL OR [installation].[InstallationNo] IS NOT NULL
				--and [v].[Orderno] not like '%Adhoc%'
			CREATE NONCLUSTERED INDEX IX_#Company_CrmCompanyId ON #ServiceOrderHead ([Orderno] ASC)
			CREATE NONCLUSTERED INDEX IX_#Company_CompanyNo ON #ContactImport (ContactId ASC)

			SELECT @count = COUNT(*) FROM #ServiceOrderHead
			PRINT CONVERT(nvarchar, @count) + ' Records transferred to input table'
		END
		--select * from #ServiceOrderHead
		BEGIN TRANSACTION
		BEGIN TRY
			-------------------------------------------------
			-- Merge Crm.Contact based on data coming from External view
			-------------------------------------------------	
			BEGIN
				MERGE [CRM].[Contact] AS [target]
				USING #ServiceOrderHead AS [source]
				ON ([target].[LegacyId] COLLATE DATABASE_DEFAULT = [source].[Orderno] COLLATE DATABASE_DEFAULT or
				[target].[Name] COLLATE DATABASE_DEFAULT = [source].[Orderno] COLLATE DATABASE_DEFAULT )
				AND [target].[ContactType] = 'ServiceOrder'
				--AND [target].[IsActive] = 1
				--And [target].[LegacyId] is null

				WHEN MATCHED 
					AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
					THEN
					UPDATE SET 
						[target].[Name] = [source].[Orderno]
						,[target].[LegacyId] = [source].[Orderno]
						,[target].[IsActive] = 1							
						,[target].[ModifyDate] = GETUTCDATE()
						,[target].[ModifyUser] = 'Import'
						,[target].[LegacyVersion] = [source].[LegacyVersion]
				WHEN NOT MATCHED
				AND ([source].[OrderNo] not like '%Adhoc%')
					THEN
					INSERT (
						[ContactType]
						,[LegacyId] 
						,[LegacyVersion] 
						,[IsExported] 
						,[Name]
						,[IsActive]
						,[Visibility]
						,[CreateDate] 
						,[ModifyDate]
						,[CreateUser] 
						,[ModifyUser]
					) VALUES (
						'ServiceOrder'
						,[source].[Orderno]
						,[source].[LegacyVersion]
						,1
						,[source].[Orderno]
						,1
						,2
						,GETUTCDATE() 
						,GETUTCDATE()
						,'Import'
						,'Import'
					)
				WHEN NOT MATCHED BY SOURCE 
				AND [target].[IsActive] = 1 
				AND [target].[ContactType] = 'ServiceOrder' 
				AND [target].[LegacyId] IS NOT NULL 
				AND [target].[Name] NOT LIKE '%Adhoc%' 
				AND [target].[ContactId] IN (
					SELECT contactkey 
					FROM sms.serviceorderhead 
					WHERE contactkey = [target].ContactId 
					 AND [status] NOT IN ('Completed', 'PartiallyCompleted'))
				) 
					THEN
					UPDATE SET 
						[IsActive] = 0
						,[ModifyDate] = GETUTCDATE()
						,[ModifyUser] = 'Import'
						,[LegacyVersion] = NULL
				-- All records to the temp table including their action
				OUTPUT $action
					,inserted.ContactId
					,[source].[Orderno] AS LegacyId
					,[source].LegacyVersion
				INTO #ContactImport;
		--select * from #ContactImport
				CREATE NONCLUSTERED INDEX IX_#ContactImport_LegacyId ON #ContactImport ([LegacyId] ASC)
			END
				
			-------------------------------------------------
			-- Merge Entity table
			-------------------------------------------------	
			BEGIN
				MERGE [SMS].[ServiceOrderHead] AS [target]
				USING (SELECT [ci].ContactId, [soh].*
						from #ServiceOrderHead [soh]
						JOIN #ContactImport [ci] ON [soh].[Orderno] COLLATE DATABASE_DEFAULT = [ci].[LegacyId] COLLATE DATABASE_DEFAULT) AS [source]
				ON [target].[ContactKey] = [source].[ContactId]
				WHEN MATCHED 
					THEN
					UPDATE SET
						[ErrorMessage] = [source].[ErrorMessage]
						,[CustomerContactId] = [source].[CustomerContactId]
						,[InstallationNo] = [source].[InstallationNo]
						,[OrderType] = [source].[OrderTypeKey]
						,[Name1] = [source].[ServiceLocationName1]
						,[Name2] = [source].[ServiceLocationName2]
						,[Name3] = [source].[ServiceLocationName3]
						,[Street] = [source].[ServiceLocationStreet]
						,[City] = [source].[ServiceLocationCity]
						,[ZipCode] = [source].[ServiceLocationZipCode]
						,[CountryKey] = [source].[ServiceLocationCountryKey]
						,[ServiceLocationPhone] = [source].[ServiceLocationPhone]
						,[ServiceLocationMobile] = [source].[ServiceLocationMobile]
						,[ServiceLocationEmail] = [source].[ServiceLocationEmail]
						,[PurchaseOrderNo] = [source].[PurchaseOrderNo]
						--,[ServiceLocationFax] = [source].[ServiceLocationFax]
						,[ServiceLocationResponsiblePerson] = [source].[ServiceLocationResponsiblePerson]						
						--,[PreferredTechnician] = [source].[PreferredTechnician]
						,[Priority] = [source].[Priority]
						--,[Status] = [source].[LmobileStateKey]
						--,[Deadline] = [source].[Deadline]
						--,[Reported] = [source].[Reported]
						,[CostingUnit] = NULL
						--,[StationKey] = [source].[StationKey]
						--,[Planned] = [source].[Planned]
						,[CommissionNo] = [source].[TopLogNo]
						--,[ExtendedCommissionNo] = [source].[ExtendedCommissionNo]
						--,[ExtendedPurchaseNo] = [source].[ExtendedPurchaseNo]
						--,[ServiceText] = [source].[ServiceText]
						--,[ShippingData] = [source].[ShippingData]
						--,[ObjectDescription] = [source].[ObjectDescription]
				WHEN NOT MATCHED 
					THEN
					INSERT (
						[ContactKey]
						,[OrderNo]
						,[CustomerContactId]
						,[Status]
						,[OrderType]
						,[Reported]
						,[ErrorMessage]
						,[InstallationNo]
						--,[Deadline]
						,[Priority]
						,[Name1]
						,[Name2]
						,[Name3]
						,[City]
						,[CountryKey]
						,[ZipCode]
						,[Street]
						,[ServiceLocationPhone]
						,[ServiceLocationMobile]
						--,[ServiceLocationFax]
						,[ServiceLocationEmail]
						,[ServiceLocationResponsiblePerson]
						--,[PreferredTechnician]
						--,[ReportRecipients]
						,[PurchaseOrderNo]
						--,[StationKey]
						--,[Planned]
						,[CommissionNo]
						--,[CostingUnit]
						--,[ExtendedCommissionNo]
						--,[ExtendedPurchaseNo]
						--,[ServiceText]
						--,[ShippingData]
						--,[ObjectDescription]
					) VALUES (
						[source].[ContactId]
						,[source].[LmobileOrderNo]
						,[source].[CustomerContactId]
						,[source].[LmobileStateKey]
						,[source].[OrderTypeKey]
						,GETUTCDATE() -- we should user the source
						,[source].[ErrorMessage]
						,[source].[InstallationNo]	
						--,[source].[Deadline]
						,[source].[Priority]
						,[source].[ServiceLocationName1]
						,[source].[ServiceLocationName2]
						,[source].[ServiceLocationName3]
						,[source].[ServiceLocationCity]
						,[source].[ServiceLocationCountryKey]
						,[source].[ServiceLocationZipCode]
						,[source].[ServiceLocationStreet]
						,[source].[ServiceLocationPhone]
					    ,[source].[ServiceLocationMobile]
						--,[source].[ServiceLocationFax]
						,[source].[ServiceLocationEmail]
						,[source].[ServiceLocationResponsiblePerson]
						--,[source].[PreferredTechnician]
						--,[source].[ReportRecipients]
						,[source].[PurchaseOrderNo]
						--,[source].[StationKey]
						--,[source].[Planned]
						,[source].[TopLogNo]
						--,[source].[TopLogNo]
						--,[source].[ExtendedCommissionNo]
						--,[source].[ExtendedPurchaseNo]
						--,[source].[ServiceText]
						--,[source].[ShippingData]
						--,[source].[ObjectDescription]
					);
			END
		END TRY
		BEGIN CATCH
			IF @@TRANCOUNT > 0
				ROLLBACK TRANSACTION;
			THROW
		END CATCH

		IF @@TRANCOUNT > 0
			COMMIT TRANSACTION;


			
		PRINT 'Import ' + @tableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
			
		SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'INSERT'
		EXEC SP_Import_WriteLog 'INSERT', @tableName, @count;
					
		SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'UPDATE'
		EXEC SP_Import_WriteLog 'UPDATE', @tableName, @count;
	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
		
		SELECT
			@ErrorMessage = Substring(ERROR_MESSAGE(), 0, 1000),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
		
		EXEC [dbo].[SP_Import_SendErrorMessage] @tableName, @ErrorMessage;
		EXEC SP_Import_WriteErrorLog  @tableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH;
END
GO