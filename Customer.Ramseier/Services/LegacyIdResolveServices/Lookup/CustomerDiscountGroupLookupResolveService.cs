namespace Customer.Ramseier.Services.LegacyIdResolveServices.Lookup
{
	using System.Linq;

	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups.Extensions;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Lookups;
	using Crm.Library.AutoFac;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.Lookups.Extensions;
	using LMobile.Unicore.NHibernate;

	public class CustomerDiscountGroupLookupResolveService : DefaultLookupResolveService<CustomerDiscountGroup, string>
	{
		protected override IQueryable<CustomerDiscountGroup> GetLookupQuery(IQueryable<CustomerDiscountGroup> query, string legacyLookupKey)
		{
			return query.Where(
				x => x.ModelExtension<CustomerDiscountGroupExtension, string>(e => e.LookupHeadProAlphaObjectId) == legacyLookupKey ||
				     x.ModelExtension<CustomerDiscountGroupExtension, string>(e => e.LookupHeadProAlphaLegacyId) == legacyLookupKey ||
				     x.Key == legacyLookupKey);
		}

		public CustomerDiscountGroupLookupResolveService(IRepositoryWithTypedId<CustomerDiscountGroup, string> repository)
			: base(repository)
		{
		}
	}
}