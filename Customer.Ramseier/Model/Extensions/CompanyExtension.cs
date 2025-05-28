namespace Customer.Ramseier.Model.Extensions
{
    using Crm.BackgroundServices.Dropbox;
    using Crm.ErpIntegration.ProAlphaBase.Attributes;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.Library.BaseModel;
    using Crm.Library.BaseModel.Attributes;
    using Crm.Model;

    public class CompanyExtension : EntityExtension<Company>
    {
        public virtual string Needs { get; set; }
        public virtual string CustomerDiscountGroupKey { get; set; }
        [Database(Ignore = true)]
        [ProAlphaMapping(typeof(S_Kunde), "X_RevenuePotential")]
        public virtual string CustomerCompanyGroupFlag2
        {
            get {
                return ExtendedEntity?.CompanyGroupFlag2?.Value;
            }
            set { }
        }
        [Database(Ignore = true)]
        [ProAlphaMapping(typeof(S_Kunde), "X_RevenueTarget")]
        public virtual string CustomerCompanyGroupFlag3 {
            get
            {
                return ExtendedEntity?.CompanyGroupFlag3?.Value;
            }
            set { }
        }
    }
}