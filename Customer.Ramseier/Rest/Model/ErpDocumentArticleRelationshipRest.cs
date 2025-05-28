namespace Customer.Ramseier.Rest.Model
{
    using System;
    using Crm.Library.Rest;
    using Customer.Ramseier.Model;

    [RestTypeFor(DomainType = typeof(ErpDocumentArticleRelationship))]
    public class ErpDocumentArticleRelationshipRest : RestEntity
    {
        public Guid Id { get; set; }
        public Guid OrderNoKey { get; set; }
        public Guid QuoteNoKey { get; set; }
        public Guid ErpDocumentId { get; set; }
        public Guid ArticleId { get; set; }
        public  string ProAlphaObjectId { get; set; }
        public  string ProAlphaLegacyId { get; set; }
    }
}