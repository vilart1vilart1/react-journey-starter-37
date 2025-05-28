(function () {
	var baseViewModel = window.Crm.ErpIntegration.ProAlphaBase.ViewModels.BlanketOrderListIndexViewModel;
	window.Crm.ErpIntegration.ProAlphaBase.ViewModels.BlanketOrderListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(viewModel, "CrmErpIntegrationProAlphaBase_BlanketOrder", ["OrderConfirmationDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpIntegration.ProAlphaBase.ViewModels.BlanketOrderListIndexViewModel.prototype = baseViewModel.prototype;
}());