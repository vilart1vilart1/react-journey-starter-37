
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @count bigint;
	DECLARE @TableName NVARCHAR(100);
	DECLARE @Description NVARCHAR(200);	
	DECLARE @linkedServer NVARCHAR(80);
	
	BEGIN TRY
		SET @TableName = '[CRM].[Contact]';
		SET @Description = 'Import ' + @TableName;
		
		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------	
		BEGIN
			IF OBJECT_ID('tempdb..#ContactImport') IS NOT NULL DROP TABLE #ContactImport
			CREATE TABLE #ContactImport 
			(Change NVARCHAR(100), 
			ContactId UNIQUEIDENTIFIER,
			LegacyId NVARCHAR(100), 
			LegacyVersion BIGINT)
			
			IF OBJECT_ID('tempdb..#InstallationHead') IS NOT NULL DROP TABLE #InstallationHead
			IF OBJECT_ID('tempdb..#RemoteInstallation') IS NOT NULL DROP TABLE #RemoteInstallation
			
			IF OBJECT_ID('tempdb..#InstallationChange') IS NOT NULL DROP TABLE #InstallationChange
			CREATE TABLE #InstallationChange (Change NVARCHAR(100))
			
			IF OBJECT_ID('tempdb..#ContactChange') IS NOT NULL DROP TABLE #ContactChange
			CREATE TABLE #ContactChange (Change NVARCHAR(100))
			
			SELECT *		
			INTO #RemoteInstallation
			FROM V_External_Installation AS v

			CREATE NONCLUSTERED INDEX IX_#RemoteInstallation_CompanyNo ON #RemoteInstallation ([CompanyNo] ASC)
			CREATE NONCLUSTERED INDEX IX_#RemoteInstallation_AddressNo ON #RemoteInstallation ([AddressNo] ASC)

			SELECT DISTINCT
				LEFT(v.[LegacyId], 30) as LegacyId, -- Truncate to match InstallationNo max length
				CASE
					WHEN v.[DESCRIPTION] is null THEN ''
					WHEN LEN(v.[DESCRIPTION]) > 150 THEN LEFT(v.[DESCRIPTION], 150)
					ELSE v.[DESCRIPTION]
				END AS [Description],
				v.[Commission],
				CASE 
					WHEN v.[InstallationType] IS NULL THEN NULL
					WHEN LEN(v.[InstallationType]) > 20 THEN LEFT(v.[InstallationType], 20)
					ELSE v.[InstallationType]
				END AS [InstallationType],
				CASE 
					WHEN v.[LegacyInstallationId] IS NULL THEN NULL
					WHEN LEN(v.[LegacyInstallationId]) > 50 THEN LEFT(v.[LegacyInstallationId], 50)
					ELSE v.[LegacyInstallationId]
				END AS [LegacyInstallationId],
				v.[KickOffDate],
				CASE 
					WHEN v.[ExactPlace] IS NULL THEN NULL
					WHEN LEN(v.[ExactPlace]) > 4000 THEN LEFT(v.[ExactPlace], 4000)
					ELSE v.[ExactPlace]
				END AS [ExactPlace],
				v.[NextUvvDate],
				CASE 
					WHEN v.[GarantieVerlaengerungsTyp] IS NULL THEN NULL
					WHEN LEN(v.[GarantieVerlaengerungsTyp]) > 255 THEN LEFT(v.[GarantieVerlaengerungsTyp], 255)
					ELSE v.[GarantieVerlaengerungsTyp]
				END AS [GarantieVerlaengerungsTyp],
				v.[OperatingHours],
				CASE 
					WHEN v.[CustomInstallationType] IS NULL THEN NULL
					WHEN LEN(v.[CustomInstallationType]) > 255 THEN LEFT(v.[CustomInstallationType], 255)
					ELSE v.[CustomInstallationType]
				END AS [CustomInstallationType],
				v.[WarrantyUntilOperatingHours],
				v.[WarrantyExtensionEndOperatingHours],
				v.[WarrantyExtensionEndDate],
				v.[TravelLumpSum],
				v.[StationKey],
				v.[ManufacturingDate],
				c.ContactId AS CustomerId,
				a.AddressId AS AddressKey,
			BINARY_CHECKSUM (
				LEFT(v.[LegacyId], 30),
				CASE
					WHEN v.[DESCRIPTION] is null THEN ''
					WHEN LEN(v.[DESCRIPTION]) > 150 THEN LEFT(v.[DESCRIPTION], 150)
					ELSE v.[DESCRIPTION]
				END,
				v.[Commission],
				CASE 
					WHEN v.[InstallationType] IS NULL THEN NULL
					WHEN LEN(v.[InstallationType]) > 20 THEN LEFT(v.[InstallationType], 20)
					ELSE v.[InstallationType]
				END,
				CASE 
					WHEN v.[LegacyInstallationId] IS NULL THEN NULL
					WHEN LEN(v.[LegacyInstallationId]) > 50 THEN LEFT(v.[LegacyInstallationId], 50)
					ELSE v.[LegacyInstallationId]
				END,
				v.[KickOffDate],
				CASE 
					WHEN v.[ExactPlace] IS NULL THEN NULL
					WHEN LEN(v.[ExactPlace]) > 4000 THEN LEFT(v.[ExactPlace], 4000)
					ELSE v.[ExactPlace]
				END,
				v.[OperatingHours],
				CASE 
					WHEN v.[CustomInstallationType] IS NULL THEN NULL
					WHEN LEN(v.[CustomInstallationType]) > 255 THEN LEFT(v.[CustomInstallationType], 255)
					ELSE v.[CustomInstallationType]
				END,
				v.[WarrantyUntilOperatingHours],
				v.[WarrantyExtensionEndOperatingHours],
				v.[WarrantyExtensionEndDate],
				v.[TravelLumpSum],
				CASE 
					WHEN v.[GarantieVerlaengerungsTyp] IS NULL THEN NULL
					WHEN LEN(v.[GarantieVerlaengerungsTyp]) > 255 THEN LEFT(v.[GarantieVerlaengerungsTyp], 255)
					ELSE v.[GarantieVerlaengerungsTyp]
				END,
				v.[StationKey],
				v.[ManufacturingDate],
				c.ContactId,
				a.AddressId
			) AS LegacyVersion
			INTO #InstallationHead
			from #RemoteInstallation AS v
			JOIN [CRM].[Contact] c
				ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
			LEFT OUTER JOIN [CRM].[Address] a
				ON v.[AddressNo] = a.LegacyId
				
			-- Create index with limited key length (30 characters max)
			CREATE NONCLUSTERED INDEX IX_#InstallationHead_LegacyId ON #InstallationHead ([LegacyId] ASC)

			SELECT @count = COUNT(*) FROM #InstallationHead
			SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records transferred to input table'
			PRINT @logmessage
		END
		
		BEGIN TRANSACTION
		BEGIN TRY
			-------------------------------------------------
			-- Merge Crm.Contact based on data coming from External view
			-------------------------------------------------
			BEGIN
				MERGE [CRM].[Contact] AS [target]
				USING #InstallationHead AS [source]
				ON [target].[LegacyId] collate database_default = source.LegacyId collate database_default
				AND [target].[ContactType] = 'Installation'
				
				WHEN MATCHED
					AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion]) 
					THEN
					UPDATE SET
						[target].[LegacyVersion] = source.[LegacyVersion],
						[target].[ModifyDate] = getutcdate(),
						[target].[ModifyUser] = 'Import',
						[target].[Name] = CASE 
							WHEN LEN(source.[DESCRIPTION]) > 450 THEN LEFT(source.[DESCRIPTION], 450)
							ELSE source.[DESCRIPTION]
						END,
						[target].[IsActive] = 1
				-- If not found we try to insert with the appropriate data
				WHEN NOT MATCHED 
				THEN
					INSERT (	
						[ContactType],
						[LegacyId],
						[LegacyVersion],
						[IsExported],
						[Name],
						[IsActive],
						[Visibility],
						[CreateDate],
						[ModifyDate],
						[CreateUser],
						[ModifyUser]
					)
					VALUES (
						'Installation',
						source.[LegacyId],
						source.[LegacyVersion],
						0,
						CASE 
							WHEN LEN(source.[DESCRIPTION]) > 450 THEN LEFT(source.[DESCRIPTION], 450)
							ELSE source.[DESCRIPTION]
						END,
						1,
						2,
						getutcdate(),
						getutcdate(),
						'Import',
						'Import'
					)
				WHEN NOT MATCHED BY SOURCE 
				AND [target].[ContactType] = 'Installation' 
				AND [target].[LegacyId] IS NOT NULL
				AND [target].[IsActive] = 1 THEN
					UPDATE SET
						[ModifyDate] = GETUTCDATE(),
						[ModifyUser] = 'Import',
						[LegacyVersion] = NULL,
						[IsActive] = 0
					
				-- All records to the temp table including their action
				OUTPUT  $action,
						inserted.ContactId,
						[source].LegacyId,
						[source].LegacyVersion
				INTO #ContactImport;


				CREATE NONCLUSTERED INDEX IX_#ContactImport_LegacyId ON #ContactImport ([LegacyId] ASC)
				PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
				
				SELECT @count = COUNT(*)
				FROM #ContactImport
				WHERE Change = 'INSERT'
				SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records inserted'

				RAISERROR (@logmessage, 10, 0)
				WITH NOWAIT

				SELECT @count = COUNT(*)
				FROM #ContactImport
				WHERE Change = 'UPDATE'
				SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records updated'

				RAISERROR (@logmessage, 10, 0)
				WITH NOWAIT

				SELECT @count = COUNT(*)
				FROM #ContactImport
				WHERE Change = 'DELETE'
				SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records deleted'

				RAISERROR (@logmessage, 10, 0)
				WITH NOWAIT
			END

			-------------------------------------------------
			-- Merge Entity table
			-------------------------------------------------
			SET @TableName = '[SMS].[Installation]';
			SET @Description = 'Import ' + @TableName;
		
			BEGIN
				RAISERROR ('Processing results of merge to SMS.Installation', 10, 0 ) WITH NOWAIT
				MERGE [SMS].[InstallationHead] AS [target]
				USING (
					SELECT ci.ContactId, i.*
					FROM #InstallationHead i
					JOIN #ContactImport ci ON i.LegacyId COLLATE database_default = ci.LegacyId COLLATE database_default
				) AS [source]
				ON [target].[ContactKey] = [source].[ContactId]
				
				WHEN MATCHED
					THEN
					UPDATE SET
						[Description] = source.[Description],
						[ExactPlace] = source.[ExactPlace],
						[OperatingHours] = source.[OperatingHours],
						[CustomInstallationType] = source.[CustomInstallationType],
						[WarrantyUntilOperatingHours] = source.[WarrantyUntilOperatingHours],
						[WarrantyExtensionEndOperatingHours] = source.[WarrantyExtensionEndOperatingHours],
						[TravelLumpSum] = source.[TravelLumpSum],
						[NextUvvDate] = source.[NextUvvDate],
						[WarrantyExtensionType] = source.[GarantieVerlaengerungsTyp],
						[WarrantyExtensionEndDate]  = source.[WarrantyExtensionEndDate],
						[StationKey] = source.[StationKey],
						[ManufactureYear] = CASE 
							WHEN source.[ManufacturingDate] IS NULL THEN NULL
							WHEN LEN(CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR)) > 255 THEN LEFT(CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR), 255)
							ELSE CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR)
						END,
						[LocationAddressKey] = source.AddressKey,
						[LocationContactId] = source.CustomerId,
						[KickOffDate]  = source.[KickOffDate],
						[LegacyInstallationId]  = source.[LegacyInstallationId]
					
				WHEN NOT MATCHED THEN
					INSERT
					(
						[InstallationNo],
						[ContactKey],
						[InstallationType],
						[LegacyInstallationId],
						[KickOffDate],
						[Description],
						[Priority],
						[Status],
						[Favorite],
						[OperatingHours],
						[CustomInstallationType],
						[LocationAddressKey],
						[SortOrder],
						[LocationContactId],
						[ManufactureYear],
						[ExactPlace],
						[NextUvvDate],
						[WarrantyExtensionType],
						[WarrantyExtensionEndDate],
						[WarrantyExtensionEndOperatingHours],
						[TravelLumpSum],
						[StationKey],
						[WarrantyUntilOperatingHours]
					)
					VALUES
					(
						source.[LegacyId],
						source.[ContactId],
						source.[InstallationType],
						source.[LegacyInstallationId],
						source.[KickOffDate],
						source.[Description],
						0,
						'0', -- Status as string, not int
						0,
						source.[OperatingHours],
						source.[CustomInstallationType],
						source.AddressKey,
						0,
						source.[CustomerId],
						CASE 
							WHEN source.[ManufacturingDate] IS NULL THEN NULL
							WHEN LEN(CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR)) > 255 THEN LEFT(CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR), 255)
							ELSE CAST(YEAR(source.[ManufacturingDate]) AS NVARCHAR)
						END,
						source.[ExactPlace],
						source.[NextUvvDate],
						source.[GarantieVerlaengerungsTyp],
						source.[WarrantyExtensionEndDate],
						source.[WarrantyExtensionEndOperatingHours],
						source.[TravelLumpSum],
						source.[StationKey],
						source.[WarrantyUntilOperatingHours]
					)
				OUTPUT $action
				INTO #InstallationChange;
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

 		SELECT @count = COUNT(*)
		FROM #InstallationChange
		WHERE Change = 'INSERT'
		SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records inserted'

		RAISERROR (@logmessage, 10, 0)
		WITH NOWAIT

		SELECT @count = COUNT(*)
		FROM #InstallationChange
		WHERE Change = 'UPDATE'
		SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records updated'

		RAISERROR (@logmessage, 10, 0)
		WITH NOWAIT

		SELECT @count = COUNT(*)
		FROM #InstallationChange
		WHERE Change = 'DELETE'
		SELECT @logmessage = CONVERT(NVARCHAR, @count) + ' Records deleted'

		RAISERROR (@logmessage, 10, 0)
		WITH NOWAIT

		UPDATE s
		set s.[Status] = '3'
		FROM SMS.InstallationHead s
		JOIN CRM.Contact c ON s.InstallationNo = c.LegacyId AND c.ContactType = 'Installation' AND c.IsActive = 0
		
	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
		
		SELECT
			@ErrorMessage = ERROR_MESSAGE(),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
			
			EXEC [dbo].[SP_Import_SendErrorMessage] @TableName, @ErrorMessage;
			

		SELECT @logmessage = 'Importing to CRM.[Contact] exception: ' + @ErrorMessage;
		RAISERROR (@logmessage, @ErrorSeverity, @ErrorState) 
		WITH NOWAIT
	END CATCH;
END
GO
