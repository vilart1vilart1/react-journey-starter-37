
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
			
			-- Create the temporary table with explicitly defined column lengths
			CREATE TABLE #InstallationHead 
			(
				LegacyId NVARCHAR(100),
				Description NVARCHAR(100),
				Commission DECIMAL(18,2),
				InstallationType NVARCHAR(100), -- Changed from INT to NVARCHAR
				LegacyInstallationId NVARCHAR(100),
				KickOffDate DATETIME,
				ExactPlace NVARCHAR(100),
				NextUvvDate DATETIME,
				GarantieVerlaengerungsTyp INT,
				OperatingHours DECIMAL(18,2),
				CustomInstallationType NVARCHAR(100),
				WarrantyUntilOperatingHours DECIMAL(18,2),
				WarrantyExtensionEndOperatingHours DECIMAL(18,2),
				WarrantyExtensionEndDate DATETIME,
				TravelLumpSum DECIMAL(18,2),
				StationKey NVARCHAR(100),
				ManufacturingDate DATETIME,
				CustomerId UNIQUEIDENTIFIER,
				AddressKey UNIQUEIDENTIFIER,
				LegacyVersion BIGINT
			)
			
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

			-- Insert data into the pre-defined temporary table
			INSERT INTO #InstallationHead (
				LegacyId,
				Description,
				Commission,
				InstallationType,
				LegacyInstallationId,
				KickOffDate,
				ExactPlace,
				NextUvvDate,
				GarantieVerlaengerungsTyp,
				OperatingHours,
				CustomInstallationType,
				WarrantyUntilOperatingHours,
				WarrantyExtensionEndOperatingHours,
				WarrantyExtensionEndDate,
				TravelLumpSum,
				StationKey,
				ManufacturingDate,
				CustomerId,
				AddressKey,
				LegacyVersion
			)
			SELECT DISTINCT
				-- Truncate to match the defined column length
				LEFT(ISNULL(v.[LegacyId], ''), 100) as LegacyId,
				LEFT(ISNULL(v.[DESCRIPTION], ''), 100) AS [Description],
				v.[Commission],
				LEFT(ISNULL(CAST(v.[InstallationType] AS NVARCHAR(100)), ''), 100) AS [InstallationType], -- Convert to string and truncate
				LEFT(ISNULL(v.[LegacyInstallationId], ''), 100) AS [LegacyInstallationId],
				v.[KickOffDate],
				LEFT(ISNULL(v.[ExactPlace], ''), 100) AS [ExactPlace],
				v.[NextUvvDate],
				v.[GarantieVerlaengerungsTyp],
				v.[OperatingHours],
				LEFT(ISNULL(v.[CustomInstallationType], ''), 100) AS [CustomInstallationType],
				v.[WarrantyUntilOperatingHours],
				v.[WarrantyExtensionEndOperatingHours],
				v.[WarrantyExtensionEndDate],
				v.[TravelLumpSum],
				LEFT(ISNULL(v.[StationKey], ''), 100) AS [StationKey],
				v.[ManufacturingDate],
				c.ContactId AS CustomerId,
				a.AddressId AS AddressKey,
				BINARY_CHECKSUM (
					LEFT(ISNULL(v.[LegacyId], ''), 100),
					LEFT(ISNULL(v.[DESCRIPTION], ''), 100),
					ISNULL(v.[Commission], 0),
					LEFT(ISNULL(CAST(v.[InstallationType] AS NVARCHAR(100)), ''), 100), -- Convert to string in checksum too
					LEFT(ISNULL(v.[LegacyInstallationId], ''), 100),
					ISNULL(v.[KickOffDate], '1900-01-01'),
					LEFT(ISNULL(v.[ExactPlace], ''), 100),
					ISNULL(v.[OperatingHours], 0),
					LEFT(ISNULL(v.[CustomInstallationType], ''), 100),
					ISNULL(v.[WarrantyUntilOperatingHours], 0),
					ISNULL(v.[WarrantyExtensionEndOperatingHours], 0),
					ISNULL(v.[WarrantyExtensionEndDate], '1900-01-01'),
					ISNULL(v.[TravelLumpSum], 0),
					ISNULL(v.[GarantieVerlaengerungsTyp], 0),
					LEFT(ISNULL(v.[StationKey], ''), 100),
					ISNULL(v.[ManufacturingDate], '1900-01-01'),
					ISNULL(c.ContactId, '00000000-0000-0000-0000-000000000000'),
					ISNULL(a.AddressId, '00000000-0000-0000-0000-000000000000')
				) AS LegacyVersion
			FROM #RemoteInstallation AS v
			JOIN [CRM].[Contact] c
				ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
			LEFT OUTER JOIN [CRM].[Address] a
				ON v.[AddressNo] = a.LegacyId
				
			-- Create index on the explicitly sized LegacyId column
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
						[target].[Name] = source.[DESCRIPTION],
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
						source.[DESCRIPTION],
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
						[ManufactureYear] = source.[ManufacturingDate],
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
						[WarrantyExtensionEndOperatingHours]
					
					)
					VALUES
					(
						source.[LegacyId],
						source.[ContactId],
						-- Convert InstallationType to INT if the target table expects INT
						CASE 
							WHEN ISNUMERIC(source.[InstallationType]) = 1 
							THEN CAST(source.[InstallationType] AS INT)
							ELSE 0 -- Default value for non-numeric installation types
						END,
						source.[LegacyInstallationId],
						CASE WHEN source.[KickOffDate] IS NOT NULL 
						THEN  source.[KickOffDate]
						ELSE source.[ManufacturingDate] END,
						source.[Description],
						0,
						0,
						0,
						source.[OperatingHours],
						source.[CustomInstallationType],
						source.AddressKey,
						0,
						source.[CustomerId],
						source.[ManufacturingDate],
						source.[ExactPlace],
						source.[NextUvvDate],
						source.[GarantieVerlaengerungsTyp],
						source.[WarrantyExtensionEndDate],
						source.[WarrantyExtensionEndOperatingHours]
						
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
