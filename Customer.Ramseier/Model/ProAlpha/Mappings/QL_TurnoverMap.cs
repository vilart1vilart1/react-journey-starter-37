namespace Customer.Ramseier.Model.ProAlpha.Mappings
{
    using AutoMapper;
    using Crm.ErpExtension.Model;
    using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
    using Crm.Library.AutoMapper;
    using Customer.Ramseier.Model.ProAlpha.Entity;

    public class QL_TurnoverMap : IAutoMap
    {
        public void CreateMap(IProfileExpression Mapper)
        {
            Mapper.CreateMap<QL_Turnover, ErpTurnover>()
                .ForMember(d => d.ItemNo, m =>
                {
                    m.PreCondition((src, ctx) => src.AuswArt is "002");
                    m.MapFrom((src, dest, _, ctx) => src.Key_2);
                })
                .ForMember(d => d.ArticleGroup01Key, m =>
                {
                    m.PreCondition((src, ctx) => src.AuswArt is "004");
                    m.MapFrom((src, dest, _, ctx) => src.Key_2);
                });
        }
    }
}