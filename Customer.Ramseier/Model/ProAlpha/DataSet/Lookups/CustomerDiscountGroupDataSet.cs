namespace Customer.Ramseier.Model.ProAlpha.DataSet.Lookups
{
	using System.Collections.Generic;
	using System.Xml.Serialization;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet.Base;
	using Customer.Ramseier.Model.ProAlpha.Entity.Lookups;

	public class CustomerDiscountGroupDataSet : DataSetBase
	{
		[XmlElement(ElementName = "S_KunRabatt")]
		public List<S_KunRabatt> CustomerDiscountGroups { get; set; }
	}
}