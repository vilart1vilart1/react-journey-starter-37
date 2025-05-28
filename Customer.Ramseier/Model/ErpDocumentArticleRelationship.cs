namespace Customer.Ramseier.Model
{
    using Crm.Article.Model;
    using Crm.ErpExtension.Model;
    using Crm.Library.BaseModel;
    using Crm.Library.BaseModel.Interfaces;
    using System;

    public class ErpDocumentArticleRelationship : EntityBase<Guid>, ISoftDelete
    {
        public virtual Guid OrderNoKey { get; set; }
        public virtual Guid QuoteNoKey { get; set; }
        public virtual Guid ArticleId { get; set; }
        public virtual Article Article { get; set; }
        public virtual Guid ErpDocumentId { get; set; }
        public virtual ErpDocument ErpDocument { get; set; }
        public virtual string ProAlphaObjectId { get; set; }
        public virtual string ProAlphaLegacyId { get; set; }
  }
}