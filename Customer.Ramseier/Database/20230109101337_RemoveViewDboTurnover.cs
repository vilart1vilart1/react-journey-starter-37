namespace Customer.Ramseier.Database
{
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20230109101337)]
	public class RemoveViewDboTurnover : Migration
	{
		public override void Up()
		{
			if (Database.TableExists("dbo.Turnover"))
			{
				Database.ExecuteNonQuery("DROP VIEW [dbo].[Turnover]");
			}
		}
	}
}