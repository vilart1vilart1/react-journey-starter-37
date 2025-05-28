namespace Customer.Ramseier.Database
{
	using System.Text;

	using Crm.Library.Data.MigratorDotNet.Framework;
	[Migration(20220524113000)]
	public class AddLookupTableLuCustomerDiscountGroup : Migration
	{
		public override void Up()
		{
			if (!Database.TableExists("[LU].[CustomerDiscountGroup]"))
			{
                {
                    Database.ExecuteNonQuery(@"
                CREATE TABLE [LU].[CustomerDiscountGroup] (
                [CustomerDiscountGroupId] [int] IDENTITY(1,1)  NOT NULL,
                [Name] NVARCHAR(50) NOT NULL,
                [Value] NVARCHAR(20) NOT NULL,
                [Ds1] DECIMAL(18,2)  NULL,
                [Ds2] DECIMAL(18,2)  NULL,
                [Ds3] DECIMAL(18,2)  NULL,
                [ValidFrom] datetime NULL,
                [ValidTo] datetime NULL,
                [ProAlphaObjectId] NVARCHAR(50) NULL,
                [ProAlphaLegacyId] NVARCHAR(20) NULL,
                [Language] char(2) NOT NULL,
                [Favorite] bit NOT NULL,
                [SortOrder] int NOT NULL,
                [CreateDate] datetime NOT NULL,
                [ModifyDate] datetime NOT NULL,
                [CreateUser] NVARCHAR(256) NOT NULL,
                [ModifyUser] NVARCHAR(256) NOT NULL,
                [IsActive] bit NOT NULL ,
                CONSTRAINT [PK_CustomerDiscountGroup] PRIMARY KEY ([CustomerDiscountGroupId])
                )
                ");
                    Database.ExecuteNonQuery(@"ALTER TABLE [LU].[CustomerDiscountGroup] ADD CONSTRAINT [DF_CustomerDiscountGroup_Language] DEFAULT ('en') FOR [Language]");
                    Database.ExecuteNonQuery(@"ALTER TABLE [LU].[CustomerDiscountGroup] ADD CONSTRAINT [DF_CustomerDiscountGroup_Value] DEFAULT ((0)) FOR [Value]");
                    Database.ExecuteNonQuery(@"ALTER TABLE [LU].[CustomerDiscountGroup] ADD CONSTRAINT [DF_CustomerDiscountGroup_Favorite] DEFAULT ((0)) FOR [Favorite]");
                    Database.ExecuteNonQuery(@"ALTER TABLE [LU].[CustomerDiscountGroup] ADD CONSTRAINT [DF_CustomerDiscountGroup_SortOrder] DEFAULT ((0)) FOR [SortOrder]");
                }
            
			}
			
		}
	}
}