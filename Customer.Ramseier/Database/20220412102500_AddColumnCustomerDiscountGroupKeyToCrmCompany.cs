namespace Customer.Ramseier.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220412102500)]
	public class AddColumnCustomerDiscountGroupKeyToCrmCompany : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[Company]", "CustomerDiscountGroupKey"))
			{
				Database.AddColumn("[CRM].[Company]", new Column("CustomerDiscountGroupKey", DbType.String, ColumnProperty.Null));
			}
		}
	}
}