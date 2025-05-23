ALTER VIEW [dbo].[V_External_ServiceOrder] AS
SELECT * , 
Case when Orderno like '%Adhoc%' then Orderno 
 when Orderno like '%Kauf%' then Right(OriginalOrderNo,CHARINDEX('||0||',OriginalOrderNo)-1)
 end as LmobileOrderNo,
 Case When OrderStateKey = 'Frei' and OrderNo like '%KAUF%' then 'ReadyForScheduling' else 
 'InProgress' End as LMobileStateKey,
 case when Orderno like '%Adhoc%' then commission else NULL end as TopLogNo
 FROM [dbo].[S_ServiceOrder]
 where OrderStateKey = 'Frei'
 and Mandatory = 0 
 and Orderno <> '' 
-- and Orderno not like '%Adhoc%'
GO


