namespace Customer.Ramseier.Model.ProAlpha.Entity
{
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

	public class S_KunARabStaffel : EntityBase
	{
		public string Firma { get; set; }
		public string Kunde { get; set; }
		public string Rabattgruppe { get; set; }
		public DateTime? gueltig_ab { get; set; }
		public DateTime? gueltig_bis { get; set; }
		public string StaffelMenge { get; set; }
		[XmlElement]
		public float[] Rabatt { get; set; }
		public string S_KunARabStaffel_Obj { get; set; }
		public string Description { get; set; }
	}
}