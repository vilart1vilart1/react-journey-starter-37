namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.ErpIntegration.ProAlphaBase.Database.Helper;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220607114600)]
	public class AddProAlphaLookupFieldsToLuCustomerDiscountGroup : Migration
	{
		public override void Up()
		{
			Database.AddLookupHeadProAlphaObjectId("CustomerDiscountGroup", "LU");
			Database.AddLookupHeadProAlphaLegacyId("CustomerDiscountGroup", "LU");
		}
	}
}