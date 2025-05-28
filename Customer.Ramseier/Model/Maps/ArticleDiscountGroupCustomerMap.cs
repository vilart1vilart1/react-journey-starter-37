namespace Customer.Ramseier.Model.Maps
{
    using Crm.Library.BaseModel.Mappings;
    using NHibernate.Mapping.ByCode;
    using System;

    public class ArticleDiscountGroupCustomerMap : EntityClassMapping<ArticleDiscountGroupCustomer>
    {
        public ArticleDiscountGroupCustomerMap()
        {
            Schema("CRM");
            Table("ArticleDiscountGroupCustomer");

            Id(a => a.Id, m =>
            {
                m.Column("ArticleDiscountGroupCustomerId");
                m.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
                m.UnsavedValue(Guid.Empty);
            });

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

            Property(x => x.ContactKey);
            Property(x => x.PartDiscountGroupKey);
            Property(x => x.Description);
            Property(x => x.Ds1);
            Property(x => x.Ds2);
            Property(x => x.Ds3);
            Property(x => x.ValidFrom);
            Property(x => x.ValidTo);
            Property(x => x.ProAlphaLegacyId);
            Property(x => x.ProAlphaObjectId);
        }
    }
}