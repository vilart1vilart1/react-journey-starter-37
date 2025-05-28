namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.ErpIntegration.ProAlphaBase.Database.Helper;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220404105000)]
	public class AddProAlphaFieldsToContactStatus : Migration
	{
		public override void Up()
		{
			Database.AddProAlphaLegacyIdAndObjectId("CRM", "ContactStatus");
		}
	}
}