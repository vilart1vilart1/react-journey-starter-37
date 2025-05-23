
/****** Object:  View [dbo].[V_External_Address]    Script Date: 10.12.2020 10:52:54 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[V_External_Address] AS
SELECT * FROM [dbo].[S_Address] where Mandatory = 1
GO