namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20230105113742)]
	public class AddViewDboTurnoverSumUp : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("dbo.TurnoverSumUpPerCustomer"))
			{
				Database.ExecuteNonQuery("CREATE VIEW dbo.TurnoverSumUpPerCustomer AS SELECT 'This is a code stub which will be replaced by an Alter Statement' as [code_stub]");
			}

			Database.ExecuteNonQuery(
				@"ALTER VIEW [dbo].[TurnoverSumUpPerCustomer] AS
					SELECT
						ot.Id
						, t.ContactKey
						, c.Name AS ContactName
						, t.CurrencyKey
						, t.QuantityUnitKey
						, t.IsVolume
						, CONCAT(t.ContactKey, '|', t.IsVolume, '|', t.CurrencyKey, '|', t.QuantityUnitKey) AS LegacyId
						, ISNULL(MIN(tcy.Total), 0) AS TotalCurrentYear
						, ISNULL(MIN(tcy.Total), 0)/MONTH(GETDATE())*12 AS ExtrapolatedTotalCurrentYear
						, ISNULL(MIN(tpy.Total), 0) AS TotalPreviousYear
						, ISNULL(MIN(tppy.Total), 0) AS TotalPrePreviousYear
						, ISNULL(MIN(tmty.Total), 0) AS TotalMinusThreeYears
						, (ISNULL(MIN(tcy.Total), 0)/MONTH(GETDATE())*12) - ISNULL(MIN(tpy.Total), 0) AS [Difference]
						, ot.ModifyDate
						, ot.CreateDate
						, ot.ModifyUser
						, ot.CreateUser
						, BINARY_CHECKSUM(
							ot.Id,
							t.ContactKey,
							t.CurrencyKey,
							t.QuantityUnitKey,
							t.IsVolume,
							ot.ModifyUser,
							ot.ModifyDate,
							CAST(ISNULL(MIN(tcy.Total), 0) AS NVARCHAR), -- TotalCurrentYear
							CAST(ISNULL(MIN(tpy.Total), 0) AS NVARCHAR), -- TotalPreviousYear
							CAST(ISNULL(MIN(tppy.Total), 0) AS NVARCHAR), -- TotalPrePreviousYear
							CAST(ISNULL(MIN(tmty.Total), 0) AS NVARCHAR) -- TotalMinusThreeYears
						) AS LegacyVersion
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