namespace Customer.Ramseier.Model.ProAlpha.Entity
{
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;
    using System.Collections.Generic;
    using System.Xml.Serialization;
    public class QL_Turnover : HeadEntityBase
    {
        public virtual string Company { get; set; }
        public virtual string Key_1 { get; set; }
        public virtual string Key_2 { get; set; }
        public virtual string AuswArt { get; set; }
        public virtual int? Currency { get; set; }
        public virtual int? QuantityUnit { get; set; }
        [XmlElement(nameof(QL_TurnoverValues))]
        public List<QL_TurnoverValues> QL_TurnoverValues { get; set; }
    }
}