namespace Customer.Ramseier.Model.Configuration
{
    using Crm.Article.Model.Lookups;
    using Crm.ErpExtension.Model.Lookups;
    using Crm.Library.EntityConfiguration;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Helper;
    using Crm.Model;
    using Customer.Ramseier.Model.Extensions;
    using System.Linq;

    public class TurnoverArticleGroupConfiguration : EntityConfiguration<TurnoverArticleGroup>
    {
        protected readonly ILookupManager lookupManager;
        public TurnoverArticleGroupConfiguration(IEntityConfigurationHolder<TurnoverArticleGroup> entityConfigurationHolder, ILookupManager lookupManager) : base(entityConfigurationHolder)
        {
            this.lookupManager = lookupManager;
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
            Property(x => x.ArticleGroup01, c => { c.Filterable(); });
            Property(x => x.ArticleGroup01Key, c => { c.Sortable(); });
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