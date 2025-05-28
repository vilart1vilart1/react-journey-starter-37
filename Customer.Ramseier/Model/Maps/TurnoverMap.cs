namespace Customer.Ramseier.Model.Maps
{
	using System;

	using Crm.Library.BaseModel.Mappings;

	using LMobile.Unicore.NHibernate;
	using NHibernate.Mapping.ByCode;

	public class ErpTurnoverMap : EntityClassMapping<Turnover>
	{
		public ErpTurnoverMap()
		{
			Mutable(false);

			Schema("CRM");
			Table("TurnoverSumUpPerCustomer");

			Id(
				a => a.Id,
				m =>
				{
					m.Column("Id");
                    m.Generator(LMobile.Unicore.NHibernate.GuidCombGeneratorDef.Instance);
                    m.UnsavedValue(Guid.Empty);
				});

			Property(x => x.ContactKey);
			Property(x => x.ContactName);
			Property(x => x.CurrencyKey);
			Property(x => x.IsVolume);
			Property(x => x.QuantityUnitKey);
			Property(x => x.TotalCurrentYear);
			Property(x => x.ExtrapolatedTotalCurrentYear);
			Property(x => x.TotalPreviousYear);
			Property(x => x.TotalPrePreviousYear);
			Property(x => x.TotalMinusThreeYears);
			Property(x => x.Difference);
			Property(x => x.LegacyId);
			Property(x => x.LegacyVersion);
			ManyToOne(
				 x => x.Company,
				 m =>
				 {
					 m.Column("ContactKey");
					 m.Insert(false);
					 m.Update(false);
					 m.Fetch(FetchKind.Select);
					 m.Lazy(LazyRelation.Proxy);
				 });
		}
	}
}