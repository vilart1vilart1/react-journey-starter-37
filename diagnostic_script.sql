
-- Diagnostic Script for Installation Import Issues
-- This script only uses SELECT statements to identify import problems

DECLARE @TargetLegacyId NVARCHAR(100) = 'KMASCH@0||5382500089';
DECLARE @TargetDescription NVARCHAR(200) = 'Auftrag 187426';

PRINT '=== DIAGNOSTIC SCRIPT FOR INSTALLATION IMPORT ISSUES ===';
PRINT 'Target LegacyId: ' + @TargetLegacyId;
PRINT 'Target Description: ' + @TargetDescription;
PRINT '';

-- Step 1: Check if the record exists in the source view
PRINT '1. CHECKING SOURCE DATA IN V_External_Installation';
PRINT '================================================';

SELECT 
    'SOURCE_CHECK' AS CheckType,
    COUNT(*) AS RecordCount,
    'Records found in V_External_Installation' AS Description
FROM V_External_Installation 
WHERE LegacyId = @TargetLegacyId
   OR DESCRIPTION LIKE '%' + @TargetDescription + '%';

-- Show the actual source record if it exists
SELECT 
    'SOURCE_RECORD' AS CheckType,
    LegacyId,
    DESCRIPTION,
    CompanyNo,
    AddressNo,
    Commission,
    InstallationType,
    LegacyInstallationId,
    KickOffDate,
    ExactPlace,
    NextUvvDate,
    GarantieVerlaengerungsTyp,
    OperatingHours,
    CustomInstallationType,
    WarrantyUntilOperatingHours,
    WarrantyExtensionEndOperatingHours,
    WarrantyExtensionEndDate,
    TravelLumpSum,
    StationKey,
    ManufacturingDate
FROM V_External_Installation 
WHERE LegacyId = @TargetLegacyId
   OR DESCRIPTION LIKE '%' + @TargetDescription + '%';

PRINT '';
PRINT '2. CHECKING DATE VALUES';
PRINT '=======================';

-- Check date values (datetime2 columns don't need ISDATE validation)
SELECT 
    'DATE_VALUES' AS CheckType,
    LegacyId,
    DESCRIPTION,
    KickOffDate,
    NextUvvDate,
    WarrantyExtensionEndDate,
    ManufacturingDate,
    CASE 
        WHEN KickOffDate IS NULL THEN 'KickOffDate_NULL'
        ELSE 'KickOffDate_HAS_VALUE'
    END AS KickOffDate_Status,
    CASE 
        WHEN NextUvvDate IS NULL THEN 'NextUvvDate_NULL'
        ELSE 'NextUvvDate_HAS_VALUE'
    END AS NextUvvDate_Status,
    CASE 
        WHEN WarrantyExtensionEndDate IS NULL THEN 'WarrantyExtensionEndDate_NULL'
        ELSE 'WarrantyExtensionEndDate_HAS_VALUE'
    END AS WarrantyExtensionEndDate_Status,
    CASE 
        WHEN ManufacturingDate IS NULL THEN 'ManufacturingDate_NULL'
        ELSE 'ManufacturingDate_HAS_VALUE'
    END AS ManufacturingDate_Status
FROM V_External_Installation 
WHERE LegacyId = @TargetLegacyId
   OR DESCRIPTION LIKE '%' + @TargetDescription + '%';

PRINT '';
PRINT '3. CHECKING COMPANY/CONTACT RELATIONSHIP';
PRINT '========================================';

-- Check if the CompanyNo exists in CRM.Contact
SELECT 
    'COMPANY_CHECK' AS CheckType,
    v.LegacyId AS Installation_LegacyId,
    v.DESCRIPTION,
    v.CompanyNo,
    c.ContactId AS Company_ContactId,
    c.Name AS Company_Name,
    c.ContactType AS Company_ContactType,
    c.IsActive AS Company_IsActive,
    CASE 
        WHEN c.ContactId IS NULL THEN 'COMPANY_NOT_FOUND'
        WHEN c.ContactType != 'Company' THEN 'WRONG_CONTACT_TYPE'
        WHEN c.IsActive = 0 THEN 'COMPANY_INACTIVE'
        ELSE 'COMPANY_OK'
    END AS Company_Status
FROM V_External_Installation v
LEFT JOIN [CRM].[Contact] c ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
WHERE v.LegacyId = @TargetLegacyId
   OR v.DESCRIPTION LIKE '%' + @TargetDescription + '%';

PRINT '';
PRINT '4. CHECKING ADDRESS RELATIONSHIP';
PRINT '================================';

-- Check if the AddressNo exists in CRM.Address
SELECT 
    'ADDRESS_CHECK' AS CheckType,
    v.LegacyId AS Installation_LegacyId,
    v.DESCRIPTION,
    v.AddressNo,
    a.AddressId,
    a.LegacyId AS Address_LegacyId,
    CASE 
        WHEN a.AddressId IS NULL AND v.AddressNo IS NOT NULL THEN 'ADDRESS_NOT_FOUND'
        WHEN a.AddressId IS NULL AND v.AddressNo IS NULL THEN 'NO_ADDRESS_SPECIFIED'
        ELSE 'ADDRESS_OK'
    END AS Address_Status
FROM V_External_Installation v
LEFT JOIN [CRM].[Address] a ON v.[AddressNo] = a.LegacyId
WHERE v.LegacyId = @TargetLegacyId
   OR v.DESCRIPTION LIKE '%' + @TargetDescription + '%';

PRINT '';
PRINT '5. CHECKING EXISTING INSTALLATION RECORDS';
PRINT '=========================================';

-- Check if installation already exists in CRM.Contact
SELECT 
    'EXISTING_INSTALLATION' AS CheckType,
    ContactId,
    LegacyId,
    Name,
    ContactType,
    IsActive,
    LegacyVersion,
    CreateDate,
    ModifyDate,
    CreateUser,
    ModifyUser
FROM [CRM].[Contact]
WHERE LegacyId = @TargetLegacyId
  AND ContactType = 'Installation';

PRINT '';
PRINT '6. SIMULATING THE TEMPORARY TABLE CREATION';
PRINT '==========================================';

-- Simulate the #InstallationHead temp table creation to see what would be processed
SELECT 
    'TEMP_TABLE_SIMULATION' AS CheckType,
    LEFT(v.[LegacyId], 30) as LegacyId,
    CASE
        WHEN v.[DESCRIPTION] is null THEN ''
        WHEN LEN(v.[DESCRIPTION]) > 150 THEN LEFT(v.[DESCRIPTION], 150)
        ELSE v.[DESCRIPTION]
    END AS [Description],
    v.[Commission],
    CASE 
        WHEN v.[InstallationType] IS NULL THEN NULL
        WHEN LEN(v.[InstallationType]) > 20 THEN LEFT(v.[InstallationType], 20)
        ELSE v.[InstallationType]
    END AS [InstallationType],
    CASE 
        WHEN v.[LegacyInstallationId] IS NULL THEN NULL
        WHEN LEN(v.[LegacyInstallationId]) > 50 THEN LEFT(v.[LegacyInstallationId], 50)
        ELSE v.[LegacyInstallationId]
    END AS [LegacyInstallationId],
    v.[KickOffDate],
    CASE 
        WHEN v.[ExactPlace] IS NULL THEN NULL
        WHEN LEN(v.[ExactPlace]) > 4000 THEN LEFT(v.[ExactPlace], 4000)
        ELSE v.[ExactPlace]
    END AS [ExactPlace],
    v.[NextUvvDate],
    CASE 
        WHEN v.[GarantieVerlaengerungsTyp] IS NULL THEN NULL
        WHEN LEN(v.[GarantieVerlaengerungsTyp]) > 255 THEN LEFT(v.[GarantieVerlaengerungsTyp], 255)
        ELSE v.[GarantieVerlaengerungsTyp]
    END AS [GarantieVerlaengerungsTyp],
    v.[OperatingHours],
    CASE 
        WHEN v.[CustomInstallationType] IS NULL THEN NULL
        WHEN LEN(v.[CustomInstallationType]) > 255 THEN LEFT(v.[CustomInstallationType], 255)
        ELSE v.[CustomInstallationType]
    END AS [CustomInstallationType],
    v.[WarrantyUntilOperatingHours],
    v.[WarrantyExtensionEndOperatingHours],
    v.[WarrantyExtensionEndDate],
    v.[TravelLumpSum],
    v.[StationKey],
    v.[ManufacturingDate],
    c.ContactId AS CustomerId,
    a.AddressId AS AddressKey,
    c.ContactId AS Company_Found,
    a.AddressId AS Address_Found,
    CASE 
        WHEN c.ContactId IS NULL THEN 'BLOCKING: Company not found'
        WHEN c.ContactType != 'Company' THEN 'BLOCKING: Wrong contact type'
        WHEN c.IsActive = 0 THEN 'BLOCKING: Company inactive'
        ELSE 'OK'
    END AS Processing_Status
FROM V_External_Installation AS v
LEFT JOIN [CRM].[Contact] c ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
LEFT OUTER JOIN [CRM].[Address] a ON v.[AddressNo] = a.LegacyId
WHERE v.LegacyId = @TargetLegacyId
   OR v.DESCRIPTION LIKE '%' + @TargetDescription + '%';

PRINT '';
PRINT '7. DETAILED ANALYSIS FOR TARGET RECORD';
PRINT '======================================';

-- Detailed analysis specifically for the target record
SELECT 
    'TARGET_ANALYSIS' AS CheckType,
    'Step 1: Record exists in source' AS Analysis_Step,
    CASE WHEN COUNT(*) > 0 THEN 'PASS' ELSE 'FAIL' END AS Result,
    CAST(COUNT(*) AS NVARCHAR(10)) + ' records found' AS Details
FROM V_External_Installation 
WHERE LegacyId = @TargetLegacyId OR DESCRIPTION LIKE '%' + @TargetDescription + '%'

UNION ALL

SELECT 
    'TARGET_ANALYSIS' AS CheckType,
    'Step 2: Company reference exists' AS Analysis_Step,
    CASE WHEN COUNT(c.ContactId) > 0 THEN 'PASS' ELSE 'FAIL' END AS Result,
    CASE WHEN COUNT(c.ContactId) > 0 
         THEN 'Company found: ' + ISNULL(MAX(c.Name), 'Unknown')
         ELSE 'Company not found for CompanyNo: ' + ISNULL(MAX(v.CompanyNo), 'NULL')
    END AS Details
FROM V_External_Installation v
LEFT JOIN [CRM].[Contact] c ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
WHERE (v.LegacyId = @TargetLegacyId OR v.DESCRIPTION LIKE '%' + @TargetDescription + '%')

UNION ALL

SELECT 
    'TARGET_ANALYSIS' AS CheckType,
    'Step 3: Company is active' AS Analysis_Step,
    CASE WHEN COUNT(CASE WHEN c.IsActive = 1 THEN 1 END) > 0 THEN 'PASS' 
         WHEN COUNT(c.ContactId) > 0 THEN 'FAIL'
         ELSE 'N/A' END AS Result,
    CASE WHEN COUNT(c.ContactId) = 0 THEN 'No company found'
         WHEN COUNT(CASE WHEN c.IsActive = 1 THEN 1 END) > 0 THEN 'Company is active'
         ELSE 'Company is inactive'
    END AS Details
FROM V_External_Installation v
LEFT JOIN [CRM].[Contact] c ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
WHERE (v.LegacyId = @TargetLegacyId OR v.DESCRIPTION LIKE '%' + @TargetDescription + '%');

PRINT '';
PRINT '=== END OF DIAGNOSTIC SCRIPT ===';
