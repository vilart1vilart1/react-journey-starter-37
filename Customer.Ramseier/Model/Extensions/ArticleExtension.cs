namespace Customer.Ramseier.Model.Extensions
{
    using Crm.Article.Model;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.Library.BaseModel;
    using Crm.ErpIntegration.ProAlphaBase.Attributes;

    public class ArticleExtension : EntityExtension<Article>
    {
        public virtual string PartDiscountGroupKey { get; set; }
        [ProAlphaMapping(typeof(S_Artikel), "xDiscountClass")]
        public virtual string PartDiscountClass { get; set; }
    }
}
