namespace Customer.Ramseier.Database
{
    using System.Data;
    using Crm.Library.Data.MigratorDotNet.Framework;
    using Crm.Library.Data.MigratorDotNet.Migrator.Extensions;
    [Migration(20230505091500)]
    public class AddEmailToCrmUserGroup : Migration
    {
        public override void Up()
        {
            Database.AddColumnIfNotExisting("[CRM].[UserGroup]", new Column("Email", DbType.String, 100, ColumnProperty.Null));
        }
    }
}