namespace Customer.Ramseier.Database
{
	using System.Data;
	using System.Text;

	using Crm.Library.Data.MigratorDotNet.Framework;
	[Migration(20220427135300)]
	public class _AddTableCrmArticleDiscountGroupCustomer : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[CRM].[ArticleDiscountGroupCustomer]"))
			{
				var stringBuilder = new StringBuilder();
				stringBuilder.AppendLine("CREATE TABLE [CRM].[ArticleDiscountGroupCustomer](");
				stringBuilder.AppendLine("[ArticleDiscountGroupCustomerId] [uniqueidentifier] NOT NULL,");
				stringBuilder.AppendLine("[ContactKey] [uniqueidentifier] NOT NULL,");
				stringBuilder.AppendLine("[PartDiscountGroupKey] [nvarchar](20) NOT NULL,");
				stringBuilder.AppendLine("[Description] [nvarchar](30) NULL,");
				stringBuilder.AppendLine("[Ds1] [decimal] NULL,");
				stringBuilder.AppendLine("[Ds2] [decimal] NULL,");
				stringBuilder.AppendLine("[Ds3] [decimal] NULL,");
				stringBuilder.AppendLine("[ValidFrom] [datetime] NULL,");
				stringBuilder.AppendLine("[ValidTo] [datetime] NULL,");
				stringBuilder.AppendLine("[ProAlphaObjectId] [nvarchar](200) NULL,");
				stringBuilder.AppendLine("[ProAlphaLegacyId] [nvarchar](200) NULL,");
				stringBuilder.AppendLine("[IsActive] [bit] NOT NULL,");
				stringBuilder.AppendLine("[CreateDate] [datetime] NOT NULL,");
				stringBuilder.AppendLine("[CreateUser] [nvarchar](60) NOT NULL,");
				stringBuilder.AppendLine("[ModifyDate] [datetime] NOT NULL,");
				stringBuilder.AppendLine("[ModifyUser] [nvarchar](60) NOT NULL,");
				stringBuilder.AppendLine("CONSTRAINT [PK_ArticleDiscountGroupCustomer] PRIMARY KEY CLUSTERED ");
				stringBuilder.AppendLine("(");
				stringBuilder.AppendLine("[ArticleDiscountGroupCustomerId] ASC");
				stringBuilder.AppendLine(
					")WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]");
				stringBuilder.AppendLine(") ON [PRIMARY]");
				Database.ExecuteNonQuery(stringBuilder.ToString());


			}

		}
	}
}