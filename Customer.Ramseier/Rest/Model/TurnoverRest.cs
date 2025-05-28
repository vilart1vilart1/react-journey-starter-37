namespace Customer.Ramseier.Rest.Model
{
	using System;

	using Crm.Library.Api.Attributes;
	using Crm.Library.BaseModel;
	using Crm.Library.Rest;
	using Customer.Ramseier.Model;

	[RestrictedType]
	[RestTypeFor(DomainType = typeof(Turnover))]
	public class TurnoverRest : RestEntity
	{
		public Guid Id { get; set; }
		public Guid? ContactKey { get; set; }
		public string ContactName { get; set; }
		public string CurrencyKey { get; set; }
		public bool IsVolume { get; set; }
		public string QuantityUnitKey { get; set; }
		public virtual float? TotalCurrentYear { get; set; }
		public virtual float? ExtrapolatedTotalCurrentYear { get; set; }
		public virtual float? TotalPreviousYear { get; set; }
		public virtual float? TotalPrePreviousYear { get; set; }
		public virtual float? TotalMinusThreeYears { get; set; }
		public virtual float? Difference { get; set; }
		public virtual string LegacyId { get; set; }
		public virtual long? LegacyVersion { get; set; }
		public SerializableDictionary<string, object> ExtensionValues { get; set; }
	}
}