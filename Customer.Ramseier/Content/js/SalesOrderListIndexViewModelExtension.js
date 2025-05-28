(function () {
  var baseViewModel = window.Crm.ErpExtension.ViewModels.SalesOrderListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.SalesOrderListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_SalesOrder", ["OrderConfirmationDate", "LegacyId"], ["DESC", "DESC"]);
	};
  window.Crm.ErpExtension.ViewModels.SalesOrderListIndexViewModel.prototype = baseViewModel.prototype;
}());