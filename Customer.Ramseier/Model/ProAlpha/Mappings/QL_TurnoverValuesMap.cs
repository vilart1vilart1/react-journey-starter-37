namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
    using AutoMapper;
    using Crm.ErpExtension.Model;
    using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
    using Crm.Library.AutoMapper;
    using Customer.Ramseier.Model.ProAlpha.Entity;

    public class QL_TurnoverValuesMap : IAutoMap
    {
        public void CreateMap(IProfileExpression Mapper)
        {
            Mapper.CreateMap<QL_TurnoverValues, ErpTurnover>()
                .ForMember(d => d.Year, m => m.MapFrom(s => s.Year))
                .ForMember(d => d.Month1, m => m.MapFrom(s => s.Month1))
                .ForMember(d => d.Month2, m => m.MapFrom(s => s.Month2))
                .ForMember(d => d.Month3, m => m.MapFrom(s => s.Month3))
                .ForMember(d => d.Month4, m => m.MapFrom(s => s.Month4))
                .ForMember(d => d.Month5, m => m.MapFrom(s => s.Month5))
                .ForMember(d => d.Month6, m => m.MapFrom(s => s.Month6))
                .ForMember(d => d.Month7, m => m.MapFrom(s => s.Month7))
                .ForMember(d => d.Month8, m => m.MapFrom(s => s.Month8))
                .ForMember(d => d.Month9, m => m.MapFrom(s => s.Month9))
                .ForMember(d => d.Month10, m => m.MapFrom(s => s.Month10))
                .ForMember(d => d.Month11, m => m.MapFrom(s => s.Month11))
                .ForMember(d => d.Month12, m => m.MapFrom(s => s.Month12))
                .ForMember(d => d.Total, m => m.MapFrom(s => s.Total))
                .ForMember(d => d.IsVolume, m => m.MapFrom(s => s.IsVolume == true));
                //.AfterMap(
                //    (src, dest, ctx) =>
                //    {
                //        var turnover = ctx.GetService<QL_Turnover>();
                //        dest.GetExtension<ErpTurnoverExtension>().ProAlphaObjectId = $"{turnover.Company}_{src.Year}_{turnover.Key_1}_{turnover.Key_2}";
                //        dest.GetExtension<ErpTurnoverExtension>().ProAlphaLegacyId = $"{turnover.Company}_{src.Year}_{turnover.Key_1}_{turnover.Key_2}";
                //    });
        }
    }
}