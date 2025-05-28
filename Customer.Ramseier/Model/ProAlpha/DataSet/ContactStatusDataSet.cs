namespace Customer.Ramseier.Model.ProAlpha.DataSet
{
	using System.Collections.Generic;
	using System.Xml.Serialization;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet.Base;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	public class ContactStatusDataSet : DataSetBase
	{
		[XmlElement(ElementName = "BBT_WflLockStatusInst")]
		public List<BBT_WflLockStatusInst> ContactStatuses { get; set; }
	}
}