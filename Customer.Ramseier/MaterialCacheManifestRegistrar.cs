namespace Customer.Ramseier
{
	using Crm.ErpExtension.Rest.Model;
	using Crm.Library.Modularization.Interfaces;
	using Crm.Library.Offline;
	using Crm.Library.Offline.Interfaces;
	using Crm.Library.Services.Interfaces;
	using Crm.Services;

	public class MaterialCacheManifestRegistrar : CacheManifestRegistrar<MaterialCacheManifest>
	{
        private readonly IUserService userService;
        public MaterialCacheManifestRegistrar(IPluginProvider pluginProvider, IUserService userService)
			: base(pluginProvider)
		{
			this.userService = userService;
		}
		protected override void Initialize()
		{
			CacheJs("ramseierMaterial");
			Cache("TurnoverList", "IndexTemplate");
            Cache("TurnoverArticleGroupList", "IndexTemplate");
            Cache("CustomErpDocumentList", "IndexTemplate");
            Cache(() => $"~/Customer.Ramseier/BlanketOrderRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/CreditNoteRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/CustomErpDocumentRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/DeliveryNoteRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/DemoDeliveryNoteRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/InvoiceRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/MasterContractRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/QuoteRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/SalesOrderRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/TurnoverRest/GetByUser/?user =/{userService.CurrentUser}");
            Cache(() => $"~/Customer.Ramseier/TurnoverArticleGroupRest/GetByUser/?user =/{userService.CurrentUser}");
        }

	}
}
