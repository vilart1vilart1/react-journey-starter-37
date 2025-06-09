
-- Date Conversion Error Diagnostic Script
-- Identifies records causing "Fehler beim Konvertieren einer Zeichenfolge in ein Datum und/oder eine Uhrzeit"

PRINT '=== DATE CONVERSION ERROR DIAGNOSTIC ===';
PRINT 'Finding records that cause date conversion errors during import';
PRINT '';

-- 1. Check KickOffDate conversion issues
PRINT '1. KICKOFFDATE CONVERSION ERRORS';
PRINT '================================';

SELECT 
    'KICKOFFDATE_ERROR' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    KickOffDate AS ProblematicDate,
    'KickOffDate field contains invalid date value' AS ErrorDescription
FROM V_External_Installation
WHERE KickOffDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, KickOffDate) IS NULL;

PRINT '';
PRINT '2. NEXTUVVDATE CONVERSION ERRORS';
PRINT '================================';

SELECT 
    'NEXTUVVDATE_ERROR' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    NextUvvDate AS ProblematicDate,
    'NextUvvDate field contains invalid date value' AS ErrorDescription
FROM V_External_Installation
WHERE NextUvvDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, NextUvvDate) IS NULL;

PRINT '';
PRINT '3. WARRANTY EXTENSION END DATE ERRORS';
PRINT '=====================================';

SELECT 
    'WARRANTY_END_DATE_ERROR' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    WarrantyExtensionEndDate AS ProblematicDate,
    'WarrantyExtensionEndDate field contains invalid date value' AS ErrorDescription
FROM V_External_Installation
WHERE WarrantyExtensionEndDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, WarrantyExtensionEndDate) IS NULL;

PRINT '';
PRINT '4. MANUFACTURING DATE ERRORS';
PRINT '============================';

SELECT 
    'MANUFACTURING_DATE_ERROR' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    ManufacturingDate AS ProblematicDate,
    'ManufacturingDate field contains invalid date value' AS ErrorDescription
FROM V_External_Installation
WHERE ManufacturingDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, ManufacturingDate) IS NULL;

PRINT '';
PRINT '5. RECORDS WITH EXTREME DATE VALUES (CONVERTED SUCCESSFULLY)';
PRINT '============================================================';

-- Check for records with dates that are at the boundaries of datetime2 range but can be converted
SELECT 
    'EXTREME_DATE_VALUES' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    CASE 
        WHEN TRY_CONVERT(datetime2, KickOffDate) < '1753-01-01' OR TRY_CONVERT(datetime2, KickOffDate) > '9999-12-31' THEN CAST(KickOffDate AS NVARCHAR(50))
        WHEN TRY_CONVERT(datetime2, NextUvvDate) < '1753-01-01' OR TRY_CONVERT(datetime2, NextUvvDate) > '9999-12-31' THEN CAST(NextUvvDate AS NVARCHAR(50))
        WHEN TRY_CONVERT(datetime2, WarrantyExtensionEndDate) < '1753-01-01' OR TRY_CONVERT(datetime2, WarrantyExtensionEndDate) > '9999-12-31' THEN CAST(WarrantyExtensionEndDate AS NVARCHAR(50))
        WHEN TRY_CONVERT(datetime2, ManufacturingDate) < '1753-01-01' OR TRY_CONVERT(datetime2, ManufacturingDate) > '9999-12-31' THEN CAST(ManufacturingDate AS NVARCHAR(50))
        ELSE 'Multiple extreme dates detected'
    END AS ProblematicDate,
    'Date value outside datetime2 valid range (1753-01-01 to 9999-12-31)' AS ErrorDescription
FROM V_External_Installation
WHERE (TRY_CONVERT(datetime2, KickOffDate) IS NOT NULL AND (TRY_CONVERT(datetime2, KickOffDate) < '1753-01-01' OR TRY_CONVERT(datetime2, KickOffDate) > '9999-12-31'))
   OR (TRY_CONVERT(datetime2, NextUvvDate) IS NOT NULL AND (TRY_CONVERT(datetime2, NextUvvDate) < '1753-01-01' OR TRY_CONVERT(datetime2, NextUvvDate) > '9999-12-31'))
   OR (TRY_CONVERT(datetime2, WarrantyExtensionEndDate) IS NOT NULL AND (TRY_CONVERT(datetime2, WarrantyExtensionEndDate) < '1753-01-01' OR TRY_CONVERT(datetime2, WarrantyExtensionEndDate) > '9999-12-31'))
   OR (TRY_CONVERT(datetime2, ManufacturingDate) IS NOT NULL AND (TRY_CONVERT(datetime2, ManufacturingDate) < '1753-01-01' OR TRY_CONVERT(datetime2, ManufacturingDate) > '9999-12-31'));

PRINT '';
PRINT '6. RECORDS THAT WILL BE PROCESSED (NO DATE ERRORS)';
PRINT '==================================================';

-- Show records that would actually be processed (have valid company reference and no date issues)
SELECT TOP 10
    'VALID_RECORDS' AS RecordType,
    v.LegacyId AS InstallationNumber,
    v.DESCRIPTION AS InstallationDescription,
    v.KickOffDate,
    v.NextUvvDate,
    v.WarrantyExtensionEndDate,
    v.ManufacturingDate,
    c.Name AS CompanyName
FROM V_External_Installation v
JOIN [CRM].[Contact] c ON v.[CompanyNo] = c.[LegacyId] AND c.[ContactType] = 'Company'
WHERE c.IsActive = 1
  AND (v.KickOffDate IS NULL OR TRY_CONVERT(datetime2, v.KickOffDate) IS NOT NULL)
  AND (v.NextUvvDate IS NULL OR TRY_CONVERT(datetime2, v.NextUvvDate) IS NOT NULL)
  AND (v.WarrantyExtensionEndDate IS NULL OR TRY_CONVERT(datetime2, v.WarrantyExtensionEndDate) IS NOT NULL)
  AND (v.ManufacturingDate IS NULL OR TRY_CONVERT(datetime2, v.ManufacturingDate) IS NOT NULL);

PRINT '';
PRINT '7. SUMMARY OF DATE CONVERSION ISSUES';
PRINT '====================================';

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with KickOffDate conversion issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE KickOffDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, KickOffDate) IS NULL

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with NextUvvDate conversion issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE NextUvvDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, NextUvvDate) IS NULL

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with WarrantyExtensionEndDate conversion issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE WarrantyExtensionEndDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, WarrantyExtensionEndDate) IS NULL

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with ManufacturingDate conversion issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE ManufacturingDate IS NOT NULL 
  AND TRY_CONVERT(datetime2, ManufacturingDate) IS NULL;

PRINT '';
PRINT '=== END OF DATE CONVERSION DIAGNOSTIC ===';
