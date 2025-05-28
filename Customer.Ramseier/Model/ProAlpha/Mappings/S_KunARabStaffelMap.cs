namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;

	using Crm.Article.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.Library.AutoMapper;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	public class S_KunARabStaffelMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<S_KunARabStaffel, ArticleDiscountGroupCustomer>()
				.ForMember(d => d.PartDiscountGroupKey, m => m.MapFrom(s => s.Rabattgruppe.ToString()))
				.ForMember(d => d.ValidFrom, m => m.MapFrom(s => s.gueltig_ab))
				.ForMember(d => d.ValidTo, m => m.MapFrom(s => s.gueltig_bis))
				.ForMember(d => d.Description, m => m.MapFrom(s => s.Description))
				.ForMember(d => d.Ds1, m => m.MapFrom(s => s.Rabatt[0]))
				.ForMember(d => d.Ds2, m => m.MapFrom(s => s.Rabatt[1]))
				.ForMember(d => d.Ds3, m => m.MapFrom(s => s.Rabatt[2]))
				.AfterMap(
					(src, dest) =>
					{
						dest.ProAlphaObjectId = src.S_KunARabStaffel_Obj;
						dest.ProAlphaLegacyId = $"{src.Kunde}_{src.Kunde}_{src.Rabattgruppe.ToString()}";
					});
		}
	}
}