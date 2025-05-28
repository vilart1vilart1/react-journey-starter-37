(function () {
	var baseViewModel = window.Crm.ErpExtension.ViewModels.QuoteListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.QuoteListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_Quote", ["QuoteDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpExtension.ViewModels.QuoteListIndexViewModel.prototype = baseViewModel.prototype;
}());