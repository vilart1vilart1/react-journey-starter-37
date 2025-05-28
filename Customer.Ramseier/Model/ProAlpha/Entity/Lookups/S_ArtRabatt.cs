namespace Customer.Ramseier.Model.ProAlpha.Entity.Lookups
{
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;

	public class S_ArtRabatt : HeadEntityBase
	{
		public string Firma { get; set; }
		public string Rabattgruppe { get; set; }
		public string AnlageBenutzer { get; set; }
		public DateTime? AnlageDatum { get; set; }
		public string AnlageZeit { get; set; }
		public string AenderungBenutzer { get; set; }
		public DateTime? AenderungDatum { get; set; }
		public string AenderungZeit { get; set; }
		public string S_ArtRabatt_Obj { get; set; }
		public string Description { get; set; }
		public S_ArtRabStaffel S_ArtRabStaffel { get; set; }
		[XmlElement(ElementName = "S_ArtRabattSpr")]
		public List<S_ArtRabattSpr> S_ArtRabattSpr { get; set; }
	}
}