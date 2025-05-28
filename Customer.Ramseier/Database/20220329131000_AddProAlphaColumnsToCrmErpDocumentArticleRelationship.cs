namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.Library.Data.MigratorDotNet.Framework;
	[Migration(20220329131000)]
	public class AddProAlphaColumnsToCrmErpDocumentArticleRelationship : Migration
	{
		public override void Up()
		{
			if (!Database.ColumnExists("[CRM].[ErpDocumentArticleRelationship]", "ProAlphaObjectId"))
			{
				Database.AddColumn("[CRM].[ErpDocumentArticleRelationship]", new Column("ProAlphaObjectId", DbType.String, ColumnProperty.Null));
			}
			if (!Database.ColumnExists("[CRM].[ErpDocumentArticleRelationship]", "ProAlphaLegacyId"))
			{
				Database.AddColumn("[CRM].[ErpDocumentArticleRelationship]", new Column("ProAlphaLegacyId", DbType.String, ColumnProperty.Null));
			}
		}
	}
}