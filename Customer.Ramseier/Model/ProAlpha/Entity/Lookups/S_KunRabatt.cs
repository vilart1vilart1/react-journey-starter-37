namespace Customer.Ramseier.Model.ProAlpha.Entity.Lookups
{
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;

	public class S_KunRabatt : HeadEntityBase
	{
		public string Firma { get; set; }
		public string Rabattgruppe { get; set; }
		public string AnlageBenutzer { get; set; }
		public DateTime? AnlageDatum { get; set; }
		public string AnlageZeit { get; set; }
		public string AenderungBenutzer { get; set; }
		public DateTime? AenderungDatum { get; set; }
		public string AenderungZeit { get; set; }
		public string S_KunRabatt_Obj { get; set; }
		public S_KunRabDatum S_KunRabDatum { get; set; }
		[XmlElement(ElementName = "S_KunRabattSpr")]
		public List<S_KunRabattSpr> S_KunRabattSpr { get; set; }
	}
}