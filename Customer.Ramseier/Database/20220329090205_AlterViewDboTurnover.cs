namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220329090205)]
	public class AlterViewDboTurnover : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("dbo.Turnover"))
			{
				Database.ExecuteNonQuery("CREATE VIEW dbo.Turnover AS SELECT 'This is a code stub which will be replaced by an Alter Statement' as [code_stub]");
			}

			Database.ExecuteNonQuery(
				@"ALTER VIEW dbo.Turnover AS
					SELECT
						ot.Id
						, t.ContactKey
						, c.Name AS ContactName
						, t.CurrencyKey
						, t.QuantityUnitKey
						, t.IsVolume
						, MIN(tcy.Total) AS TotalCurrentYear
						, MIN(tpy.Total) AS TotalPreviousYear
						, MIN(tppy.Total) AS TotalPrePreviousYear
						, MIN(tmty.Total) AS TotalMinusThreeYears
						, MIN(tcy.Total) - MIN(tpy.Total) AS [Difference]
						, ot.ModifyDate
						, ot.CreateDate
						, ot.ModifyUser
						, ot.CreateUser
					FROM CRM.Turnover t
					JOIN CRM.Contact c ON c.ContactId = t.ContactKey
					CROSS APPLY (SELECT
							MAX(it.ModifyDate) AS ModifyDate
							, MIN(it.CreateDate) AS CreateDate
							, MAX(it.TurnoverId) AS Id
							, MAX(it.ModifyUser) AS ModifyUser
							, MIN(it.CreateUser) AS CreateUser
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.IsActive = 1) AS ot
					OUTER APPLY (SELECT
							SUM(it.Total) AS Total
						FROM CRM.Turnover it
						WHERE it.ContactKey = t.ContactKey
						AND it.IsVolume = t.IsVolume
						AND it.[Year] = t.[Year]
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
						AND it.[Year] = YEAR(GETDATE())-3
						AND it.IsActive = 1
						GROUP BY
							it.ContactKey
							, it.IsVolume
							, it.[Year]
							) AS tmty
					WHERE t.IsActive = 1
					AND (t.IsVolume = 0 OR t.QuantityUnitKey IS NOT NULL)
					AND (
						tcy.Total IS NOT NULL
						OR tpy.Total IS NOT NULL
						OR tppy.Total IS NOT NULL
						OR tmty.Total IS NOT NULL
					)
					GROUP BY
						ot.Id
						, t.ContactKey
						, t.IsVolume
						, t.CurrencyKey
						, t.QuantityUnitKey
						, c.Name
						, ot.ModifyDate
						, ot.CreateDate
						, ot.ModifyUser
						, ot.CreateUser");
		}
	}
}