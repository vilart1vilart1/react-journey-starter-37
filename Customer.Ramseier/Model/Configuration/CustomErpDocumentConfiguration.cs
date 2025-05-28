namespace Customer.Ramseier.Model.Configuration
{
	using Crm.ErpExtension.Model.Lookups;
	using Crm.Library.EntityConfiguration;
	using Crm.Library.Globalization.Lookup;
	using Crm.Model;
	using System.Collections.Generic;
	using System.Linq;

	public class CustomErpDocumentConfiguration : EntityConfiguration<CustomErpDocument>
	{
		protected readonly ILookupManager lookupManager;

		public CustomErpDocumentConfiguration(IEntityConfigurationHolder<CustomErpDocument> entityConfigurationHolder, ILookupManager lookupManager)
			: base(entityConfigurationHolder)
		{
			this.lookupManager = lookupManager;
		}
		public override void Initialize()
		{
			Dictionary<string, string> _documentTypes = new Dictionary<string, string> { { "MasterContract", "MasterContract" }, { "CreditNote", "CreditNote" }, { "DeliveryNote", "DeliveryNote" }, { "Invoice", "Invoice" }, { "SalesOrder", "SalesOrder" },
				{ "Quotes","Quotes"},{ "DemoDeliveryNote","DemoDeliveryNote"},{ "BlanketOrder","BlanketOrder"}
			};

			Property(x => x.ContactKey, m => m.Filterable(f => f.Definition(new AutoCompleterFilterDefinition<Company>("CompanyAutocomplete", new { Plugin = "Main" }, "Main_Company", "Helper.Company.getDisplayName", x => x.Id, x => x.LegacyId, x => x.Name) { Caption = "Company" })));
			var typeDropDownFilter = new DropDownFilterDefinition(_documentTypes);
			Property(x => x.DocumentType, c => c.Filterable(f => f.Definition(typeDropDownFilter)));
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
	}
}