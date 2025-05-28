namespace Customer.Ramseier.Model.Configuration
{
    using Crm.ErpExtension.Model;
    using Crm.Library.EntityConfiguration;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Helper;
    public class ErpDocumentArticleRelationshipConfiguration : EntityConfiguration<ErpDocumentArticleRelationship>
    {
        public override void Initialize()
        {
            Property(x => x.OrderNoKey, c => c.Filterable(f =>
            {
                f.Definition(new AutoCompleterFilterDefinition<ErpDocument>("SalesOrderAutocomplete"
                    , new { Plugin = "Customer.Ramseier" }, "CrmErpExtension_SalesOrder"
                    , x => x.OrderNo, x => x.Id, x => x.OrderNo)
                { Caption = "T_OrderNo" });
            }));

            Property(x => x.QuoteNoKey, c => c.Filterable(f =>
            {
                f.Definition(new AutoCompleterFilterDefinition<ErpDocument>("QuoteAutocomplete"
                    , new { Plugin = "Customer.Ramseier" }, "CrmErpExtension_Quote"
                    , x => x.LegacyId, x => x.Id, x => x.LegacyId)
                { Caption = "T_QuoteNo" });
            }));

             Property(x => x.ArticleId, c => c.Filterable(f =>
            {
                f.Definition(new AutoCompleterFilterDefinition<ErpDocument>("ArticleAutocomplete"
                    , new { Plugin = "Crm.Article" }, "CrmArticle_Article"
                    , x => x.ItemNo, x => x.Id, x => x.ItemNo)
                { Caption = "Articles" });
            }));
        }
        public ErpDocumentArticleRelationshipConfiguration(IEntityConfigurationHolder<ErpDocumentArticleRelationship> entityConfigurationHolder, ILookupManager lookupManager, IAppSettingsProvider appSettingsProvider)
            : base(entityConfigurationHolder)
        {
        }
    }
}