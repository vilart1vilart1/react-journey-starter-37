namespace Customer.Ramseier.Rest.Model.V1_0
{
    using System;
    using Crm.Article.Rest.Model.V1_0;
    using Crm.ErpExtension.Rest.Model;
    using Crm.Library.Api.Attributes;
    using Crm.Library.Rest;
    using Customer.Ramseier.Model;

    [RestTypeFor(DomainType = typeof(ErpDocumentArticleRelationship))]
    public class ErpDocumentArticleRelationshipRest : RestEntity
    {
        public Guid Id { get; set; }
        public virtual Guid OrderNoKey { get; set; }
        public virtual Guid QuoteNoKey { get; set; }
        public virtual Guid ErpDocumentId { get; set; }
        public virtual Guid ArticleId { get; set; }
        public virtual string ProAlphaObjectId { get; set; }
        public virtual string ProAlphaLegacyId { get; set; }
        [ExplicitExpand, NotReceived] public ErpDocumentRest ErpDocument { get; set; }
        [ExplicitExpand, NotReceived] public ArticleRest Article { get; set; }
    }
}