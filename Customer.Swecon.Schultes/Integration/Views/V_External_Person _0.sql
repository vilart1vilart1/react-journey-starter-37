
/****** Object:  View [dbo].[V_External_Person]    Script Date: 10.12.2020 11:42:33 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

ALTER VIEW [dbo].[V_External_Person] AS
SELECT * FROM [dbo].[S_Person] where Mandatory = 0
GO