namespace Customer.Ramseier.Database
{
    using System.Data;
    using Crm.Library.Data.MigratorDotNet.Framework;
    using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;
    [Migration(20230424111200)]
    public class AddPartDiscountClassToCrmArticle : Migration
    {
        public override void Up()
        {
            Database.AddColumnIfNotExisting("[CRM].[Article]", new Column("PartDiscountClass", DbType.String, 100, ColumnProperty.Null));
        }
    }
}