namespace Customer.Ramseier.Database
{
    using System.Data;
    using Crm.Library.Data.MigratorDotNet.Framework;
    using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;
    [Migration(20220411093500)]
    public class AddPartDiscountGroupKeyToCrmArticle : Migration
    {
        public override void Up()
        {
            Database.AddColumnIfNotExisting("[CRM].[Article]", new Column("PartDiscountGroupKey", DbType.String, 100, ColumnProperty.Null));
        }
    }
}