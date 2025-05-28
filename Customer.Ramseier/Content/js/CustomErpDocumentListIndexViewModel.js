namespace("Customer.Ramseier.ViewModels").CustomErpDocumentListIndexViewModel = function () {
	var viewModel = this;
	viewModel.showContactLink = window.ko.observable(true);
	viewModel.lookups = {
		currencies: { $tableName: "Main_Currency" },
		documentStatuses: { $tableName: "CrmErpExtension_ErpDocumentStatus" }
	};
	viewModel.companyIdsConnectedThroughSalesAgent = [];
	window.Main.ViewModels.GenericListViewModel.call(this, "CustomerRamseier_CustomErpDocument", ["OrderNo", "ModifyDate"], ["DESC", "DESC"]);

};
namespace("Customer.Ramseier.ViewModels").CustomErpDocumentListIndexViewModel.prototype = Object.create(window.Main.ViewModels.GenericListViewModel.prototype);
namespace("Customer.Ramseier.ViewModels").CustomErpDocumentListIndexViewModel.prototype.init = function () {
	var viewModel = this;
	return window.Helper.User.getCurrentUser()
		.pipe(function (user) {
			viewModel.currentUser(user);
		})
		.then(function () {
			return window.Main.ViewModels.GenericListViewModel.prototype.init.apply(viewModel, arguments);
		}).then(function () {
			return window.Helper.Lookup.getLocalizedArrayMaps(viewModel.lookups);
		}).then(function () {
			viewModel.documentStatuses = viewModel.lookups.documentStatuses;
			viewModel.currencies = viewModel.lookups.currencies;
		});
};