namespace Customer.Ramseier.Database
{
	using Crm.ErpIntegration.Database.Helper;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220607114000)]
	public class AddIsExportedFlagToCrmContactStatus : Migration
	{
		public override void Up()
		{
			var schema = "CRM";
			Database.AddIsExportedFlag(schema, "ContactStatus");
		}
	}
}