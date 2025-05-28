namespace Customer.Ramseier.Model.ProAlpha.Entity
{
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

	public class Custom_S_Kunde : S_Kunde
	{
		[XmlElement(ElementName = "S_KunARabStaffel")]
		public List<S_KunARabStaffel> S_KunARabStaffel { get; set; }
	}
}