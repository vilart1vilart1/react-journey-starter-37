namespace Customer.Ramseier.Database
{
	using System.Data;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220329091000)]
	public class AddColumnQuoteNoToCrmErpDocumentArticleRelationship : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[ErpDocumentArticleRelationship]", "QuoteNoKey"))
			{
				Database.AddColumn("[CRM].[ErpDocumentArticleRelationship]", new Column("QuoteNoKey", DbType.String, ColumnProperty.Null));
			}
		}
	}
}