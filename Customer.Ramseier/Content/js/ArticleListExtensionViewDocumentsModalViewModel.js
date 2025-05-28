namespace("Customer.Ramseier.ViewModels").ArticleListExtensionViewDocumentsModalViewModel = function (parentViewModel) {
	var viewModel = this;
	viewModel.loading = window.ko.observable(true);
	viewModel.articleId = window.ko.observable(null);
	viewModel.attachmentCount = window.ko.observable(0);
	viewModel.lookups = parentViewModel.lookups;
	window.Main.ViewModels.DocumentAttributeListIndexViewModel.call(viewModel);
	viewModel.getFilter("ReferenceKey").extend({ filterOperator: "===" })(viewModel.articleId);
	viewModel.infiniteScroll(true);
};

namespace("Customer.Ramseier.ViewModels").ArticleListExtensionViewDocumentsModalViewModel.prototype = Object.create(window.Main.ViewModels.DocumentAttributeListIndexViewModel.prototype);

namespace("Customer.Ramseier.ViewModels").ArticleListExtensionViewDocumentsModalViewModel.prototype.init = function (id) {
	var viewModel = this;
	viewModel.articleId(id);
	return window.Main.ViewModels.DocumentAttributeListIndexViewModel.prototype.init.apply(viewModel, arguments);
};