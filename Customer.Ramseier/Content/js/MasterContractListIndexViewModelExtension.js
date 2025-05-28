(function () {
	var baseViewModel = window.Crm.ErpExtension.ViewModels.MasterContractListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.MasterContractListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_MasterContract", ["OrderConfirmationDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpExtension.ViewModels.MasterContractListIndexViewModel.prototype = baseViewModel.prototype;
}());