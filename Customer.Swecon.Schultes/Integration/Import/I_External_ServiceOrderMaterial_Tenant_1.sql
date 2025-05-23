BEGIN
	SET NOCOUNT ON;
	SET QUOTED_IDENTIFIER ON;

	BEGIN TRY
		DECLARE @count BIGINT;
		DECLARE @tableName NVARCHAR(100);
		SET @tableName = '[SMS].[ServiceOrderMaterial]';
		
		BEGIN
			IF OBJECT_ID('tempdb..#DuplicatedOrderNoPosNo') IS NOT NULL DROP TABLE #DuplicatedOrderNoPosNo
			IF OBJECT_ID('tempdb..#ExtMaterial') IS NOT NULL DROP TABLE #ExtMaterial
			IF OBJECT_ID('tempdb..#ServiceOrderSetArticle') IS NOT NULL DROP TABLE #ServiceOrderSetArticle
			IF OBJECT_ID('tempdb..#ServiceOrderSetArticleHeadAndMaterial') IS NOT NULL DROP TABLE #ServiceOrderSetArticleHeadAndMaterial
			IF OBJECT_ID('tempdb..#ServiceOrderSetArticleHeadAndMaterialImport') IS NOT NULL DROP TABLE #ServiceOrderSetArticleHeadAndMaterialImport
			IF OBJECT_ID('tempdb..#ServiceOrderSetArticleImport') IS NOT NULL DROP TABLE #ServiceOrderSetArticleImport
			IF OBJECT_ID('tempdb..#ServiceOrderMaterial') IS NOT NULL DROP TABLE #ServiceOrderMaterial
			IF OBJECT_ID('tempdb..#ServiceOrderMaterialPre') IS NOT NULL DROP TABLE #ServiceOrderMaterialPre
			CREATE TABLE #ServiceOrderSetArticleHeadAndMaterialImport (Change NVARCHAR(100))
			CREATE TABLE #ServiceOrderSetArticleImport (Change NVARCHAR(100))

			SELECT * 
			INTO #ExtMaterial
			-- select * from #ExtMaterial
			FROM V_External_ServiceOrderMaterial
			CREATE NONCLUSTERED INDEX IX_#ExtMaterial_OrderNo ON #ExtMaterial ([LmobileOrderNo] ASC)
			CREATE NONCLUSTERED INDEX IX_#ExtMaterial_PosNo ON #ExtMaterial ([PosNo] ASC)

			SELECT	
				LmobileOrderNo
				,PosNo
			INTO #DuplicatedOrderNoPosNo
			FROM #ExtMaterial
			GROUP BY LmobileOrderNo
			, PosNo 
			HAVING count(*) > 1


			IF EXISTS (SELECT LmobileOrderNo FROM #DuplicatedOrderNoPosNo)
			BEGIN
				PRINT N'Duplicate OrderNo, PosNo found in External ServiceOrderSetArticle view'
				PRINT N'Während des Imports wurden mehrere Setartikel mit identischer Auftrags- und Positionsnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.'
				PRINT N'SELECT	ORDERNO, POSNO FROM V_External_ServiceOrderSetArticle GROUP BY Orderno, POSNO HAVING COUNT(*) > 1'

				--EXEC dbo.SP_Send_Message
				--	N'Duplicate OrderNo, PosNo found in External ServiceOrderSetArticle view',
				--	N'Während des Imports wurden mehrere Setartikel mit identischer Auftrags- und Positionsnummer gefunden, dies kann von der L-mobile Schnittstelle nicht verarbeitet werden.',
				--	N'SELECT	ORDERNO, POSNO FROM V_External_ServiceOrderSetArticle GROUP BY Orderno, POSNO HAVING COUNT(*) > 1'
			END

			SELECT
				[v].*
				,[a].[QuantityUnit]
				,case when [v].[ItemNo] = 'KART@0||T2||133' then 'FREMDRECHNUNG' when [v].[ItemNo] = 'KART@0||VT2||133' then 'DIVERSER VERKAUFSARTIKEL' else [a].[Description] end as [LmobileDescription]
				--,[a].[IsQuantityReadOnly]
				,case when [v].[ItemNo] = 'KART@0||T2||133' or [v].[ItemNo] = 'KART@0||VT2||133' then [v].[Description] else null end as [ExternalRemark]
				,[sot].[id] AS [ServiceOrderTimeId]
				,[soh].[OrderNo] As [ParentId]
				,[soh].[Status]
			into #ServiceOrderMaterialPre
		   from #ExtMaterial [v]
			--select * from #ExtMaterial
			JOIN [SMS].[ServiceOrderHead] [soh] ON [v].[LmobileOrderNo] = [soh].[OrderNo]
			JOIN [CRM].[Contact] [serviceOrderContact] ON [serviceOrderContact].[ContactId] = [soh].[ContactKey] AND [serviceOrderContact].[IsActive] = 1
			JOIN [CRM].[Article] [a] ON [a].[ItemNo] = [v].[ItemNo]
			JOIN [CRM].[Contact] [articleContact] ON [articleContact].[ContactId] = [a].[ArticleId] AND [articleContact].[IsActive] = 1
			LEFT OUTER JOIN [SMS].[ServiceOrderTimes] [sot] ON 
			[v].[PosNo] = [sot].[PosNo] AND
			 [sot].[OrderNo] = [v].[LmobileOrderNo]
			LEFT OUTER JOIN #DuplicatedOrderNoPosNo [dup] ON [v].[LmobileOrderNo] = [dup].[LmobileOrderNo]
			--WHERE [v].[Description] IS NOT NULL
				where [dup].[LmobileOrderNo] IS NULL
				And [soh].[Status] <> 'Completed'
				--And [soh].[Status] <> 'InProgress'

				select *,BINARY_CHECKSUM(
											[v].[ItemNo]
											,[v].Orderno
											,[v].[Description]
											,[v].[EstimatedQuantity]
											,[v].[UnitOfMeasure]
											,[v].[ActualQuantity]
											,[v].[ExternalRemark]											
														) AS [LegacyVersion]
														into #ServiceOrderMaterial
														from #ServiceOrderMaterialPre [v]

			IF OBJECT_ID('tempdb..#ExtMaterial') IS NOT NULL DROP TABLE #ExtMaterial
			--select * from #ServiceOrderMaterial
			SELECT 
				[v].*
				,sot.id
				,NULL AS [ParentKey]
			into #ServiceOrderSetArticleHeadAndMaterial
			from #ServiceOrderMaterial [v]
			join [SMS].[ServiceOrderTimes] sot on sot.[OrderNo] = [v].LmobileOrderNo			
			WHERE ([v].LmobileOrderNo = [v].[ParentId] and sot.CreateUser = 'Import' ) OR ( [v].[ParentId] is null and sot.CreateUser = 'Import')

			CREATE NONCLUSTERED INDEX IX_#ServiceOrderSetArticleHeadAndMaterial_OrderNo ON #ServiceOrderSetArticleHeadAndMaterial ([LmobileOrderNo] ASC)
			CREATE NONCLUSTERED INDEX IX_#ServiceOrderSetArticleHeadAndMaterial_ItemNo ON #ServiceOrderSetArticleHeadAndMaterial ([ItemNo] ASC)
			CREATE NONCLUSTERED INDEX IX_#ServiceOrderSetArticleHeadAndMaterial_PosNo ON #ServiceOrderSetArticleHeadAndMaterial ([PosNo] ASC)
			

			SELECT @count = COUNT(*) FROM #ServiceOrderSetArticleHeadAndMaterial
			PRINT CONVERT(nvarchar, @count) + ' SetArticle Records transferred to input table'
		END

		--begin transaction
		--begin try
		BEGIN
		--select * from #ServiceOrderMaterial
		--select * from #ServiceOrderSetArticleHeadAndMaterial
			-- Merge destination data coming from External sql
			MERGE [SMS].[ServiceOrderMaterial] AS [target]
			using #ServiceOrderSetArticleHeadAndMaterial AS [source]
				ON [target].[OrderNo] COLLATE database_default = [source].[LmobileOrderNo] COLLATE database_default
				--AND [target].[PosNo] COLLATE database_default = [source].[PosNo] COLLATE database_default 
				AND [target].[ItemNo] COLLATE database_default = [source].[ItemNo] COLLATE database_default
				AND [target].[Description] COLLATE database_default = [source].[LmobileDescription] COLLATE database_default 
				AND ([target].[ExternalRemark]  COLLATE database_default  = [source].[ExternalRemark] COLLATE database_default 
				 OR ([target].[ExternalRemark] IS NULL AND [source].[ExternalRemark] IS NULL))
								
			-- We already know this Position
			WHEN MATCHED 
				AND ([target].[LegacyVersion] IS NULL OR [target].[LegacyVersion] <> [source].[LegacyVersion]) THEN 
				UPDATE SET 
					--[target].[ItemNo] = [source].[ItemNo]
					 [target].[Description] = Case when [source].[LmobileDescription] is null then '-' Else [source].[LmobileDescription] End
					,[target].[QuantityUnit] = [source].[QuantityUnit]
					,[target].[EstimatedQuantity] = [source].[EstimatedQuantity]
					,[target].[ActualQuantity] = [source].[ActualQuantity]
					--,[target].[ServiceOrderTimeId] = [source].[Id]
					--,[target].[ParentId] = NULL
					,[target].[ModifyDate] = GETUTCDATE()
					,[target].[ModifyUser] = 'Import Update'
					,[target].[LegacyVersion] = [source].[LegacyVersion]
					,[target].[IsActive] = 1
					,[target].[ExternalRemark] = [source].[ExternalRemark]
			WHEN NOT MATCHED THEN
			INSERT (
				[Id]
				,[OrderNo]
				,[PosNo]
				,[ItemNo]
				,[Description]
				,[ServiceOrderTimeId]
				,[QuantityUnit]
				,[EstimatedQuantity]
				,[ActualQuantity]
				--,[ParentId]
				,[Status]
				,[IsSerial]
				,[CreatedLocal]
				,[CommissioningStatusKey]
				,[Favorite]
				,[SortOrder]
				,[InvoiceQuantity]
				,[SignedByCustomer]
				,[BuiltIn]
				,[IsExported]
				,[IsActive]
				,[CreateDate]
				,[ModifyDate]
				,[CreateUser]
				,[ModifyUser]
				,[LegacyVersion]
				,[ExternalRemark]
				--,[LegacyId]
			) VALUES (
				NEWID()
				,[source].[LmobileOrderNo]
				,[source].[PosNo]		
				,[source].[ItemNo]
				,Case when [source].[LmobileDescription] is null then '-' Else [source].[LmobileDescription] End
				,[source].[Id]
				,[source].[QuantityUnit]
				,[source].[EstimatedQuantity]
				,[source].[ActualQuantity]
				--,NULL
				,0
				,0
				,0
				,'Toplog'
				,0
				,0
				,0
				,0
				,0
				,1
				,1
				,GETUTCDATE()
				,GETUTCDATE()
				,'Import'
				,'Import'
				,[source].[LegacyVersion]
				,[source].[ExternalRemark]
				--,[source].[LmobileOrderNo]
			)
			WHEN NOT MATCHED BY SOURCE 
				AND [target].[LegacyVersion] IS NOT NULL 
				--AND [target].[ParentId] IS NULL
				AND [target].[IsActive] = 1 
				AND [target].[OrderNo] not like '%Adhoc%'
				AND [target].[IsCompleted] <> 1
				AND [target].[CreateUser] ='Import'

				THEN 
				UPDATE SET
					[IsActive] = 0
					,[LegacyVersion] = NULL
					,[ModifyDate] = GETUTCDATE()
					,[ModifyUser] = 'Import remove'
			OUTPUT $action				
			INTO #ServiceOrderSetArticleHeadAndMaterialImport;
			
		PRINT 'Import ' + @tableName + ': TOTAL ' +  cast(@@Rowcount as varchar(20)) + ' Rows';
					
		SELECT @count = COUNT(*) FROM #ServiceOrderSetArticleHeadAndMaterialImporT WHERE Change = 'INSERT'
		EXEC SP_Import_WriteLog 'INSERT', @tableName, @count;
					
		SELECT @count = COUNT(*) FROM #ServiceOrderSetArticleHeadAndMaterialImport WHERE Change = 'UPDATE'
		EXEC SP_Import_WriteLog 'UPDATE', @tableName, @count;
			
		END

		
	END TRY
	BEGIN CATCH
		DECLARE @ErrorMessage NVARCHAR(4000);
		DECLARE @ErrorSeverity INT;
		DECLARE @ErrorState INT;
	
		SELECT
			@ErrorMessage = Substring(ERROR_MESSAGE(), 0, 1000),
			@ErrorSeverity = ERROR_SEVERITY(),
			@ErrorState = ERROR_STATE();
			
		    EXEC [dbo].[SP_Import_SendErrorMessage] @tableName, @ErrorMessage;
			EXEC SP_Import_WriteErrorLog  @tableName, @ErrorMessage, @ErrorSeverity, @ErrorState;
	END CATCH
END
