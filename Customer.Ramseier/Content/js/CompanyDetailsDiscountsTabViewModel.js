namespace("Main.ViewModels").CompanyDetailsDiscountsTabViewModel = function (parentViewModel) {
    var viewModel = this;
    viewModel.loading = window.ko.observable(true);
    viewModel.company = parentViewModel.company;
    viewModel.customPartDiscounts = window.ko.observableArray([]);
    viewModel.customDiscounts = window.ko.observableArray([]);
    window.Main.ViewModels.GenericListViewModel.call(viewModel, "CustomerRamseier_ArticleDiscountGroupCustomer");
    viewModel.getFilter("ContactKey").extend({ filterOperator: "===" })(parentViewModel.company().Id());
};
namespace("Main.ViewModels").CompanyDetailsDiscountsTabViewModel.prototype = Object.create(window.Main.ViewModels.GenericListViewModel.prototype);
namespace("Main.ViewModels").CompanyDetailsDiscountsTabViewModel.prototype.init = function () {
    var viewModel = this;
    var args = arguments;
    return window.database.CustomerRamseier_CustomerDiscountGroup
        .filter(function (r) { return r.Key == Key; }, {
            Key: viewModel.company().ExtensionValues().CustomerDiscountGroupKey()
        })
        .toArray(viewModel.customDiscounts)
        .then(function () {
            window.database.CustomerRamseier_ArticleDiscountGroupCustomer
                .filter(function (r) { return r.ContactKey == Key; }, {
                    Key: viewModel.company().Id()
                })
                .toArray(viewModel.customPartDiscounts);
        })
        .then(function () {
            return window.Main.ViewModels.GenericListViewModel.prototype.init.apply(viewModel, args);
        });
};




