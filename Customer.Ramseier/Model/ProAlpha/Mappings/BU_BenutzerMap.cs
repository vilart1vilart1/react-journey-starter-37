namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
    using AutoMapper;

    using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Mappings;
    using Crm.Library.AutoFac;
    using Crm.Library.AutoMapper;
    using Crm.Library.Model;

    public class CustomerUserMap : IAutoMap, IReplaceRegistration<UserMap>
    {
        public void CreateMap(IProfileExpression Mapper)
        {
            Mapper.CreateMap<BU_Benutzer, User>()
                .ForMember(d => d.Id, m => m.MapFrom(s => s.Benutzer))
                .ForMember(d => d.AdName, m => m.MapFrom(s => s.LDAP_ID))
                .ForMember(d => d.PersonnelId, m => m.MapFrom(s => s.Mitarbeiter))
                .ForMember(d => d.Email, m => m.MapFrom(s => s.EMail))
                .ForMember(d => d.Discharged, m => m.MapFrom(s => !s.isActive))
                .ForMember(d => d.DefaultLanguageKey, m => m.MapFrom(s => s.Sprache))
                .ForMember(d => d.DischargeDate, m => m.MapFrom(s => s.LimitedTo))
                .AfterMap(
                    (src, dest) =>
                    {
                        dest.GetExtension<UserExtension>().ProAlphaObjectId = src.BU_Benutzer_Obj;
                        dest.GetExtension<UserExtension>().ProAlphaLegacyId = src.BU_Benutzer_Obj;
                    });
        }
    }
}