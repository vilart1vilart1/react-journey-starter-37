namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;
	
    [Migration(20240726221600)]
    public class AlterTurnoverAllowItemNoNull : Migration
    {
        public override void Up()
        {
            Database.ExecuteNonQuery("ALTER TABLE [CRM].[Turnover] ALTER COLUMN [ItemNo] nvarchar(50) Null");
        }
    }
}
