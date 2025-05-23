


ALTER VIEW [dbo].[V_EXTERNAL_SERVICEORDERTIMEPOSTINGSUNSORTED] AS			
				SELECT   
												soh.[OrderNo] 
												
												
												,CASE 
												WHEN sotp.[ItemNo]	= '0100' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0200' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0300' then 'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0400' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0201' then 'KART@0||8020||133' 
												WHEN sotp.[ItemNo]	= '0301' then 'KART@0||8020||133' 
												WHEN sotp.[ItemNo]	= '0401' then  'KART@0||8020||133'
												WHEN sotp.[ItemNo]	= '8021' then 	 'KART@0||8021||133'
												WHEN sotp.[ItemNo]	= '8022' then 	 'KART@0||8022||133'
												WHEN sotp.[ItemNo]	= '8023' then 	 'KART@0||8023||133'
												WHEN sotp.[ItemNo]	= '8011' then  'KART@0||8011||133'
												WHEN sotp.[ItemNo]	= '8012' then  'KART@0||8012||133'
												WHEN sotp.[ItemNo]	= '8013' then  'KART@0||8013||133' 
												Else sotp.[ItemNo]	END AS [ItemNo]					
												,sotp.[DurationInMinutes]
												,sotp.[Date]
												,sotp.[Kilometers]
												,sotp.[InternalRemark]
												,CASE WHEN sotp.ItemNo = '0300' then CONCAT(FORMAT(CONVERT(DATE, sotp.[Date]),'D','de-de'), ' - ', sotp.[UserUsername], ' - ', soh.[ErrorMessage], ': ', sotp.[Description])  else sotp.[Description] end AS [Description]
												,sotp.[UserUsername] AS Techniker
												,sotp.[From]
												,'KMONT@0||'+ u.[PersonnelId] as PersonID
												,sotp.[To]
												,sotp.[IsOvertime]	
												, 0 as Tenant		
			    FROM SMS.ServiceOrderTimePostings sotp
				JOIN  V_EXTERNAL_SERVICEORDEREXPORT soh ON soh.[LMobileOrderNo] = sotp.[OrderNo]
				--join LU.Engineer eng on sotp.[UserUsername] = eng.EngineerName
				join CRM.[User] u on u.Username = sotp.UserUsername
				WHERE sotp.IsActive = 1

				Union All

				SELECT   
												soh.[OrderNo] 
												
												
												,CASE 
												WHEN sotp.[ItemNo]	= '0100' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0200' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0300' then 'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0400' then  'KART@0||8010||133' 
												WHEN sotp.[ItemNo]	= '0201' then 'KART@0||8020||133' 
												WHEN sotp.[ItemNo]	= '0301' then 'KART@0||8020||133' 
												WHEN sotp.[ItemNo]	= '0401' then  'KART@0||8020||133'
												WHEN sotp.[ItemNo]	= '8021' then 	 'KART@0||8021||133'
												WHEN sotp.[ItemNo]	= '8022' then 	 'KART@0||8022||133'
												WHEN sotp.[ItemNo]	= '8023' then 	 'KART@0||8023||133'
												WHEN sotp.[ItemNo]	= '8011' then  'KART@0||8011||133'
												WHEN sotp.[ItemNo]	= '8012' then  'KART@0||8012||133'
												WHEN sotp.[ItemNo]	= '8013' then  'KART@0||8013||133' 
												Else sotp.[ItemNo]	END AS [ItemNo]					
												,sotp.[DurationInMinutes]
												,sotp.[Date]
												,sotp.[Kilometers]
												,sotp.[InternalRemark]
												,CASE WHEN sotp.ItemNo = '0300' then CONCAT(FORMAT(CONVERT(DATE, sotp.[Date]),'D','de-de'), ' - ', sotp.[UserUsername], ' - ', soh.[ErrorMessage], ': ', sotp.[Description])  else sotp.[Description] end AS [Description]
												,sotp.[UserUsername] AS Techniker
												,sotp.[From]
												,'KMONT@0||'+ u.[PersonnelId] as PersonID
												,sotp.[To]
												,sotp.[IsOvertime]	
											    ,1 as Tenant			
			    FROM LMobileTest_Tenant_1.SMS.ServiceOrderTimePostings sotp
				JOIN  V_EXTERNAL_SERVICEORDEREXPORT soh ON soh.[LMobileOrderNo] = sotp.[OrderNo]
				--join LU.Engineer eng on sotp.[UserUsername] = eng.EngineerName
				join LMobileTest_Tenant_1.CRM.[User] u on u.Username = sotp.UserUsername
				WHERE sotp.IsActive = 1

GO


