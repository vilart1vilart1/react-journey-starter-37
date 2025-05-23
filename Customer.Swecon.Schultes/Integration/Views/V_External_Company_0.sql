
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



CREATE VIEW [dbo].[V_External_Company] AS
SELECT * FROM [dbo].[S_Company]
WHERE Mandatory = 0
GO


