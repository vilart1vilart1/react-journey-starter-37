namespace Customer.Ramseier.Model.ProAlpha.Entity.Lookups
{
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;

	public class S_KunRabDatum : EntityBase
	{
		public string Firma { get; set; }
		public string Rabattgruppe { get; set; }
		public DateTime? gueltig_ab { get; set; }
		public DateTime? gueltig_bis { get; set; }
		[XmlElement]
		public float[] Rabatt { get; set; }
		public string AnlageBenutzer { get; set; }
		public DateTime? AnlageDatum { get; set; }
		public string AnlageZeit { get; set; }
		public string AenderungBenutzer { get; set; }
		public DateTime? AenderungDatum { get; set; }
		public string AenderungZeit { get; set; }
		public string S_KunRabDatum_Obj { get; set; }
	}
}