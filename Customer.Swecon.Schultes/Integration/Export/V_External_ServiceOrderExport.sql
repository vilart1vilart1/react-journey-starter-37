
ALTER VIEW [dbo].[V_EXTERNAL_SERVICEORDEREXPORT] AS
															SELECT DISTINCT
												case 
												when so.[OrderNo] not like '%Adhoc%' 
												then concat('KAUF@0||0||',so.[OrderNo])
												else so.[OrderNo]										
												End AS OrderNo,
												case 
												when so.[Status] = 'PartiallyCompleted'
												then 1 else 0 end as FollowUpOrder
												,so.[OrderNo] as [LMobileOrderNo]
												,ISNULL(Null,'0') As Mandatory
												,ISNULL(Null,'0') As Branch
												,so.[CommissionNo] AS Commission
												,so.[ErrorMessage]
												,cc.[LegacyId] AS CustomerNo
												,so.[InstallationNo]
												,so.OrderType As OrderTypeKey
												,so.[Status] As OrderStateKey
												,so.[Reported]
												,so.[Planned]
												,so.[Deadline]
												,so.[Priority]
												,so.[StationKey]
												,so.[PurchaseOrderNo]
												,so.[Name1] As ServiceLocationName1
												,so.[Name2] As ServiceLocationName2
												,so.[Name3] As ServiceLocationName3
												,so.[Street] As ServiceLocationStreet
												,so.[City] As ServiceLocationCity
												,so.[ZipCode] As ServiceLocationZipCode
												,so.[ServiceLocationPhone]
												,so.[ServiceLocationFax]
												,so.[ServiceLocationEmail]
												,so.[ServiceLocationResponsiblePerson]											
												,'KMONT@0||' + eng.[PersonnelId] as PersonID
												,sd.[IncidentalMaterial] as Kleinmaterial
												,sd.[OperatingHours] as OperatingHours
												,sd.[DisposedOilSum] as DisposedOil
												,sd.[DisposedFilterSum] as DisposedFilter
												,sd.[DisposedTubeSum] as DisposedTube
												--,so.[PlannedDateFix]
												--,ir.[LegacyId] AS InvoiceRecipientNo
												--,pa.[LegacyId] AS PayerNo
												--,ii.[LegacyId] AS InitiatorNo
			FROM SMS.ServiceOrderHead so		
			INNER JOIN (SELECT sd.*,
            Row_number() 
              OVER ( 
                partition BY orderid 
                ORDER BY modifydate DESC ) AS seqnum 
             FROM   SMS.ServiceOrderDispatch sd) sd 
         ON so.ContactKey = sd.OrderId 
            AND seqnum = 1 	
				LEFT JOIN CRM.Contact cc ON so.[CustomerContactId] = cc.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN CRM.Contact ir ON so.[InvoiceRecipientId] = ir.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN CRM.Contact ii ON so.[InitiatorId] = ii.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN CRM.Contact pa ON so.[PayerId] = pa.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN CRM.Contact co ON so.[ServiceObjectId] = co.[ContactId] AND co.[ContactType] = 'ServiceObject'
				LEFT JOIN CRM.[User] us ON so.[PreferredTechnician] = us.[Username]
				JOIN CRM.Contact cs ON so.[ContactKey] = cs.[ContactId] AND cs.[ContactType] = 'ServiceOrder'
				--JOIN SMS.ServiceOrderType sot ON so.[OrderType] = sot.[Value] AND sot.[Language] = 'de'
				JOIN SMS.ServiceOrderStatus sos ON so.[Status] = sos.[Value]			
				--JOIN SMS.ServiceOrderDispatch sd on sd.OrderId = so.ContactKey
				JOIN CRM.[user] eng on sd.Username = eng.Username

				
				--JOIN SMS.InstallationHead ins on ins.InstallationNo = so.InstallationNo
				WHERE
				 (so.[Status] = 'Completed' or (so.[Status] = 'PartiallyCompleted' and sd.[Status] = 'ClosedNotComplete'))  and sd.[Status] <> 'Rejected' and sd.IsActive = 1 and cs.LegacyId like '%KAUF%' and cs.IsActive = 1 and sd.IsLastOne = 1 or
				 ((so.[Status] = 'InProgress' or  ( so.[Status] = 'Completed' and sd.IsLastOne = 1) or (so.[Status] = 'PartiallyCompleted' and sd.[Status] = 'ClosedNotComplete'))  and sd.[Status] <> 'Rejected' and OrderNo like '%AdHoc%' and cs.IsActive = 1 and sd.IsActive = 1)
				 and eng.PersonnelId is not null


				  UNION ALL
				  				SELECT DISTINCT
												case 
												when so.[OrderNo] not like '%Adhoc%' 
												then concat('KAUF@0||0||',so.[OrderNo])
												else so.[OrderNo]										
												End AS OrderNo,
												case 
												when so.[Status] = 'PartiallyCompleted'
												then 1 else 0 end as FollowUpOrder
												,so.[OrderNo] as [LMobileOrderNo]
												,ISNULL(Null,'1') As Mandatory
												,ISNULL(Null,'0') As Branch
												,so.[CommissionNo] AS Commission
												,so.[ErrorMessage]
												,cc.[LegacyId] AS CustomerNo
												,so.[InstallationNo]
												,so.OrderType As OrderTypeKey
												,so.[Status] As OrderStateKey
												,so.[Reported]
												,so.[Planned]
												,so.[Deadline]
												,so.[Priority]
												,so.[StationKey]
												,so.[PurchaseOrderNo]
												,so.[Name1] As ServiceLocationName1
												,so.[Name2] As ServiceLocationName2
												,so.[Name3] As ServiceLocationName3
												,so.[Street] As ServiceLocationStreet
												,so.[City] As ServiceLocationCity
												,so.[ZipCode] As ServiceLocationZipCode
												,so.[ServiceLocationPhone]
												,so.[ServiceLocationFax]
												,so.[ServiceLocationEmail]
												,so.[ServiceLocationResponsiblePerson]											
												,'KMONT@0||' + eng.[PersonnelId] as PersonID
												,sd.[IncidentalMaterial] as Kleinmaterial
												,sd.[OperatingHours] as OperatingHours
												,sd.[DisposedOilSum] as DisposedOil
												,sd.[DisposedFilterSum] as DisposedFilter
												,sd.[DisposedTubeSum] as DisposedTube
												--,so.[PlannedDateFix]
												--,ir.[LegacyId] AS InvoiceRecipientNo
												--,pa.[LegacyId] AS PayerNo
												--,ii.[LegacyId] AS InitiatorNo
			FROM LMobileTEst.SMS.ServiceOrderHead so		
			INNER JOIN (SELECT sd.*,
            Row_number() 
              OVER ( 
                partition BY orderid 
                ORDER BY modifydate DESC ) AS seqnum 
             FROM   LMobileTEst.SMS.ServiceOrderDispatch sd) sd 
         ON so.ContactKey = sd.OrderId 
            AND seqnum = 1 	
				LEFT JOIN LMobileTEst.CRM.Contact cc ON so.[CustomerContactId] = cc.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN LMobileTEst.CRM.Contact ir ON so.[InvoiceRecipientId] = ir.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN LMobileTEst.CRM.Contact ii ON so.[InitiatorId] = ii.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN LMobileTEst.CRM.Contact pa ON so.[PayerId] = pa.[ContactId] AND cc.[ContactType] = 'Company'
				LEFT JOIN LMobileTEst.CRM.Contact co ON so.[ServiceObjectId] = co.[ContactId] AND co.[ContactType] = 'ServiceObject'
				LEFT JOIN LMobileTEst.CRM.[User] us ON so.[PreferredTechnician] = us.[Username]
				JOIN LMobileTEst.CRM.Contact cs ON so.[ContactKey] = cs.[ContactId] AND cs.[ContactType] = 'ServiceOrder'
				--JOIN SMS.ServiceOrderType sot ON so.[OrderType] = sot.[Value] AND sot.[Language] = 'de'
				JOIN LMobileTEst.SMS.ServiceOrderStatus sos ON so.[Status] = sos.[Value]			
				--JOIN SMS.ServiceOrderDispatch sd on sd.OrderId = so.ContactKey
				JOIN LMobileTEst.CRM.[user] eng on sd.Username = eng.Username

				
				--JOIN SMS.InstallationHead ins on ins.InstallationNo = so.InstallationNo
				WHERE
				 (so.[Status] = 'Completed' or (so.[Status] = 'PartiallyCompleted' and sd.[Status] = 'ClosedNotComplete'))  and sd.[Status] <> 'Rejected' and sd.IsActive = 1 and cs.LegacyId like '%KAUF%' and cs.IsActive = 1 and sd.IsLastOne = 1 or
				 ((so.[Status] = 'InProgress' or  ( so.[Status] = 'Completed' and sd.IsLastOne = 1) or (so.[Status] = 'PartiallyCompleted' and sd.[Status] = 'ClosedNotComplete'))  and sd.[Status] <> 'Rejected' and OrderNo like '%AdHoc%' and cs.IsActive = 1 and sd.IsActive = 1)
				 and eng.PersonnelId is not null

GO
