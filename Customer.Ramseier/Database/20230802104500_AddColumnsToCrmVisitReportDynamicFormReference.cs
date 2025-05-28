namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;
    using System.Data;

    [Migration(20230802104500)]
    public class AddColumnsToCrmVisitReportDynamicFormReference : Migration
    {
        public override void Up()
        {
            if (!Database.ColumnExists("[CRM].[VisitReportDynamicFormReference]", "VisitReportSent"))
            {
                Database.AddColumn("[CRM].[VisitReportDynamicFormReference]", new Column("VisitReportSent", DbType.Boolean, ColumnProperty.NotNull, false));
            }
            if (!Database.ColumnExists("[CRM].[VisitReportDynamicFormReference]", "VisitReportSendingRetries"))
            {
                Database.AddColumn("[CRM].[VisitReportDynamicFormReference]", new Column("VisitReportSendingRetries", DbType.Int32, ColumnProperty.NotNull, 0));
            }
        }
    }
}