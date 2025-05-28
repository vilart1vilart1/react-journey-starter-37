namespace Customer.Ramseier.Database
{
    using Crm.Library.Data.MigratorDotNet.Framework;
    [Migration(20220902102200)]
    public class AlterTablesModifyColumnNeedsLengthsToNvarcharMax : Migration
    {
        public override void Up()
        {
            Database.ExecuteNonQuery("ALTER TABLE [CRM].[Company] ALTER COLUMN [Needs] nvarchar(max) Null");
        }
    }
}
