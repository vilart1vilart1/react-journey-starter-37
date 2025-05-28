SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_Import_WriteErrorLog]
  @TableName as nvarchar(100),
	@ErrorMessage NVARCHAR(4000),
	@ErrorSeverity int,
	@ErrorState int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;	
		
		DECLARE @logmessage as nvarchar(4000);
		SET @logmessage = SUBSTRING('ERROR ' + @TableName + ' EXCEPTION: ' + @ErrorMessage, 0, 4000);
		PRINT @logmessage

		INSERT INTO [CRM].[Log]
		(
			[Date],
			[Thread],
			[Level],
			[Logger],
			[Message],
			[Exception]
		) VALUES (
			GETUTCDATE(),
			'',
			'ERROR',
			'Import',
			'ERROR ' + @TableName,
			@logmessage
		)
		
	--Send EMail with Error
	--EXEC [SP_Import_SendErrorEMail]	@TableName, @ErrorMessage;
	
	RAISERROR (@logmessage, @ErrorSeverity, @ErrorState) WITH NOWAIT		
END
GO
