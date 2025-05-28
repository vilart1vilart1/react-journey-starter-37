(function () {
	var baseViewModel = window.Crm.ErpExtension.ViewModels.DeliveryNoteListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.DeliveryNoteListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_DeliveryNote", ["DeliveryNoteDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpExtension.ViewModels.DeliveryNoteListIndexViewModel.prototype = baseViewModel.prototype;
}());