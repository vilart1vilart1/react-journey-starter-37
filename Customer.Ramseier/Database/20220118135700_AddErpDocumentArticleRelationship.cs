namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;
    using System.Text;

    [Migration(20220118135700)]
    public class AddErpDocumentArticleRelationship : Migration
    {
        public override void Up()
        {
            if (!Database.TableExists("[CRM].[ErpDocumentArticleRelationship]"))
            {
                var stringBuilder = new StringBuilder();
                stringBuilder.AppendLine("CREATE TABLE [CRM].[ErpDocumentArticleRelationship](");
                stringBuilder.AppendLine("[ErpDocumentArticleRelationshipId] [uniqueidentifier] NOT NULL,");
                stringBuilder.AppendLine("[ErpDocumentId] [uniqueidentifier] NOT NULL,");
                stringBuilder.AppendLine("[ArticleId] [uniqueidentifier] NOT NULL,");
                stringBuilder.AppendLine("[IsActive] [bit] NOT NULL,");
                stringBuilder.AppendLine("[CreateDate] [datetime] NOT NULL,");
                stringBuilder.AppendLine("[CreateUser] [nvarchar](60) NOT NULL,");
                stringBuilder.AppendLine("[ModifyDate] [datetime] NOT NULL,");
                stringBuilder.AppendLine("[ModifyUser] [nvarchar](60) NOT NULL,");
                stringBuilder.AppendLine("CONSTRAINT [PK_ErpDocumentArticleRelationship] PRIMARY KEY ([ErpDocumentArticleRelationshipId]))");
                Database.ExecuteNonQuery(stringBuilder.ToString());
            }
        }
        public override void Down()
        {
        }
    }
}