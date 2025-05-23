
ALTER VIEW [dbo].[V_EXTERNAL_SERVICEORDERMATERIALEXPORT] AS
				SELECT DISTINCT
												 soh.[OrderNo]
												,som.[PosNo]
												,som.[ItemNo] as ArticleId
												,a.[ArticleType]
												,som.[Description]
												,som.[ActualQuantity]
												,som.[EstimatedQuantity]
												,som.[InvoiceQuantity]
												,som.[QuantityUnit]
												,som.[InternalRemark]
												,case when som.[ExternalRemark] is null then 0 else 1 end as IsExternalMaterial
   												,som.[ExternalRemark] as ExternalArticleDescription
												,som.[DiscountPercent]
												,som.[CreateUser]
												,som.[ModifyUser]
												,som.[CreateDate]
												,som.[ModifyDate]
												,som.[HourlyRate] as SinglePrice
												,0 as Tenant
												,CAST(som.[HourlyRate] * som.[ActualQuantity] as decimal(38,2)) as EndPrice		
				FROM SMS.ServiceOrderMaterial som
				
				Join CRM.Article a on a.ItemNo = som.ItemNo
				JOIN V_EXTERNAL_SERVICEORDEREXPORT soh ON soh.[LMobileOrderNo] = som.[OrderNo] 
				--join crm.Contact co on co.[ContactId] = soh.[ContactKey]
				WHERE som.IsActive = 1 
				and som.ActualQuantity > 0


				 UNION ALL

				 SELECT DISTINCT
												 soh.[OrderNo]
												,som.[PosNo]
												,som.[ItemNo] as ArticleId
												,a.[ArticleType]
												,som.[Description]
												,som.[ActualQuantity]
												,som.[EstimatedQuantity]
												,som.[InvoiceQuantity]
												,som.[QuantityUnit]
												,som.[InternalRemark]
												,case when som.[ExternalRemark] is null then 0 else 1 end as IsExternalMaterial
   												,som.[ExternalRemark] as ExternalArticleDescription
												,som.[DiscountPercent]
												,som.[CreateUser]
												,som.[ModifyUser]
												,som.[CreateDate]
												,som.[ModifyDate]
												,som.[HourlyRate] as SinglePrice
												,1 as Tenant
												,CAST(som.[HourlyRate] * som.[ActualQuantity] as decimal(38,2)) as EndPrice		
				FROM LMobileTest_Tenant_1.SMS.ServiceOrderMaterial som
				
				Join LMobileTest_Tenant_1.CRM.Article a on a.ItemNo = som.ItemNo
				JOIN V_EXTERNAL_SERVICEORDEREXPORT soh ON soh.[LMobileOrderNo] = som.[OrderNo] 
				--join crm.Contact co on co.[ContactId] = soh.[ContactKey]
				WHERE som.IsActive = 1 
				and som.ActualQuantity > 0

GO


