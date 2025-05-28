(function () {
    var baseViewModel = window.Crm.ErpExtension.ViewModels.ErpDocumentsTabViewModel;
    window.Crm.ErpExtension.ViewModels.ErpDocumentsTabViewModel.prototype = baseViewModel.prototype;
    window.Crm.ErpExtension.ViewModels.ErpDocumentsTabViewModel.prototype.createDocumentViewModel = function (documentType) {
        var viewModel = this;
        var documentViewModel;
        if (documentType.table === 'CrmErpExtension_Quote') {
            documentViewModel =
                new window.Main.ViewModels.GenericListViewModel(documentType.table,
                    ["QuoteDate"],
                    ["DESC"]);
        } else if (documentType.table === 'CrmErpExtension_DeliveryNote') {
            documentViewModel =
                new window.Main.ViewModels.GenericListViewModel(documentType.table,
                    ["DeliveryNoteDate"],
                    ["DESC"]);
        } else if (documentType.table === 'CrmErpExtension_Invoice') {
            documentViewModel =
                new window.Main.ViewModels.GenericListViewModel(documentType.table,
                    ["InvoiceDate"],
                    ["DESC"]);
        } else if (documentType.table === 'CrmErpExtension_CreditNote') {
            documentViewModel =
                new window.Main.ViewModels.GenericListViewModel(documentType.table,
                    ["CreditNoteDate"],
                    ["DESC"]);
        } else if (documentType.table === 'CrmErpIntegrationProAlphaBase_DemoDeliveryNote') {
            documentViewModel =
                new window.Main.ViewModels.GenericListViewModel(documentType.table,
                    ["ModifyDate"],
                    ["DESC"]);
        } else {
            documentViewModel = new window.Main.ViewModels.GenericListViewModel(documentType.table, ["OrderConfirmationDate"], ["DESC"]);

        }
        documentViewModel.caption = window.ko.observable(window.Helper.String.getTranslatedString("Open" + documentType.model + "Caption"));
        documentViewModel.currencies = viewModel.currencies;
        documentViewModel.documentStatuses = viewModel.documentStatuses;
        documentViewModel.emptyStateText = window.ko.observable(window.Helper.String.getTranslatedString("Open" + documentType.model + "EmptyStateText"));
        documentViewModel.showAllLink = "#/" + documentType.plugin + "/" + documentType.model + "List/IndexTemplate?filters=" + encodeURIComponent(JSON.stringify({ ContactKey: { Operator: "==", Value: viewModel.contactId() } }));
        documentViewModel.showAllText = window.ko.observable(window.Helper.String.getTranslatedString("ShowAll" + documentType.model));
        documentViewModel.pageSize(10);
        documentViewModel.getFilter("StatusKey").extend({ filterOperator: "in" })(viewModel.displayedStatuses());

        if (viewModel.contactId()) {
            documentViewModel.getFilter("ContactKey").extend({ filterOperator: "==" })(viewModel.contactId());
        }
        else if (viewModel.pmProjectId()) {
            documentViewModel.getFilter("ExtensionValues.PmProjectKey").extend({ filterOperator: "==" })(viewModel.pmProjectId());
        }

        return documentViewModel;
    };

})();