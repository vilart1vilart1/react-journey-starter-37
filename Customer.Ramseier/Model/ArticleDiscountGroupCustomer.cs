namespace Customer.Ramseier.Model
{
    using Crm.Article.Model;
    using Crm.Library.BaseModel;
    using Crm.Library.BaseModel.Attributes;
    using Crm.Library.BaseModel.Interfaces;
    using Crm.Model;
    using Customer.Ramseier.Model.Lookups;
    using System;


    public class ArticleDiscountGroupCustomer : EntityBase<Guid>, ISoftDelete
    {
        public virtual Guid ContactKey { get; set; }
        public virtual Company Company { get; set; }
        public virtual string Description { get; set; }
        public virtual decimal Ds1 { get; set; }
        public virtual decimal Ds2 { get; set; }
        public virtual decimal Ds3 { get; set; }
        public virtual DateTime? ValidFrom { get; set; }
        public virtual DateTime? ValidTo { get; set; }
        public virtual string PartDiscountGroupKey { get; set; }
        [Obsolete("Use ILookupManager instance to retrieve value at calling method", false)]
        public virtual PartDiscountGroups partDiscountGroup
        {
            get { return partDiscountGroup != null ? LookupManager.Get<PartDiscountGroups>(PartDiscountGroupKey) : null; }
        }
        [UI(Hidden = true)]
        public virtual string ProAlphaLegacyId { get; set; }

        [UI(Hidden = true)]
        public virtual string ProAlphaObjectId { get; set; }
    }
}