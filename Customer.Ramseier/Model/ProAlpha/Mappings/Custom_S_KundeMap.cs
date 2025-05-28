namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.Library.AutoFac;
	using Crm.Library.AutoMapper;
	using Crm.Model;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	public class Custom_S_KundeMap : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<Custom_S_Kunde, Company>()
				.ForMember(d => d.CompanyTypeKey, m => m.MapFrom(s => CompanyType.Customer.Key))
				.AfterMap(
					(src, dest) =>
					{
						dest.LegacyId = $"{src.Kunde}";
						dest.GetExtension<CompanyExtension>().CustomerObjectId = src.S_Kunde_Obj;
						dest.GetExtension<CompanyExtension>().CustomerLegacyId = $"{src.Firma}_{src.Kunde}";
						dest.GetExtension<CompanyExtension>().CompanyNo = src.Kunde;
                        dest.GetExtension<Crm.ErpExtension.Model.CompanyExtension>().ErpCreditLimit = src.Kreditlimit;
                    });

			Mapper.CreateMap<Company, Custom_S_Kunde>()
				.ForMember(d => d.LmobileId, m => m.MapFrom(s => s.Id))
				.ForMember(d => d.Region, m => m.Ignore());
		}
	}
}