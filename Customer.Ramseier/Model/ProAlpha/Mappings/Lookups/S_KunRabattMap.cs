namespace Customer.Ramseier.Model.ProAlpha.Mappings.Lookups.Country
{
	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Lookups;
	using Crm.Library.AutoMapper;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.Lookups.Extensions;
	using Customer.Ramseier.Model.ProAlpha.Entity.Lookups;

	public class S_KunRabattMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<S_KunRabatt, CustomerDiscountGroup>()
				.ForMember(d => d.Key, m => m.MapFrom(s => s.Rabattgruppe))
				.ForMember(d => d.Ds1, m => m.MapFrom(s => s.S_KunRabDatum.Rabatt[0]))
				.ForMember(d => d.Ds2, m => m.MapFrom(s => s.S_KunRabDatum.Rabatt[1]))
				.ForMember(d => d.Ds3, m => m.MapFrom(s => s.S_KunRabDatum.Rabatt[2]))
				.AfterMap(
					(src, dest) =>
					{
						dest.GetExtension<CustomerDiscountGroupExtension>().LookupHeadProAlphaObjectId = src.S_KunRabatt_Obj;
						dest.GetExtension<CustomerDiscountGroupExtension>().LookupHeadProAlphaLegacyId = src.Rabattgruppe;
					});
		}
	}
}