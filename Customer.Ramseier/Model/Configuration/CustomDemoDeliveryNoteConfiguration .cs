namespace Customer.Ramseier.Model.Configuration
{
    using System.Linq;

    using Crm.ErpExtension.Model;
    using Crm.ErpExtension.Model.Lookups;
    using Crm.ErpIntegration.ProAlphaBase.Model.Configuration;
    using Crm.ErpIntegration.ProAlphaBase.Model.ErpDocument;
    using Crm.Library.AutoFac;
    using Crm.Library.EntityConfiguration;
    using Crm.Library.Globalization.Lookup;
    using Crm.Model;

    public class CustomDemoDeliveryNoteConfiguration : DemoDeliveryNoteConfiguration, IReplaceRegistration<DemoDeliveryNoteConfiguration>
    {
     
        public override void Initialize()
        {
            Property(x => x.ContactKey, m => m.Filterable(f => f.Definition(new AutoCompleterFilterDefinition<Company>("CompanyAutocomplete", new { Plugin = "Main" }, "Main_Company", "Helper.Company.getDisplayName", x => x.Id, x => x.LegacyId, x => x.Name) { Caption = "Company" })));

            Property(x => x.OrderNo, c => c.Filterable(f => f.Caption("T_OrderNo")));

            Property(
                x => x.Total,
                c =>
                {
                    c.Filterable(
                        f =>
                        {
                            f.Definition(new ScaleFilterDefinition(500, 5000, 500, Operator.GreaterThan));
                            f.Caption("T_Value");
                        });
                    c.Sortable(f => f.SortCaption("T_Value"));
                });

            Property(
                x => x.TotalWoTaxes,
                c =>
                {
                    c.Filterable(
                        f =>
                        {
                            f.Definition(new ScaleFilterDefinition(500, 5000, 500, Operator.GreaterThan));
                            f.Caption("T_GrossAmount");
                        });
                    c.Sortable(f => f.SortCaption("T_GrossAmount"));
                });

            Property(x => x.StatusKey, m => m.Sortable(s => s.SortCaption("ErpDocumentStatusKey")));

            var dropDownFilter = new DropDownFilterDefinition(lookupManager.List<ErpDocumentStatus>().ToDictionary(x => x.Key, y => y.Value));
            Property(x => x.StatusKey, c => c.Filterable(f => f.Definition(dropDownFilter)));

        }

        public CustomDemoDeliveryNoteConfiguration(IEntityConfigurationHolder<DemoDeliveryNote> entityConfigurationHolder, ILookupManager lookupManager)
            : base(entityConfigurationHolder, lookupManager)
        {
        }
    }
}