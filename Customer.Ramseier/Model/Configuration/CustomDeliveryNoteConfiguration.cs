namespace Customer.Ramseier.Model.Configuration
{
    using System.Linq;

    using Crm.ErpExtension.Model;
    using Crm.ErpExtension.Model.Lookups;
    using Crm.ErpIntegration.ProAlphaBase.Model.Configuration;
    using Crm.ErpIntegration.ProAlphaBase.Model.Configuration.Extensions;
    using Crm.ErpIntegration.ProAlphaBase.Model.ErpDocument;
    using Crm.Library.AutoFac;
    using Crm.Library.EntityConfiguration;
    using Crm.Library.Globalization.Lookup;

    public class CustomDeliveryNoteConfiguration : DeliveryNoteConfigurationExtension, IReplaceRegistration<DeliveryNoteConfigurationExtension>
    {
     
        public override void Initialize()
        {
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

        public CustomDeliveryNoteConfiguration(IEntityConfigurationHolder<DeliveryNote> entityConfigurationHolder, ILookupManager lookupManager)
            : base(entityConfigurationHolder, lookupManager)
        {
        }
    }
}