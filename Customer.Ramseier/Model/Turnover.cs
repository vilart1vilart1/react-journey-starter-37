namespace Customer.Ramseier.Model
{
	using System;

	using Crm.Library.BaseModel;
	using Crm.Model;

	public class Turnover : EntityBase<Guid>
	{
		public virtual Guid? ContactKey { get; set; }
		public virtual string ContactName { get; set; }
		public virtual string CurrencyKey { get; set; }
		public virtual bool IsVolume { get; set; }
		public virtual string QuantityUnitKey { get; set; }
		public virtual float? TotalCurrentYear { get; set; }
		public virtual float? ExtrapolatedTotalCurrentYear { get; set; }
		public virtual float? TotalPreviousYear { get; set; }
		public virtual float? TotalPrePreviousYear { get; set; }
		public virtual float? TotalMinusThreeYears { get; set; }
		public virtual float? Difference { get; set; }
		public virtual string LegacyId { get; set; }
		public virtual long? LegacyVersion { get; set; }
        public virtual Company Company { get; set; }
    }
}