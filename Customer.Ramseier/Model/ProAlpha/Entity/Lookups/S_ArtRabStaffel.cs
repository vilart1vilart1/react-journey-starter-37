namespace Customer.Ramseier.Model.ProAlpha.Entity.Lookups
{
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;

	public class S_ArtRabStaffel : EntityBase
	{
		public string Firma { get; set; }
		public string Rabattgruppe { get; set; }
		public DateTime? gueltig_ab { get; set; }
		public DateTime? gueltig_bis { get; set; }
		public string StaffelMenge { get; set; }
		[XmlElement]
		public float[] Rabatt { get; set; }
		public string S_ArtRabStaffel_Obj { get; set; }
		public string Bezeichnung { get; set; }
	}
}