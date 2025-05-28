(function () {
	var baseViewModel = window.Main.ViewModels.CompanyDetailsViewModel;
	window.Main.ViewModels.CompanyDetailsViewModel = function () {
		baseViewModel.apply(this, arguments);
		var viewModel = this;
		viewModel.companyStatus = window.ko.observable(null);
	};
	window.Main.ViewModels.CompanyDetailsViewModel.prototype = baseViewModel.prototype;
	var baseInit = baseViewModel.prototype.init;
	window.Main.ViewModels.CompanyDetailsViewModel.prototype.init = function (id) {
		var viewModel = this;
        return baseInit.apply(this, arguments).then(function () {
            return window.database.CustomerRamseier_ContactStatus.filter(function (status) { return status.ContactKey === this.companyId && status.LegacyId === this.settingsLegacyId; },
				{ companyId: viewModel.contactId(), settingsLegacyId: window.Customer.Ramseier.Settings.ContactStatus.LegacyId }).toArray().then(function (contactStatuses) {
					if (contactStatuses.length > 0) {
						viewModel.companyStatus(contactStatuses[0].asKoObservable());
					}
				});
		});
	};
	window.Main.ViewModels.CompanyDetailsViewModel.prototype.get = function (fileResource) {
		$.ajax({
			type: 'GET',
			url: window.open(window.Helper.resolveUrl("~/Customer.Ramseier/Head/GetDocument/") + fileResource.Id(),
				'_blank', 'location=no,closebuttoncaption=' + window.Helper.String.getTranslatedString('Close'))
		});
	};

})();