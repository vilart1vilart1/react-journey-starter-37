using Crm.Library.BaseModel.Mappings;
using NHibernate.Mapping.ByCode;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Model.Maps
{
    public class TurnoverArticleGroupMap : EntityClassMapping<TurnoverArticleGroup>
    {
        public TurnoverArticleGroupMap()
        {
            Cache(x =>
            {
                x.Include(CacheInclude.All);
                x.Usage(CacheUsage.ReadWrite);
            });

            Mutable(false);

            Schema("dbo");
            Table("TurnoverArticleGroup");

            Id(a => a.Id, m =>
            {
                m.Column("Id");
                m.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
                m.UnsavedValue(Guid.Empty);
            });

            Property(x => x.ContactKey);
            Property(x => x.ContactName);
            Property(x => x.CurrencyKey);
            Property(x => x.IsVolume);
            Property(x => x.QuantityUnitKey);
            Property(x => x.TotalCurrentYear);
            Property(x => x.ExtrapolatedTotalCurrentYear);
            Property(x => x.TotalPreviousYear);
            Property(x => x.TotalPrePreviousYear);
            Property(x => x.TotalMinusThreeYears);
            Property(x => x.Difference);
            Property(x => x.ArticleGroup01Key);
            ManyToOne(
                 x => x.Company,
                 m =>
                 {
                     m.Column("ContactKey");
                     m.Insert(false);
                     m.Update(false);
                     m.Fetch(FetchKind.Select);
                     m.Lazy(LazyRelation.Proxy);
                 });
        }
    }
    
}