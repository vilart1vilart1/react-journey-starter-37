namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20230104113742)]
	public class AddTableCrmTurnoverSumUp : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("CRM.TurnoverSumUpPerCustomer"))
			{
				Database.AddTable(
					"CRM.TurnoverSumUpPerCustomer",
					new Column("Id", DbType.Guid, ColumnProperty.PrimaryKey),
					new Column("IsActive", DbType.Boolean, ColumnProperty.NotNull, true),
					new Column("CreateUser", DbType.String, 255, ColumnProperty.NotNull, "'Setup'"),
					new Column("CreateDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ModifyUser", DbType.String, 255, ColumnProperty.NotNull, "'Setup'"),
					new Column("ModifyDate", DbType.DateTime, ColumnProperty.NotNull, "GETUTCDATE()"),
					new Column("ContactKey", DbType.Guid, ColumnProperty.NotNull),
					new Column("ContactName", DbType.String, 450, ColumnProperty.Null),
					new Column("CurrencyKey", DbType.String, 20, ColumnProperty.Null),
					new Column("QuantityUnitKey", DbType.String, 20, ColumnProperty.Null),
					new Column("IsVolume", DbType.Boolean, ColumnProperty.NotNull, true),
					new Column("TotalCurrentYear", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("ExtrapolatedTotalCurrentYear", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("TotalPreviousYear", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("TotalPrePreviousYear", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("TotalMinusThreeYears", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("Difference", DbType.Decimal, 2, ColumnProperty.Null),
					new Column("LegacyId", DbType.String, 150, ColumnProperty.Null),
					new Column("LegacyVersion", DbType.Int64, ColumnProperty.Null)
				);

				Database.ExecuteNonQuery(@"ALTER TABLE [CRM].[TurnoverSumUpPerCustomer] WITH CHECK ADD CONSTRAINT [FK_TurnoverSumUpPerCustomer_ContactKey] FOREIGN KEY ([ContactKey]) REFERENCES [CRM].[Contact] ([ContactId])");
				Database.ExecuteNonQuery(@"ALTER TABLE [CRM].[TurnoverSumUpPerCustomer] CHECK CONSTRAINT [FK_TurnoverSumUpPerCustomer_ContactKey]");
			}
		}
	}
}