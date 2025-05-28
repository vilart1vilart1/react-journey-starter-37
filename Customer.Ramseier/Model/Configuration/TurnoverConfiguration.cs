namespace Customer.Ramseier.Model.Configuration
{
    using Crm.Library.EntityConfiguration;
    using Crm.Library.Helper;
    using Crm.Model;
    using Customer.Ramseier.Model.Extensions;

    public class TurnoverConfiguration : EntityConfiguration<Turnover>
    {
        private readonly IAppSettingsProvider appSettingsProvider;
        public TurnoverConfiguration(IEntityConfigurationHolder<Turnover> entityConfigurationHolder, IAppSettingsProvider appSettingsProvider)
            : base(entityConfigurationHolder)
        {
            this.appSettingsProvider = appSettingsProvider;
        }
        public override void Initialize()
        {
            Property(
                x => x.ContactKey,
                m =>
                {
                    m.Filterable(
                        f =>
                        {
                            f.Definition(new AutoCompleterFilterDefinition<Company>("CompanyAutocomplete", new { Plugin = "Main" }, "Main_Company", x => x.Name, x => x.Id, x => x.LegacyId, x => x.Name));
                            f.Caption("Company");
                        });
                });
            Property(
                x => x.Difference,
                m =>
                {
                    m.Sortable();
                    m.Filterable();
                });
            Property(
                x => x.TotalCurrentYear,
                m =>
                {
                    m.Sortable();
                    m.Filterable(
                        f => f.Definition(new ScaleFilterDefinition(0, 100000, 5000, Operator.GreaterThan))
                    );
                });
            Property(
                x => x.TotalPreviousYear,
                m =>
                {
                    m.Sortable();
                    m.Filterable(
                        f => f.Definition(new ScaleFilterDefinition(0, 100000, 5000, Operator.GreaterThan))
                    );
                });
            Property(
                x => x.TotalPrePreviousYear,
                m =>
                {
                    m.Sortable();
                    m.Filterable(
                        f => f.Definition(new ScaleFilterDefinition(0, 100000, 5000, Operator.GreaterThan))
                    );
                });
            Property(
                x => x.TotalMinusThreeYears,
                m =>
                {
                    m.Sortable();
                    m.Filterable(
                        f => f.Definition(new ScaleFilterDefinition(0, 100000, 5000, Operator.GreaterThan))
                    );
                });
            NestedProperty(x => x.Company.StandardAddress.ZipCode, c => c.Filterable());
            Property(x => x.ContactName, m => m.Sortable(s => s.SortCaption("Company")));
            NestedProperty(x => x.Company.StandardAddress.Country, m => m.Filterable());
            Bookmark("Filter", "TurnoverValue", x => !x.IsVolume);
            Bookmark("Filter", "QuantityValue", x => x.IsVolume);
        }
    }
}