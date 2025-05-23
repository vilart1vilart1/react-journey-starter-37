SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

BEGIN
SET NOCOUNT ON;

DECLARE @log AS VARCHAR(MAX);
SET @log = 'ServiceOrder Types Import started';
EXEC SP_WriteLog @log, @print = 0
BEGIN TRY


	DECLARE @timeDiff AS DATETIME;
	SET @timeDiff = GETDATE();
	
	DECLARE @totalTime AS DATETIME;
	SET @totalTime = GETDATE();

	IF OBJECT_ID('tempdb..#CustomInstallationType') IS NOT NULL DROP TABLE #CustomInstallationType
	IF OBJECT_ID('tempdb..#I_ServiceOrderTimes_Output') IS NOT NULL DROP TABLE #I_ServiceOrderTimes_Output
	CREATE TABLE #I_ServiceOrderTimes_Output ([Change] NVARCHAR(50), IsActive BIT NULL)
	
	--SELECT ext.*, soh.[Status] AS ServiceOrderStatus ,BINARY_CHECKSUM(*) as [LegacyVersion]
	--into  #I_ServiceOrderTimes_Input
	--FROM V_External_ServiceOrderTimes ext
	--JOIN SMS.ServiceOrderHead soh ON ext.OrderNo = soh.OrderNo


	select InstallationType 
	into #CustomInstallationType
	from SMS.InstallationHead
	group by InstallationType 

	--select * from #CustomInstallationType
	DECLARE @transfer NVARCHAR(100);
	SELECT @transfer = 'Transfered ' + CONVERT(NVARCHAR(10), COUNT(*)) + ' rows to #CustomInstallationType' FROM #CustomInstallationType
	EXEC SP_AppendNewLine @log OUTPUT, @transfer, @timeDiff OUTPUT;

	BEGIN TRANSACTION
	BEGIN TRY	
	
	MERGE [CRM].[CustomInstallationType] AS [target]
	USING #CustomInstallationType AS [source]
    ON [target].[LegacyId] = [source].[InstallationType]	
	WHEN NOT MATCHED
		THEN
			INSERT ( [LegacyId], [Description], [CreateDate], [CreateUser], [ModifyDate], [ModifyUser], [IsActive])
			VALUES ( source.[InstallationType], source.[InstallationType], GETUTCDATE(), 'Import',GETUTCDATE(), 'Import', 1)
	WHEN NOT MATCHED BY SOURCE
		THEN
			UPDATE
					set [IsActive] = 0
					,[ModifyUser] = 'Import remove'
					,[ModifyDate] = GETUTCDATE()

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