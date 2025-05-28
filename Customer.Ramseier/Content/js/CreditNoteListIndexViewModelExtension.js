(function () {
	var baseViewModel = window.Crm.ErpExtension.ViewModels.CreditNoteListIndexViewModel;
	window.Crm.ErpExtension.ViewModels.CreditNoteListIndexViewModel = function () {
		var viewModel = this;
		window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel.call(this, "CrmErpExtension_CreditNote", ["CreditNoteDate", "LegacyId"], ["DESC", "DESC"]);
	};
	window.Crm.ErpExtension.ViewModels.CreditNoteListIndexViewModel.prototype = baseViewModel.prototype;
}());