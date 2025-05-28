namespace Customer.Ramseier.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220225105400)]
	public class AddColumnNeedsToCrmCompany : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[Company]", "Needs"))
			{
				Database.AddColumn("[CRM].[Company]", new Column("Needs", DbType.String, ColumnProperty.Null));
			}
		}
	}
}