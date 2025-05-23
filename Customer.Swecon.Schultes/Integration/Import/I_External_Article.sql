BEGIN TRY
	DECLARE @logmessage NVARCHAR(4000);
	DECLARE @count BIGINT;
	DECLARE @TableName NVARCHAR(100);

	BEGIN
		SET @TableName = '[CRM].[Contact]';

		BEGIN
			IF OBJECT_ID('tempdb..#Material') IS NOT NULL DROP TABLE #Material
			IF OBJECT_ID('tempdb..#FilteredMaterial') IS NOT NULL DROP TABLE #FilteredMaterial
			IF OBJECT_ID('tempdb..#FilteredContactImport') IS NOT NULL DROP TABLE #FilteredContactImport
			IF OBJECT_ID('tempdb..#DuplicatedMaterial') IS NOT NULL DROP TABLE #DuplicatedMaterial
			IF OBJECT_ID('tempdb..#MaterialWithMissingQuantityUnit') IS NOT NULL DROP TABLE #MaterialWithMissingQuantityUnit
			IF OBJECT_ID('tempdb..#ContactImport') IS NOT NULL DROP TABLE #ContactImport
			CREATE TABLE #ContactImport (Change NVARCHAR(100)
												,ContactId uniqueidentifier 
												,LegacyId NVARCHAR(100)
												,LegacyVersion BIGINT)
		

			SELECT	 [v].[ItemNo]
					--,[v].[LmobileItemNo]
					,[v].[SupplierItemNo]
					,[v].[TopLogNo]
					,[v].[ItemType]
					,[v].[Description]
					,[v].[Price]
					,[v].[UnitOfMeasure] AS [UoM]
					--,Case WHEN [v].[IsSeries] IS NULL THEN '0' END
					,[v].[IsSparePart]
					,[v].[IsResource]
					,[v].[FixedDeliveryRate]
					,[v].[CalculatedGuaranteeProvision]
					,BINARY_CHECKSUM(
								 [v].[ItemType]
								,[v].[Description]
								,[v].[Price]
								,[v].[UnitOfMeasure]
								--,[v].[IsSeries]
								,[v].[IsSparePart]
								,[v].[IsResource]
								,[v].[FixedDeliveryRate]
								,[v].[CalculatedGuaranteeProvision]) AS [LegacyVersion]
			INTO #Material
			from V_External_Article [v]
			WHERE [v].[Description] IS NOT NULL

			CREATE NONCLUSTERED INDEX IX_#Material_ItemNo ON #Material ([ItemNo] ASC)

			--Filter duplicate Material
			select ItemNo
			INTO #DuplicatedMaterial
			from #Material
			group by ItemNo Having Count(*) >1

			IF EXISTS (SELECT ItemNo FROM #DuplicatedMaterial)
			BEGIN
				PRINT N'Duplicate ItemNo found in External Item view'
				PRINT N'Während des Imports wurden mehrere Artikel mit identischer Artikelnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'SELECT ItemNo FROM S_External_Item GROUP BY ItemNo HAVING COUNT(ItemNo) > 1'

				--EXEC dbo.SP_Send_Message
				--	N'Duplicate ItemNo found in External Item view',
				--	N'Während des Imports wurden mehrere Artikel mit identischer Artikelnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT ItemNo FROM S_External_Item GROUP BY ItemNo HAVING COUNT(ItemNo) > 1'
			END

			SELECT ItemNo
			INTO #MaterialWithMissingQuantityUnit
			FROM #Material m
			OUTER APPLY (
				SELECT TOP 1 [Value] AS QuantityUnit FROM [LU].[QUANTITYUNIT] WHERE [Value] = m.UoM
			) QuM
			WHERE QuM.QuantityUnit IS NULL

			IF EXISTS (SELECT ItemNo FROM #MaterialWithMissingQuantityUnit)
			BEGIN
				PRINT N'Material with unknown QuantityUnit found in External Item view'
				PRINT N'Während des Imports wurden mehrere Artikel mit unbekannter Mengeneinheit gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'Bisherige Mengeneinheiten sind unter dieser Query zu finden: "SELECT DISTINCT(Value) FROM [DBNAME].[LU].[QUANTITYUNIT]"'
				PRINT N'Für den Import muss die fehlende Mengeneinheit gepflegt werden: 
				SELECT DISTINCT UNITOFMEASURE FROM V_External_Material material
				OUTER APPLY (
					SELECT TOP 1 [Value] FROM [LU].[QuantityUnit] WHERE [Value] = material.UNITOFMEASURE
				) uom
				WHERE uom.[Value] IS NULL'
				--EXEC dbo.SP_Send_Message
				--	N'Duplicate ItemNo found in External Item view',
				--	N'Während des Imports wurden mehrere Artikel mit identischer Artikelnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT ItemNo FROM S_External_Item GROUP BY ItemNo HAVING COUNT(ItemNo) > 1'
			END

			SELECT [m].*
			INTO #FilteredMaterial
			 from #Material [m]
			LEFT JOIN #DuplicatedMaterial [dm] ON [m].[ItemNo] = [dm].[ItemNo]
			LEFT JOIN #MaterialWithMissingQuantityUnit [mwmqu] ON [m].[ItemNo] = [mwmqu].[ItemNo]
			WHERE [dm].[ItemNo] IS NULL AND [mwmqu].[ItemNo] IS NULL

			CREATE NONCLUSTERED INDEX IX_#FilteredMaterial_ItemNo ON #FilteredMaterial ([ItemNo] ASC)
		END
		
		SELECT @count = COUNT(*) FROM #FilteredMaterial
		SELECT @logmessage = CONVERT(nvarchar, @count) + ' Records transferred to input table'
		Print @logmessage

		-- Merge destination data coming from External sql
		MERGE [CRM].[Contact] AS [target]
		USING #FilteredMaterial AS [source]
		ON [target].[LegacyId] COLLATE DATABASE_DEFAULT = source.[ItemNo] COLLATE DATABASE_DEFAULT
			AND [target].[ContactType] = 'Article'
		-- We already know an element with this LegacyId
		WHEN MATCHED 
			AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion])
			THEN 
			UPDATE SET
				[target].[Name] = [source].[ItemNo]
				,[target].[ModifyDate] = GETUTCDATE()
				,[target].[ModifyUser] = 'Import'
				,[target].[IsActive] = 1
				,[target].[LegacyVersion] = [source].[LegacyVersion]

		WHEN NOT MATCHED
			THEN
			INSERT (
				[ContactType]
				,[LegacyId]
				,[Name]
				,[IsActive]
				,[CreateDate]
				,[ModifyDate]
				,[CreateUser]
				,[ModifyUser]
				,[LegacyVersion]
			) VALUES (
				'Article'
				,[source].[ItemNo]
				,[source].[Description]
				,1
				,GETUTCDATE()
				,GETUTCDATE()
				,'Import'
				,'Import'
				,[source].[LegacyVersion]
			)

		WHEN NOT MATCHED BY SOURCE 
			AND [target].[ContactType] = 'Article'
			AND [target].[IsActive] = 1 
			AND [target].[LegacyID] is not null
			THEN 
			UPDATE SET
				[ModifyDate] = GETUTCDATE()
				,[ModifyUser] = 'Import'
				,[LegacyVersion] = NULL
				,[IsActive] = 0

		OUTPUT $action
				,[inserted].[ContactId]
				,[source].[ItemNo] AS LegacyId
				,[source].[LegacyVersion]
		INTO #ContactImport;

	
		
		PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
		
		SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'INSERT'
		EXEC SP_Import_WriteLog 'INSERT', @TableName, @count;
			
		SELECT @count = COUNT(*) FROM #ContactImport WHERE Change = 'UPDATE'
		EXEC SP_Import_WriteLog 'UPDATE', @TableName, @count;
				
		--Import [CRM].[Article] -------------------------------------------------
		SET @TableName = '[CRM].[Article]';

		-- contactimport filtern
			select b.[ContactId], [a].* into #FilteredContactImport from #FilteredMaterial a JOIN 
			#ContactImport b ON b.[LegacyId] = a.[ItemNo]

		-- Remove duplicates
				delete from #FilteredContactImport 
			where ItemNo in (
				select ItemNo
						from (
							  select ItemNo
							  from #FilteredContactImport
							  group by ItemNo
							  having count(*) > 1
							  ) t  
						)
			
		BEGIN
			RAISERROR ('Processing results of merge to CRM.Article', 10, 0 ) WITH NOWAIT
			MERGE [CRM].[Article] AS [target]
			USING (SELECT  [ci].[ContactId], [a].*
					FROM #FilteredMaterial [a]
					JOIN #FilteredContactImport [ci] ON [ci].[ItemNo] = [a].[ItemNo]) AS [source]
			ON [target].[ArticleId] = [source].[ContactId]

			-- Existing record: update
			WHEN MATCHED
				THEN
				UPDATE SET
					[target].[ItemNo] = [source].[ItemNo]
					,[target].[ArticleType] = case when source.[ItemNo] Like '%||VT2||%' or source.[ItemNo] Like '%||T2||%' then 'Cost' Else 'Material' end	
					,[target].[Description] = [source].[Description]
					,[target].[QuantityUnit] = [source].[UoM]
					,[target].[IsSerial] = 0
					,[target].[IsSparePart] = 1
					--,[target].[IsResource] = [source].[IsResource]
					--,[target].[FixedDeliveryRate] = [source].[FixedDeliveryRate]
					--,[target].[CalculatedGuaranteeProvision] = [source].[CalculatedGuaranteeProvision]
			-- If not found we try to insert with the appropriate data
			WHEN NOT MATCHED
				THEN
				INSERT (
					[ArticleId]
					,[ItemNo]
					,[Description]
					,[QuantityUnit]
					,[ArticleType]
					,[IsSerial]
					,[IsSparePart]
					--,[IsResource]
					--,[FixedDeliveryRate]
					--,[CalculatedGuaranteeProvision]
					,[IsBatch]
					,[DangerousGoodsFlag]
				) VALUES (
					source.[ContactId]
					,source.[itemNo]
					,ISNULL([source].[Description],'')
					,source.[UoM]
					,case when source.[ItemNo] Like '%||VT2||%' or source.[ItemNo] Like '%||T2||%' then 'Cost' Else 'Material' end	
					,0
					--,source.[IsSeries]
					,1
					--,source.[IsResource]
					--,source.[FixedDeliveryRate]
					--,source.[CalculatedGuaranteeProvision]
					,0
					,0
				);
			END
		END
		
		PRINT 'Import ' + @TableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
END TRY
BEGIN CATCH
	DECLARE @ErrorMessage NVARCHAR(4000);
	DECLARE @ErrorSeverity INT;
	DECLARE @ErrorState INT;
	
	SELECT
		@ErrorMessage = Substring(ERROR_MESSAGE(), 0, 1000),
		@ErrorSeverity = ERROR_SEVERITY(),
		@ErrorState = ERROR_STATE();
		
		EXEC [dbo].[SP_Import_SendErrorMessage] @TableName, @ErrorMessage;
		EXEC SP_Import_WriteErrorLog  @TableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
END CATCH;