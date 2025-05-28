namespace Customer.Ramseier.Model.Lookups.Extensions
{
	using Crm.Library.BaseModel;
	using Crm.Library.Globalization.Lookup;

	public class CustomerDiscountGroupExtension : EntityExtension<CustomerDiscountGroup>
	{
		[LookupProperty(Shared = true)]
		public string LookupHeadProAlphaLegacyId { get; set; }
		[LookupProperty(Shared = true)]
		public string LookupHeadProAlphaObjectId { get; set; }
	}
}