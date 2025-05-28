namespace Customer.Ramseier.Model.Configuration
{
	using Crm.Library.AutoFac;
	using Crm.Library.EntityConfiguration;
	using Crm.VisitReport.Model;
	using Crm.VisitReport.Model.Configuration;

	using Customer.Ramseier.Model.Extensions;

	public class CustomVisitConfiguration : VisitConfiguration, IReplaceRegistration<VisitConfiguration>
	{
		public override void Initialize()
		{
			Property(
				x => x.PlannedDate,
				m =>
				{
					m.Filterable(f => f.Definition(new DateFilterDefinition { AllowPastDates = true, AllowFutureDates = true }));
					m.Sortable();
					m.Timeline(
						x => x.Id,
						x => x.GetIcsSummary(),
						x => !x.PlannedTime.HasValue,
						durationMapping: x => x.PlannedDuration.GetValueOrDefault(),
						descriptionMapping: x => x.GetIcsDescription(),
						locationMapping: x => x.GetIcsLocation());
				});
		}
		public CustomVisitConfiguration(IEntityConfigurationHolder<Visit> entityConfigurationHolder)
			: base(entityConfigurationHolder)
		{
		}
	}
}