

ALTER VIEW [dbo].[V_External_ServiceOrder] AS
SELECT * , 
Commission as LmobileOrderNo,
case when orderno like '%KAUF@1||0||%' then 7 else 8 end as StationId,
 Case When OrderStateKey = 'Frei' and OrderNo like '%KAUF%' then 'ReadyForScheduling' else 
 'InProgress' End as LMobileStateKey,
 case when Orderno like '%Adhoc%' then commission else NULL end as TopLogNo
 FROM [dbo].[S_ServiceOrder]
 where OrderStateKey = 'Frei'
 and Mandatory = 1
 and Orderno <> '' 
-- and Orderno not like '%Adhoc%'
GO


