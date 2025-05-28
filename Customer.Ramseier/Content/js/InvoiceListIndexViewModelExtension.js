(function () {
	var baseViewModel = window.Crm.ErpExtension.ViewModels.InvoiceListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.InvoiceListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_Invoice", ["InvoiceDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpExtension.ViewModels.InvoiceListIndexViewModel.prototype = baseViewModel.prototype;
}());