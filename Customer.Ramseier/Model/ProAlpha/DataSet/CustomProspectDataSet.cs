namespace Customer.Ramseier.Model.ProAlpha.DataSet
{
	using System.Collections.Generic;
	using System.Xml.Serialization;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet.Base;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	public class CustomProspectDataSet : DataSetBase
	{
		[XmlElement(ElementName = "VC_Interessent")]
		public List<Custom_VC_Interessent> Prospects { get; set; }
	}
}