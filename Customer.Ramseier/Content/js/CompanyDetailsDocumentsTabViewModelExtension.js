;
(function () {
    var baseViewModel = window.Main.ViewModels.CompanyDetailsDocumentsTabViewModel;
    window.Main.ViewModels.CompanyDetailsDocumentsTabViewModel = function () {
        baseViewModel.apply(this, arguments);
    };
    namespace("Main.ViewModels").CompanyDetailsDocumentsTabViewModel.prototype = baseViewModel.prototype;

    namespace("Main.ViewModels").CompanyDetailsDocumentsTabViewModel.prototype.applyFilters = function (query) {
        var viewModel = this;
        query = window.Main.ViewModels.ContactDetailsDocumentsTabViewModel.prototype.applyFilters.call(viewModel, query);
        query = query.filter("it.ExtensionValues.ErpDocumentKey == null");
        return query;
        //query = query.filter(function (it) {
        //    return it.ErpDocumentKey == null;
        //})
        //return query;

    };
})();
