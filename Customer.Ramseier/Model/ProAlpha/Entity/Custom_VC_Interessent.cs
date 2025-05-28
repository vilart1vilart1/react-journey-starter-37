namespace Customer.Ramseier.Model.ProAlpha.Entity
{
	using System;
	using System.Collections.Generic;
	using System.Xml.Serialization;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

	public class Custom_VC_Interessent : HeadEntityBase
	{
		public string AenderungBenutzer { get; set; }
		public DateTime? AenderungDatum { get; set; }
		public string AenderungZeit { get; set; }
		public string Firma { get; set; }
		public int? Interessent { get; set; }
		public string Suchbegriff { get; set; }
		public string Selektion { get; set; }
		public int? AdressNr { get; set; }
		public string Staat { get; set; }
		public string PLZ { get; set; }
		public string Sprache { get; set; }
		public int? Waehrung { get; set; }
		public string Branche { get; set; }
		public string VerteilerGruppe { get; set; }
		public string Region { get; set; }
		public int? LieferBedingung { get; set; }
		public int? VersandArt { get; set; }
		public string PreisGruppe { get; set; }
		public bool? RabattArt { get; set; }
		public string Rabattgruppe { get; set; }
		public bool? Fracht_Skontofaehig { get; set; }
		public int? Verband { get; set; }
		public int? Konzern { get; set; }
		public string EuroLand { get; set; }
		public int? ZahlungsArt { get; set; }
		public int? ZahlungsZiel { get; set; }
		public string BankKonto { get; set; }
		public string Bank { get; set; }
		public string Sachbearbeiter { get; set; }
		public int? StGr_mit_ST { get; set; }
		public int? StGrEU_mit_ST { get; set; }
		public int? StGrAus_mit_ST { get; set; }
		public int? StGr_ohne_ST { get; set; }
		public int? StGrEU_ohne_ST { get; set; }
		public int? StGrAus_ohne_ST { get; set; }
		public string Rating { get; set; }
		public bool? Eurokonvertierung { get; set; }
		public int? Kunde { get; set; }
		public int? Zugehoerigkeit { get; set; }
		public string BrancheInteressent { get; set; }
		public string Bemerkung { get; set; }
		public string IBAN { get; set; }
		public int? InteressentVorlage { get; set; }
		public string CharacterField1 { get; set; }
		public string CharacterField2 { get; set; }
		public string CharacterField3 { get; set; }
		public string CharacterField4 { get; set; }
		public string CharacterField5 { get; set; }
		public double? DecimalField1 { get; set; }
		public double? DecimalField2 { get; set; }
		public double? DecimalField3 { get; set; }
		public double? DecimalField4 { get; set; }
		public double? DecimalField5 { get; set; }
		public string AnlageBenutzer { get; set; }
		public DateTime? AnlageDatum { get; set; }
		public string AnlageZeit { get; set; }
		public string Kontaktklasse { get; set; }
		public string VC_Interessent_Obj { get; set; }
		public bool? RobinsonCheck { get; set; }
		public Custom_S_Kunde S_Kunde { get; set; }
		public S_Adresse S_Adresse { get; set; }
		[XmlElement(ElementName = "BT_Kopf")]
		public List<BT_Kopf> BT_Kopf { get; set; }
	}
}