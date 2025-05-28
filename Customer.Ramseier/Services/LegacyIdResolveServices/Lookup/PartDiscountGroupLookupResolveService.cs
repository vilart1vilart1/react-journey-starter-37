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

	public class PartDiscountGroupLookupResolveService : DefaultLookupResolveService<PartDiscountGroups, string>
	{
		protected override IQueryable<PartDiscountGroups> GetLookupQuery(IQueryable<PartDiscountGroups> query, string legacyLookupKey)
		{
			return query.Where(
				x => x.LookupHeadProAlphaObjectId == legacyLookupKey ||
				     x.LookupHeadProAlphaLegacyId == legacyLookupKey ||
				     x.Key == legacyLookupKey);
		}

		public PartDiscountGroupLookupResolveService(IRepositoryWithTypedId<PartDiscountGroups, string> repository)
			: base(repository)
		{
		}
	}
}