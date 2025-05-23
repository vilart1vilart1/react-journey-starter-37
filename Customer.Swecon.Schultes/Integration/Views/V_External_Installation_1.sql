USE [LMobileTest]
GO

/****** Object:  View [dbo].[V_External_Installation]    Script Date: 13.04.2022 14:42:53 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO


ALTER VIEW [dbo].[V_External_Installation] AS
SELECT InstallationNo,
Mandatory,
Commission,
InstallationType,
KickOffDate,
WarrantyFrom,
WarrantyUntil,
CompanyNo,
AddressNo,
Backgroundlnformation,
ExactPlace,
Room,
ManufacturingDate,
OperatingHours,
InstallationType as CustomInstallationType,
WarrantyExtensionType,
WarrantyExtensionEndDate,
WarrantyUntilOperatingHours,
WarrantyExtensionEndOperatingHours,
ManufacturerWarrantyCode,
SalesPersonEmail,
TechnicalSupportEmail,
TravelLumpSum,
UsageCodeKey,
NextUvvDate,
StationKey,
LegacyInstallationId,
BGR500,
GarantieVerlaengerungsTyp,
GarantieBis,
GarantieStunde,
 replace(InstallationNo,'','') as LegacyId
,InstallationType + ' / ' + Description as Description
FROM [dbo].[S_Installation] WHERE Mandatory = 1
GO


