namespace Customer.Ramseier.Model.Lookups
{
	using System;

	using Crm.Library.Globalization.Lookup;

	[Lookup("[LU].[CustomerDiscountGroup]")]
	[IgnoreMissingLookups]
	public class CustomerDiscountGroup : EntityLookup<string>
	{
		[LookupProperty(Shared = true)]
		public virtual decimal Ds1 { get; set; }

		[LookupProperty(Shared = true)]
		public virtual decimal Ds2 { get; set; }

		[LookupProperty(Shared = true)]
		public virtual decimal Ds3 { get; set; }

		[LookupProperty(Shared = true)]
		public virtual DateTime? ValidFrom { get; set; }
		[LookupProperty(Shared = true)]
		public virtual DateTime? ValidTo { get; set; }
		[LookupProperty(Shared = true)]
		public virtual string ProAlphaLegacyId { get; set; }
		[LookupProperty(Shared = true)]
		public virtual string ProAlphaObjectId { get; set; }
	}
}