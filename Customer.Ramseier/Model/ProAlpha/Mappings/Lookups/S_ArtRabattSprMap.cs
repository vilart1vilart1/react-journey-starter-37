namespace Customer.Ramseier.Model.ProAlpha.Mappings.Lookups.Country
{
	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Lookups;
	using Crm.Library.AutoMapper;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity.Lookups;

	public class S_ArtRabattSprMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<S_ArtRabattSpr, PartDiscountGroups>()
				.ForMember(d => d.Value, m => m.MapFrom(s => s.Bezeichnung));
		}
	}
}