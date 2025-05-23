
/****** Object:  View [dbo].[V_External_ServiceOrderTimes]    Script Date: 12.04.2021 16:40:51 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO



ALTER view [dbo].[V_External_ServiceOrderTimes] as
SELECT distinct
											     som.[LmobileOrderNo]	as [OrderNo]			
												,ih.[Description]
											,BINARY_CHECKSUM(
								 som.[LmobileOrderNo]
								,ih.[Description]
								) AS [LegacyVersion]
												
				 FROM V_External_ServiceOrder som
				
				
				
				join SMS.InstallationHead ih on ih.[InstallationNo] = som.[InstallationNo]
				join crm.Contact co on co.[ContactId] = ih.[ContactKey]
	

GO


