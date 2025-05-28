namespace Customer.Ramseier.Model.ProAlpha.Entity.Lookups
{
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Base;

	public class S_ArtRabattSpr : EntityBase
	{
		public string Firma { get; set; }
		public string Rabattgruppe { get; set; }
		public string Sprache { get; set; }
		public string Bezeichnung { get; set; }
	}
}