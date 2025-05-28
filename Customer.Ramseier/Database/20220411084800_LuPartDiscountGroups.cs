namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;
    [Migration(20220524111000)]
    public class LuPartDiscountGroups : Migration
    {
        public override void Up()
        {
            if (!Database.TableExists("[LU].[PartDiscountGroups]"))
            {
                Database.ExecuteNonQuery(@"
                CREATE TABLE [LU].[PartDiscountGroups] (
                [PartDiscountGroupsId] [int] IDENTITY(1,1)  NOT NULL,
                [Name] NVARCHAR(50) NOT NULL,
                [Value] NVARCHAR(20) NOT NULL,
                [Ds1] DECIMAL(18,2)  NULL,
                [Ds2] DECIMAL(18,2)  NULL,
                [Ds3] DECIMAL(18,2)  NULL,
                [Language] char(2) NOT NULL,
                [Favorite] bit NOT NULL,
                [SortOrder] int NOT NULL,
                [CreateDate] datetime NOT NULL,
                [ModifyDate] datetime NOT NULL,
                [CreateUser] NVARCHAR(256) NOT NULL,
                [ModifyUser] NVARCHAR(256) NOT NULL,
                [IsActive] bit NOT NULL ,
                CONSTRAINT [PK_PartDiscountGroups] PRIMARY KEY ([PartDiscountGroupsId])
                )
                ");
                Database.ExecuteNonQuery(@"ALTER TABLE [LU].[PartDiscountGroups] ADD CONSTRAINT [DF_PartDiscountGroups_Language] DEFAULT ('en') FOR [Language]");
                Database.ExecuteNonQuery(@"ALTER TABLE [LU].[PartDiscountGroups] ADD CONSTRAINT [DF_PartDiscountGroups_Value] DEFAULT ((0)) FOR [Value]");
                Database.ExecuteNonQuery(@"ALTER TABLE [LU].[PartDiscountGroups] ADD CONSTRAINT [DF_PartDiscountGroups_Favorite] DEFAULT ((0)) FOR [Favorite]");
                Database.ExecuteNonQuery(@"ALTER TABLE [LU].[PartDiscountGroups] ADD CONSTRAINT [DF_PartDiscountGroups_SortOrder] DEFAULT ((0)) FOR [SortOrder]");
            }
        }
        public override void Down()
        {
        }
    }
}

