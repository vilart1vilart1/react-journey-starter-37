namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.Library.AutoMapper;
	using Crm.Model;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	public class VC_InteressentMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<Custom_VC_Interessent, Company>()
				.ForMember(d => d.CompanyTypeKey, m => m.MapFrom(s => CompanyType.Prospect.Key))
				.ForMember(d => d.LegacyId, m => m.MapFrom(s => s.Interessent.ToString()))
				.AfterMap(
					(src, dest) =>
					{
						dest.GetExtension<CompanyExtension>().ProAlphaLegacyId = $"{src.Firma}_{src.Interessent}";
						dest.GetExtension<CompanyExtension>().ProAlphaObjectId = src.VC_Interessent_Obj;
						dest.GetExtension<CompanyExtension>().ProspectNo = src.Interessent;
					});

			Mapper.CreateMap<Company, Custom_VC_Interessent>()
				.ForMember(d => d.LmobileId, m => m.MapFrom(s => s.Id))
				.ForMember(d => d.Region, m => m.Ignore());
		}
	}
}