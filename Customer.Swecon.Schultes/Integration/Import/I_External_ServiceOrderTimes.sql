SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

BEGIN
SET NOCOUNT ON;

DECLARE @log AS VARCHAR(MAX);
SET @log = 'Service Order Time Import started';
EXEC SP_WriteLog @log, @print = 0
BEGIN TRY


	DECLARE @timeDiff AS DATETIME;
	SET @timeDiff = GETDATE();
	
	DECLARE @totalTime AS DATETIME;
	SET @totalTime = GETDATE();

	IF OBJECT_ID('tempdb..#I_ServiceOrderTimes_Input') IS NOT NULL DROP TABLE #I_ServiceOrderTimes_Input
	IF OBJECT_ID('tempdb..#I_ServiceOrderTimes_Output') IS NOT NULL DROP TABLE #I_ServiceOrderTimes_Output
	CREATE TABLE #I_ServiceOrderTimes_Output ([Change] NVARCHAR(50), IsActive BIT NULL)

	
	SELECT ext.*, soh.[Status] AS ServiceOrderStatus ,BINARY_CHECKSUM(*) as [LegacyVersion]
	into  #I_ServiceOrderTimes_Input
	FROM V_External_ServiceOrderTimes ext
	JOIN SMS.ServiceOrderHead soh ON ext.OrderNo = soh.OrderNo


	DECLARE @transfer NVARCHAR(100);
	SELECT @transfer = 'Transfered ' + CONVERT(NVARCHAR(10), COUNT(*)) + ' rows to #I_ServiceOrderTimes_Input' FROM #I_ServiceOrderTimes_Input
	EXEC SP_AppendNewLine @log OUTPUT, @transfer, @timeDiff OUTPUT;

	BEGIN TRANSACTION
	BEGIN TRY	

	MERGE [SMS].[ServiceOrderTimes] AS [target]
	USING #I_ServiceOrderTimes_Input AS [source]
    ON [target].[OrderNo] = [source].[OrderNo]	
	WHEN NOT MATCHED
		THEN
			INSERT ([id], [OrderNo], [PosNo], [ItemNo], [Description], [CreatedLocal], [Status], [CreateDate], [CreateUser], [ModifyDate], [ModifyUser], [IsExported], [IsActive])
			VALUES (NEWID(), source.[OrderNo], '10000', '0300', source.[Description], 0, 'Created', GETUTCDATE(), 'Import',GETUTCDATE(), 'Import', 0, 1)
	WHEN MATCHED 
		AND [source].[ServiceOrderStatus] <> 'Completed'
		AND [target].[LegacyVersion] <> [source].[LegacyVersion]
		THEN
			UPDATE
			SET [ItemNo] = '0300'
			,[Description] = source.[Description]
			,[ModifyDate] = GETUTCDATE()
			,[ModifyUser] = 'Import'
			,[LegacyVersion] = source.[LegacyVersion]

	OUTPUT $action, inserted.IsActive INTO #I_ServiceOrderTimes_Output;
	EXEC SP_AppendResult 'Merged Service Order Time', '#I_ServiceOrderTimes_Output', @log OUTPUT, @timeDiff OUTPUT

		END TRY
	BEGIN CATCH
		IF @@TRANCOUNT > 0
			ROLLBACK TRANSACTION;
		THROW
	END CATCH

	IF @@TRANCOUNT > 0
		COMMIT TRANSACTION;

	SET @log = 'Service Order Time Import finished: ' + @log;
	EXEC SP_WriteLog @log, @print = 0
END TRY
BEGIN CATCH
	DECLARE @name AS NVARCHAR(100)
	SET @name = 'Service Order Time Import'
	EXEC SP_CatchError @name;
END CATCH;
END
GO