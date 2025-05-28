namespace Customer.Ramseier.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220329093600)]
	public class AddColumnOrderNoToCrmErpDocumentArticleRelationship : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[ErpDocumentArticleRelationship]", "OrderNoKey"))
			{
				Database.AddColumn("[CRM].[ErpDocumentArticleRelationship]", new Column("OrderNoKey", DbType.String, ColumnProperty.Null));
			}
		}
	}
}