namespace("Customer.Ramseier.ViewModels").CustomArticlePartialDiscountListModalViewModel = function () {
    var viewModel = this;
    viewModel.loading = window.ko.observable(true);
    viewModel.article = window.ko.observable(null);
    viewModel.partialDiscounts = window.ko.observableArray([]);
    viewModel.lookups = {
        partDiscountGroups: { $tableName: "CustomerRamseier_PartDiscountGroups" }
    };
};
namespace("Customer.Ramseier.ViewModels").CustomArticlePartialDiscountListModalViewModel.prototype = Object.create(window.Main.ViewModels.ViewModelBase.prototype);

namespace("Customer.Ramseier.ViewModels").CustomArticlePartialDiscountListModalViewModel.prototype.init = function (id) {
    var viewModel = this;
    return window.Helper.Lookup.getLocalizedArrayMaps(viewModel.lookups).then(function() {
        return window.database.CrmArticle_Article
        .find(id)
        .then(function (article) {
            return viewModel.article(article);
            }).then(function () {
                if (viewModel.article().ExtensionValues.PartDiscountGroupKey !== null && viewModel.article().ExtensionValues.PartDiscountGroupKey !== "") {
                    viewModel.partialDiscounts.push(viewModel.lookups.partDiscountGroups[viewModel.article().ExtensionValues.PartDiscountGroupKey]);
                }
            });
    });
   
};

