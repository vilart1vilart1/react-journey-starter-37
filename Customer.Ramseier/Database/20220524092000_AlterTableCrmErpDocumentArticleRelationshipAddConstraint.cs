using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;

    [Migration(20220524092000)]
    public class AlterTableCrmErpDocumentArticleRelationshipAddConstraint : Migration
    {
        public override void Up()
        {
            Database.ExecuteNonQuery(@"ALTER TABLE[CRM].[ErpDocumentArticleRelationship] WITH CHECK ADD CONSTRAINT[FK_ErpDocumentArticleRelationship_Article] FOREIGN KEY([ArticleId]) REFERENCES[CRM].[Article]([ArticleId])");
            Database.ExecuteNonQuery(@"ALTER TABLE[CRM].[ErpDocumentArticleRelationship] CHECK CONSTRAINT[FK_ErpDocumentArticleRelationship_Article]");

            Database.ExecuteNonQuery(@" ALTER TABLE[CRM].[ErpDocumentArticleRelationship] WITH CHECK ADD CONSTRAINT[FK_ErpDocumentArticleRelationship_ErpDocument] FOREIGN KEY([ErpDocumentId]) REFERENCES[CRM].[ERPDocument]([ErpDocumentId])");
            Database.ExecuteNonQuery(@" ALTER TABLE[CRM].[ErpDocumentArticleRelationship]
                CHECK CONSTRAINT[FK_ErpDocumentArticleRelationship_ErpDocument]");
        }
    }
}