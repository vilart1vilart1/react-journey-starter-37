namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel = function () {
    var viewModel = this;
    viewModel.loading = window.ko.observable(true);
    viewModel.Documents = window.ko.observableArray([]);
    viewModel.lookups = {
        documentCategories: {}
    };
    window.Main.ViewModels.GenericListViewModel.call(viewModel,
		"Main_DocumentAttribute",
		"FileResource.CreateDate",
		"DESC",
		["FileResource"]);
    window.Main.ViewModels.ViewModelBase.apply(viewModel, arguments);
};
namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel.prototype = Object.create(window.Main.ViewModels.ViewModelBase.prototype);

namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel.prototype.init = function (ErpDocumentId) {
    var viewModel = this;
    var d = $.Deferred();
    var promDocuments = [];
    window.Helper.Lookup.getLocalizedArrayMap("Main_DocumentCategory").then(function (lookup) {
        viewModel.lookups.documentCategories = lookup;
    });

    window.database.Main_DocumentAttribute.filter(function (r) { return r.ExtensionValues.ErpDocumentKey === this.Id; }, { Id: ErpDocumentId })
        .forEach(function (documentAttribute) {
            if (documentAttribute.FileResourceKey) {
                window.database.Main_FileResource.find(documentAttribute.FileResourceKey).then(function (file) {
                    documentAttribute.FileResource=file.asKoObservable();
                });
            }
           
            promDocuments.push(documentAttribute);
        }).then(function () {
            Promise.allSettled(promDocuments).then(function (documents) {
                documents.forEach(function (document) {
                    viewModel.Documents().push(document.value.asKoObservable());
                });
                d.resolve();
            });
        });
    return d.promise();
};

namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel.prototype.getAvatarColor =
    function (documentAttribute) {
        return "bgm-blue";
    };

namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel.prototype.getAbbreviation =
    function (documentAttribute) {
        return documentAttribute.FileName().substring(documentAttribute.FileName().lastIndexOf(".") + 1);
    };
namespace("Customer.Ramseier.ViewModels").CustomErpDocumentDocumentsListModalViewModel.prototype.get = function (fileResource) {
    $.ajax({
        type: 'GET',
        url: window.open(window.Helper.resolveUrl("~/Customer.Ramseier/Head/GetDocument/") + fileResource.Id(),
            '_blank', 'location=no,closebuttoncaption=' + window.Helper.String.getTranslatedString('Close'))
    });
};


