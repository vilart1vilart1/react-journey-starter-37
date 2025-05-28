CREATE PROCEDURE [dbo].[SP_Import_WriteLog]
	@CRUDType as nvarchar(100),
	@TableName as nvarchar(100),
	@Count as bigInt	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	--Write Message in Log
	IF @Count > 0
	BEGIN
		PRINT 'Import ' + @TableName + ': ' + @CRUDType + ' ' + CONVERT(NVARCHAR, @Count) + ' Rows';
				
		INSERT INTO [CRM].[Log]
		(
			[Date],	
			[Thread],				
			[Level],
			[Logger],
			[Message]
		) VALUES (
			GETUTCDATE(),
			'',
			'DEBUG',
			'Import',
			@TableName + ' - ' + @CRUDType + ' Rows: ' + ' ' + CONVERT(NVARCHAR, @count)	
		)
	END;
END
GO
