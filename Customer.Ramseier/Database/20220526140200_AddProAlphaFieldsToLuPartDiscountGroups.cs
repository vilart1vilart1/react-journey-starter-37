namespace Customer.Ramseier.Database
{
	using System.Data;

	using Crm.ErpIntegration.ProAlphaBase.Database.Helper;
	using Crm.Library.Data.MigratorDotNet.Framework;

	[Migration(20220526140200)]
	public class AddProAlphaFieldsToLuPartDiscountGroups : Migration
	{
		public override void Up()
		{
			Database.AddProAlphaFieldsToLookupTable("PartDiscountGroups");
		}
	}
}