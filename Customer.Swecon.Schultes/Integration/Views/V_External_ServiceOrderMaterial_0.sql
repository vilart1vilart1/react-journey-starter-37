
/****** Object:  View [dbo].[V_External_ServiceOrderMaterial]    Script Date: 10.12.2020 11:46:02 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO
ALTER VIEW [dbo].[V_External_ServiceOrderMaterial] AS
SELECT 
case when orderno like '%Adhoc%' then orderno when orderno like '%KAUF%' then
SUBSTRING(OrderNo,CHARINDEX('||',OrderNo)+5
, CHARINDEX('||',OrderNo,CHARINDEX('||',OrderNo)-1) -CHARINDEX('KAUFPOS@0||0||',OrderNo)-1) 
end As LmobileOrderNo,* FROM [dbo].[S_ServiceOrderMaterial] where Mandatory = 0 and Orderno <> '' and UnitOfMeasure <> 'Km'
GO
