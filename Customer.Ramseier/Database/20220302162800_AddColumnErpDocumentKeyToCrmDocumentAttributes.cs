namespace Customer.Ramseier.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220302162800)]
	public class AddColumnErpDocumentKeyToCrmDocumentAttributes : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[DocumentAttributes]", "ErpDocumentKey"))
			{
				Database.AddColumn("[CRM].[DocumentAttributes]", new Column("ErpDocumentKey", DbType.String, ColumnProperty.Null));
			}
		}
		public override void Down()
		{
		}
	}
}