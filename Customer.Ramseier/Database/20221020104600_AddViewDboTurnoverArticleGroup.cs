namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20221020105300)]
	public class _AddViewDboTurnoverArticleGroup : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("dbo.TurnoverArticleGroup"))
			{
				Database.ExecuteNonQuery("CREATE VIEW dbo.TurnoverArticleGroup AS SELECT 'This is a code stub which will be replaced by an Alter Statement' as [code_stub]");
			}

			Database.ExecuteNonQuery(
                @"ALTER VIEW dbo.TurnoverArticleGroup AS
					SELECT
						MAX(t.TurnoverId) AS Id
						, t.ContactKey
						, c.Name AS ContactName
						, t.CurrencyKey
						, t.QuantityUnitKey
						, t.IsVolume
                        ,ArticleGroup01Key
						, COALESCE(MIN(tcy.Total), 0) AS TotalCurrentYear
						, COALESCE(MIN(tcy.Total), 0)/MONTH(GETDATE())*12 AS ExtrapolatedTotalCurrentYear
						, COALESCE(MIN(tpy.Total), 0) AS TotalPreviousYear
						, COALESCE(MIN(tppy.Total), 0) AS TotalPrePreviousYear
						, COALESCE(MIN(tmty.Total), 0) AS TotalMinusThreeYears
						, (COALESCE(MIN(tcy.Total), 0)/MONTH(GETDATE())*12) - COALESCE(MIN(tpy.Total), 0) AS [Difference]
						, ot.ModifyDate
						, ot.CreateDate
						, ot.ModifyUser
						, ot.CreateUser
					FROM CRM.Turnover t
					JOIN CRM.Contact c ON c.ContactId = t.ContactKey
					CROSS APPLY (SELECT
							MAX(it.ModifyDate) AS ModifyDate
							, MIN(it.CreateDate) AS CreateDate
							, MAX(it.ModifyUser) AS ModifyUser
							, MIN(it.CreateUser) AS CreateUser
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.IsActive = 1
						) AS ot
					OUTER APPLY (SELECT
							SUM(it.Total) AS Total
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.[Year] = t.[Year]
						AND it.ArticleGroup01Key = t.ArticleGroup01Key
						AND it.[Year] = YEAR(GETDATE())
						AND it.IsActive = 1
						GROUP BY
							it.ContactKey
							, it.IsVolume
							, it.[Year]
							) AS tcy
					OUTER APPLY (SELECT
							SUM(it.Total) AS Total
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.[Year] = t.[Year]
						AND it.ArticleGroup01Key = t.ArticleGroup01Key
						AND it.[Year] = YEAR(GETDATE())-1
						AND it.IsActive = 1
						GROUP BY
							it.ContactKey
							, it.IsVolume
							, it.[Year]
							) AS tpy
					OUTER APPLY (SELECT
							SUM(it.Total) AS Total
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.[Year] = t.[Year]
						AND it.ArticleGroup01Key = t.ArticleGroup01Key
						AND it.[Year] = YEAR(GETDATE())-2
						AND it.IsActive = 1
						GROUP BY
							it.ContactKey
							, it.IsVolume
							, it.[Year]
							) AS tppy
					OUTER APPLY (SELECT
							SUM(it.Total) AS Total
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.[Year] = t.[Year]
						AND it.ArticleGroup01Key = t.ArticleGroup01Key
						AND it.[Year] = YEAR(GETDATE())-3
						AND it.IsActive = 1
						GROUP BY
							it.ContactKey
							, it.IsVolume
							, it.[Year]
							) AS tmty
					WHERE t.IsActive = 1
					AND (
						tcy.Total IS NOT NULL
						OR tpy.Total IS NOT NULL
						OR tppy.Total IS NOT NULL
						OR tmty.Total IS NOT NULL
					)
					GROUP BY
						 t.ContactKey
						, t.IsVolume
						, t.CurrencyKey
						, t.QuantityUnitKey
						, c.Name
						, ot.ModifyDate
						, ot.CreateDate
						, ot.ModifyUser
						, ot.CreateUser
						,ArticleGroup01Key");
		}
	}
}