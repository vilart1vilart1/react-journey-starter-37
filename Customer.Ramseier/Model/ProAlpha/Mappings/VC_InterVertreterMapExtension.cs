namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
	using AutoMapper;
	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Mappings;
	using Crm.Library.AutoFac;
	using Crm.Library.AutoMapper;
	using LMobile.Unicore.NHibernate;

	public class VC_InterVertreterMapExtension : IAutoMap
	{
		public void CreateMap(IProfileExpression Mapper)
		{
			Mapper.CreateMap<VC_InterVertreter, SalesAgentCompanyRelationship>()
				.ForMember(d => d.SalesAgentCompanyRelationshipType, m => m.MapFrom(s => SalesAgentCompanyRelationshipType.Prospect.Key))
				.ForMember(d => d.IsFixed, m => m.MapFrom(s => s.VtrFixiert))
				.ForMember(d => d.ProAlphaLegacyId, m => m.MapFrom(s => $"{s.Firma}_{s.Interessent}_{s.Vertreter}"))
				.ForMember(d => d.ProAlphaObjectId, m => m.MapFrom(s => s.VC_InterVertreter_Obj))
				.ForMember(d => d.CreateUser, m => m.MapFrom(s => s.AnlageBenutzer));
			Mapper.CreateMap<SalesAgentCompanyRelationship, VC_InterVertreter>()
				.ForMember(d => d.LmobileId, m => m.MapFrom(s => s.Id))
				.ForMember(d => d.VtrFixiert, m => m.MapFrom(s => s.IsFixed))
				.ForMember(d => d.AnlageBenutzer, m => m.MapFrom(s => s.CreateUser));
		}
	}
}