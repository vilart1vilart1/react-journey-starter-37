namespace Customer.Ramseier.Model.Maps
{
    using System;
    using Crm.Library.BaseModel.Mappings;
    using Customer.Ramseier.Model;
    using NHibernate.Mapping.ByCode;

    public class ErpDocumentArticleRelationshipMap : EntityClassMapping<ErpDocumentArticleRelationship>
    {
        public ErpDocumentArticleRelationshipMap()
        {
            Schema("CRM");
            Table("ErpDocumentArticleRelationship");

            Id(x => x.Id, m =>
            {
                m.Column("ErpDocumentArticleRelationshipId");
                m.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
                m.UnsavedValue(Guid.Empty);
            });
            Property(x => x.QuoteNoKey);
            Property(x => x.OrderNoKey);
            Property(x => x.ProAlphaLegacyId);
            Property(x => x.ProAlphaObjectId);
            Property(x => x.ArticleId);
            ManyToOne(
                x => x.Article,
                m =>
                {
                    m.Column("ArticleId");
                    m.Insert(false);
                    m.Update(false);
                    m.Fetch(FetchKind.Select);
                    m.Lazy(LazyRelation.Proxy);
                });
            Property(x => x.ErpDocumentId);
            ManyToOne(
                x => x.ErpDocument,
                m =>
                {
                    m.Column("ErpDocumentId");
                    m.Insert(false);
                    m.Update(false);
                    m.Fetch(FetchKind.Select);
                    m.Lazy(LazyRelation.Proxy);
                });
        }
    }
}