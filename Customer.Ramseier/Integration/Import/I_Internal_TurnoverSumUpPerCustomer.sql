SET ANSI_NULLS ON
SET QUOTED_IDENTIFIER ON

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @tableName NVARCHAR(100);
	DECLARE @description NVARCHAR(200);
	DECLARE @count as BigInt;
		
	BEGIN TRY
		SET @tableName = '[CRM].[TurnoverSumUpPerCustomer]';
		SET @description = 'Import ' + @tableName;
		
		-------------------------------------------------
		-- Fill temporary merge storage
		-------------------------------------------------	
		BEGIN
			IF OBJECT_ID('tempdb..#TurnoverSumUpPerCustomerImport') IS NOT NULL DROP TABLE #TurnoverSumUpPerCustomerImport
			CREATE TABLE #TurnoverSumUpPerCustomerImport (Change NVARCHAR(100), 
												TurnoverSumUpPerCustomerId UNIQUEIDENTIFIER, 
												LegacyId NVARCHAR(150), 
												LegacyVersion BIGINT)
			IF OBJECT_ID('tempdb..#TurnoverSumUpPerCustomer') IS NOT NULL DROP TABLE #TurnoverSumUpPerCustomer

			SELECT 
				v.[Id]
				,v.[ContactKey]
				,v.[ContactName]
				,v.[CurrencyKey]
				,v.[QuantityUnitKey]
				,v.[IsVolume]
				,v.[LegacyId]
				,v.[TotalCurrentYear]
				,v.[ExtrapolatedTotalCurrentYear]
				,v.[TotalPreviousYear]
				,v.[TotalPrePreviousYear]
				,v.[TotalMinusThreeYears]
				,v.[Difference]
				,v.[ModifyDate]
				,v.[CreateDate]
				,v.[ModifyUser]
				,v.[CreateUser]
				,v.[LegacyVersion]
			INTO #TurnoverSumUpPerCustomer
			FROM dbo.TurnoverSumUpPerCustomer v

			CREATE NONCLUSTERED INDEX IX_#TurnoverSumUpPerCustomer_LegacyId ON #TurnoverSumUpPerCustomer ([LegacyId] ASC)
		END

		-------------------------------------------------
		-- Merge Entity table
		-------------------------------------------------	
		BEGIN
			MERGE [CRM].[TurnoverSumUpPerCustomer] AS [target]
			USING #TurnoverSumUpPerCustomer AS [source]
			ON [target].[LegacyId] = [source].[LegacyId]
			WHEN MATCHED  
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
			THEN UPDATE SET 
				[target].[ContactKey] = [source].[ContactKey]
				,[target].[ContactName] = [source].[ContactName]
				,[target].[CurrencyKey] = [source].[CurrencyKey]
				,[target].[QuantityUnitKey] = [source].[QuantityUnitKey]
				,[target].[IsVolume] = [source].[IsVolume]
				,[target].[LegacyId] = [source].[LegacyId]
				,[target].[TotalCurrentYear] = [source].[TotalCurrentYear]
				,[target].[ExtrapolatedTotalCurrentYear] = [source].[ExtrapolatedTotalCurrentYear]
				,[target].[TotalPreviousYear] = [source].[TotalPreviousYear]
				,[target].[TotalPrePreviousYear] = [source].[TotalPrePreviousYear]
				,[target].[TotalMinusThreeYears] = [source].[TotalMinusThreeYears]
				,[target].[Difference] = [source].[Difference]
				,[target].[IsActive] = 1
				,[target].[ModifyDate] = GETUTCDATE()
				,[target].[ModifyUser] = 'BackgroundService'
				,[target].[LegacyVersion] = source.[LegacyVersion]

			WHEN NOT MATCHED 
			THEN INSERT	(
				[Id]
				,[ContactKey]
				,[ContactName]
				,[CurrencyKey]
				,[QuantityUnitKey]
				,[IsVolume]
				,[LegacyId]
				,[TotalCurrentYear]
				,[ExtrapolatedTotalCurrentYear]
				,[TotalPreviousYear]
				,[TotalPrePreviousYear]
				,[TotalMinusThreeYears]
				,[Difference]
				,[IsActive]
				,[CreateDate]
				,[CreateUser]
				,[ModifyDate]
				,[ModifyUser]
				,[LegacyVersion]
			) VALUES (
				[source].[Id]
				,[source].[ContactKey]
				,[source].[ContactName]
				,[source].[CurrencyKey]
				,[source].[QuantityUnitKey]
				,[source].[IsVolume]
				,[source].[LegacyId]
				,[source].[TotalCurrentYear]
				,[source].[ExtrapolatedTotalCurrentYear]
				,[source].[TotalPreviousYear]
				,[source].[TotalPrePreviousYear]
				,[source].[TotalMinusThreeYears]
				,[source].[Difference]
				,1
				,GETUTCDATE()
				,[source].[CreateUser]
				,GETUTCDATE()
				,'BackgroundService'
				,[source].[LegacyVersion]
			)

			WHEN NOT MATCHED BY SOURCE
				AND [target].[IsActive] = 1
				AND [target].[LegacyId] IS NOT NULL
			THEN UPDATE SET
				[target].[IsActive] = 0
				,[target].[LegacyVersion] = NULL
				,[target].[ModifyDate] = GETUTCDATE()
    			,[target].[ModifyUser] = 'BackgroundService'

			OUTPUT 
				$ACTION
				,inserted.Id
				,[source].[LegacyId]
				,[source].[LegacyVersion]
			INTO #TurnoverSumUpPerCustomerImport;

			PRINT 'Import ' + @tableName + ': TOTAL ' +  CAST(@@ROWCOUNT AS VARCHAR(20)) + ' Rows';
				
			SELECT @count = COUNT(*) FROM #TurnoverSumUpPerCustomerImport WHERE Change = 'INSERT'			
			EXEC SP_Import_WriteLog 'INSERT', @tableName, @count;
					
			SELECT @count = COUNT(*) FROM #TurnoverSumUpPerCustomerImport WHERE Change = 'UPDATE'			
			EXEC SP_Import_WriteLog 'UPDATE', @tableName, @count;

			SELECT @count = COUNT(*) FROM #TurnoverSumUpPerCustomerImport WHERE Change = 'DELETE'			
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
			
		EXEC SP_Import_WriteErrorLog  @tableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH;
END
