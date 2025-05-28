namespace("Customer.Ramseier.ViewModels").ErpDocumentArticleRelationshipListIndexViewModel = function () {
    var viewModel = this;
    viewModel.loading = window.ko.observable(true);
    viewModel.currentUser = window.ko.observable(null);
    viewModel.getId = window.ko.observable(null);
    viewModel.lookups = {
        articleTypes: { $tableName: "CrmArticle_ArticleType" }
    };
    window.Main.ViewModels.ContactListViewModel.call(this,
        "CustomerRamseier_ErpDocumentArticleRelationship"
        , ["ArticleId", "ErpDocumentId"]
        , ["ASC", "ASC"]
        , ["Article", "ErpDocument"]);
};
namespace("Customer.Ramseier.ViewModels").ErpDocumentArticleRelationshipListIndexViewModel.prototype =
    Object.create(window.Main.ViewModels.ContactListViewModel.prototype);
namespace("Customer.Ramseier.ViewModels").ErpDocumentArticleRelationshipListIndexViewModel.prototype.init = function (id) {
    var viewModel = this;
    viewModel.getId(id);
    return window.Main.ViewModels.ContactListViewModel.prototype.init.apply(viewModel, arguments)
        .then(function () {
            return window.Helper.User.getCurrentUser();
        }).then(function (currentUser) {
            viewModel.currentUser(currentUser);
        }).then(function () { return window.Helper.Lookup.getLocalizedArrayMaps(viewModel.lookups); });
};
namespace("Customer.Ramseier.ViewModels").ErpDocumentArticleRelationshipListIndexViewModel.prototype.applyFilters = function (query) {
    var viewModel = this;
    if (!!viewModel.filters["OrderNoKey"]) {
        if (viewModel.filters["OrderNoKey"]() != null) {
            query = query
                .filter(function (relationshipErpDocument) {
                    return relationshipErpDocument.ErpDocumentId === this.OrderNoKey;
                }, { OrderNoKey: viewModel.filters["OrderNoKey"]().Value });
            delete viewModel.filters["OrderNoKey"];
        }
    }
    if (!!viewModel.filters["QuoteNoKey"]) {
        if (viewModel.filters["QuoteNoKey"]() != null) {
            query = query
                .filter(function (relationshipErpDocument) {
                    return relationshipErpDocument.ErpDocumentId === this.QuoteNoKey;
                }, { QuoteNoKey: viewModel.filters["QuoteNoKey"]().Value });
            delete viewModel.filters["QuoteNoKey"];
     }
    }
    if (!!viewModel.filters["ArticleId"]) {
        if (viewModel.filters["ArticleId"]() != null) {
            query = query
                .filter(function (relationshipErpDocument) {
                    return relationshipErpDocument.ArticleId === this.articleId;
                }, { articleId: viewModel.filters["ArticleId"]().Value });
            delete viewModel.filters["ArticleId"];
        }
    }
    if (!viewModel.filters["QuoteNoKey"] && !viewModel.filters["OrderNoKey"] && !viewModel.filters["itemNo"]) {
        query = query.filter("it.ErpDocumentId == this.Id", { Id: viewModel.getId() });
    }
    query = window.Main.ViewModels.ContactListViewModel.prototype.applyFilters.call(viewModel, query);
    return query;
};
