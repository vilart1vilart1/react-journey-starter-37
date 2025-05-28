using Crm.Article.Model.Lookups;
using Crm.Library.BaseModel;
using Crm.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Model
{
    public class TurnoverArticleGroup : EntityBase<Guid>
    {
        public virtual Guid? ContactKey { get; set; }
        public virtual string ContactName { get; set; }
        public virtual string CurrencyKey { get; set; }
        public virtual bool IsVolume { get; set; }
        public virtual string QuantityUnitKey { get; set; }
        public virtual float? TotalCurrentYear { get; set; }
        public virtual float? ExtrapolatedTotalCurrentYear { get; set; }
        public virtual float? TotalPreviousYear { get; set; }
        public virtual float? TotalPrePreviousYear { get; set; }
        public virtual float? TotalMinusThreeYears { get; set; }
        public virtual float? Difference { get; set; }
        public virtual string ArticleGroup01Key { get; set; }
        public virtual ArticleGroup01 ArticleGroup01
        {
            get { return ArticleGroup01Key != null ? LookupManager.Get<ArticleGroup01>(ArticleGroup01Key) : null; }
        }
        public virtual Company Company { get; set; }
    }
    
}