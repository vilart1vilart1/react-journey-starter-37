namespace Customer.Ramseier.Model.ProAlpha.DataSet
{
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet.Base;
    using Customer.Ramseier.Model.ProAlpha.Entity;
    using System.Collections.Generic;

    using System.Xml.Serialization;
    public class TurnoverDataSet : DataSetBase
    {
        [XmlElement(ElementName = "QL_Turnover")]
        public List<QL_Turnover> Entities { get; set; }
    }
}