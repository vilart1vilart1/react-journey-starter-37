namespace("Customer.Ramseier.ViewModels").StatusEditModalViewModel = function (parentViewModel) {
    var viewModel = this;
    viewModel.loading = window.ko.observable(true);
    viewModel.contactId = parentViewModel.contactId;
    viewModel.status = window.ko.observable(null);
    viewModel.users = parentViewModel.users;
    viewModel.errors = window.ko.validation.group(viewModel.status, { deep: true });
    viewModel.refreshParentViewModel = function () {
        parentViewModel.init(viewModel.contactId());
    };
    viewModel.lookups = {

        contactStatusTypes: {
            $tableName: "CustomerRamseier_ContactStatusType"}

    };
}
namespace("Customer.Ramseier.ViewModels").StatusEditModalViewModel.prototype.init = function (id) {
    var viewModel = this;
    return new $.Deferred().resolve().promise().pipe(function() {
        if (!!id) {
            return window.database.CustomerRamseier_ContactStatus.find(id)
                .then(window.database.attachOrGet.bind(window.database));
        }
        var newStatus = window.database.CustomerRamseier_ContactStatus.CustomerRamseier_ContactStatus.create();
        newStatus.ContactKey = viewModel.contactId();
        newStatus.LegacyId = window.Customer.Ramseier.Settings.ContactStatus.LegacyId;
        newStatus.Description ="AD Information zu Angebot / Auftrag"
        window.database.add(newStatus);
        return newStatus;
    }).pipe(function(status) {
        viewModel.status(status.asKoObservable());
    }).then(function () {
        return window.Helper.Lookup.getLocalizedArrayMap("CustomerRamseier_ContactStatusType")
             .then(function (lookup) {
             viewModel.lookups.contactStatusTypes = lookup;
            });


    }).then(function () {
    viewModel.status().StatusTypeKey(window.Helper.Lookup.getDefaultLookupValueSingleSelect(viewModel.lookups.contactStatusTypes, viewModel.status().StatusTypeKey()));
    });
}
namespace("Customer.Ramseier.ViewModels").StatusEditModalViewModel.prototype.save = function () {
    var viewModel = this;
    viewModel.loading(true);
    if (viewModel.errors().length > 0) {
        viewModel.loading(false);
        viewModel.errors.showAllMessages();
        return;
    }
    window.database.saveChanges().then(function () {
        viewModel.loading(false);
        viewModel.refreshParentViewModel();
        $(".modal:visible").modal("hide");
        $(".tab-nav a[href='#tab-details']").tab("show");
    }).fail(function (e) {
        viewModel.loading(false);
        window.swal(window.Helper.String.getTranslatedString("UnknownError"), window.Helper.String.getTranslatedString("Error_InternalServerError"), "error");
    });
}
namespace("Customer.Ramseier.ViewModels").StatusEditModalViewModel.prototype.dispose = function () {
    var viewModel = this;
    window.database.CustomerRamseier_ContactStatus.detach(viewModel.status().innerInstance);
}