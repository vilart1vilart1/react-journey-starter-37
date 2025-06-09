
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
  AND (
    -- Check for obviously invalid dates
    YEAR(KickOffDate) < 1900 OR 
    YEAR(KickOffDate) > 2100 OR
    -- Check for dates that might cause conversion issues in the import process
    KickOffDate = '1900-01-01' OR
    DAY(KickOffDate) > 28 AND MONTH(KickOffDate) = 2 -- Feb 29th issues
  );

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
  AND (
    -- Check for obviously invalid dates
    YEAR(NextUvvDate) < 1900 OR 
    YEAR(NextUvvDate) > 2100 OR
    -- Check for dates that might cause conversion issues
    NextUvvDate = '1900-01-01' OR
    DAY(NextUvvDate) > 28 AND MONTH(NextUvvDate) = 2
  );

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
  AND (
    -- Check for obviously invalid dates
    YEAR(WarrantyExtensionEndDate) < 1900 OR 
    YEAR(WarrantyExtensionEndDate) > 2100 OR
    -- Check for dates that might cause conversion issues
    WarrantyExtensionEndDate = '1900-01-01' OR
    DAY(WarrantyExtensionEndDate) > 28 AND MONTH(WarrantyExtensionEndDate) = 2
  );

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
  AND (
    -- Check for obviously invalid dates
    YEAR(ManufacturingDate) < 1800 OR 
    YEAR(ManufacturingDate) > 2100 OR
    -- Check for dates that might cause conversion issues
    ManufacturingDate = '1900-01-01' OR
    DAY(ManufacturingDate) > 28 AND MONTH(ManufacturingDate) = 2
  );

PRINT '';
PRINT '5. RECORDS WITH EXTREME DATE VALUES';
PRINT '===================================';

-- Check for records with dates that are at the boundaries of datetime2 range
SELECT 
    'EXTREME_DATE_VALUES' AS ErrorType,
    LegacyId AS InstallationNumber,
    DESCRIPTION AS InstallationDescription,
    CASE 
        WHEN KickOffDate < '1753-01-01' OR KickOffDate > '9999-12-31' THEN CAST(KickOffDate AS NVARCHAR(50))
        WHEN NextUvvDate < '1753-01-01' OR NextUvvDate > '9999-12-31' THEN CAST(NextUvvDate AS NVARCHAR(50))
        WHEN WarrantyExtensionEndDate < '1753-01-01' OR WarrantyExtensionEndDate > '9999-12-31' THEN CAST(WarrantyExtensionEndDate AS NVARCHAR(50))
        WHEN ManufacturingDate < '1753-01-01' OR ManufacturingDate > '9999-12-31' THEN CAST(ManufacturingDate AS NVARCHAR(50))
        ELSE 'Multiple extreme dates detected'
    END AS ProblematicDate,
    'Date value outside datetime2 valid range (1753-01-01 to 9999-12-31)' AS ErrorDescription
FROM V_External_Installation
WHERE (KickOffDate < '1753-01-01' OR KickOffDate > '9999-12-31')
   OR (NextUvvDate < '1753-01-01' OR NextUvvDate > '9999-12-31')
   OR (WarrantyExtensionEndDate < '1753-01-01' OR WarrantyExtensionEndDate > '9999-12-31')
   OR (ManufacturingDate < '1753-01-01' OR ManufacturingDate > '9999-12-31');

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
  AND (v.KickOffDate IS NULL OR (v.KickOffDate >= '1753-01-01' AND v.KickOffDate <= '9999-12-31'))
  AND (v.NextUvvDate IS NULL OR (v.NextUvvDate >= '1753-01-01' AND v.NextUvvDate <= '9999-12-31'))
  AND (v.WarrantyExtensionEndDate IS NULL OR (v.WarrantyExtensionEndDate >= '1753-01-01' AND v.WarrantyExtensionEndDate <= '9999-12-31'))
  AND (v.ManufacturingDate IS NULL OR (v.ManufacturingDate >= '1753-01-01' AND v.ManufacturingDate <= '9999-12-31'));

PRINT '';
PRINT '7. SUMMARY OF DATE CONVERSION ISSUES';
PRINT '====================================';

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with KickOffDate issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE KickOffDate IS NOT NULL 
  AND (YEAR(KickOffDate) < 1900 OR YEAR(KickOffDate) > 2100 OR KickOffDate = '1900-01-01')

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with NextUvvDate issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE NextUvvDate IS NOT NULL 
  AND (YEAR(NextUvvDate) < 1900 OR YEAR(NextUvvDate) > 2100 OR NextUvvDate = '1900-01-01')

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with WarrantyExtensionEndDate issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE WarrantyExtensionEndDate IS NOT NULL 
  AND (YEAR(WarrantyExtensionEndDate) < 1900 OR YEAR(WarrantyExtensionEndDate) > 2100 OR WarrantyExtensionEndDate = '1900-01-01')

UNION ALL

SELECT 
    'SUMMARY' AS SummaryType,
    'Total records with ManufacturingDate issues' AS IssueCategory,
    COUNT(*) AS RecordCount
FROM V_External_Installation
WHERE ManufacturingDate IS NOT NULL 
  AND (YEAR(ManufacturingDate) < 1800 OR YEAR(ManufacturingDate) > 2100 OR ManufacturingDate = '1900-01-01');

PRINT '';
PRINT '=== END OF DATE CONVERSION DIAGNOSTIC ===';
