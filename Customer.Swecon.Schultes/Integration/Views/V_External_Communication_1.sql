
/****** Object:  View [dbo].[V_External_Communication]    Script Date: 10.12.2020 10:58:43 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[V_External_Communication] AS
SELECT * FROM [dbo].[S_Communication] where Mandantory = 1
GO
