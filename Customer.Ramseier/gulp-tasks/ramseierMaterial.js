const generateJsTask = require("../../../gulp-core/gulptaskCore").generateJsTask;

module.exports = function() {
    // Original location : .\Plugins\Customer.Ramseier
    let jsFiles = [
        "Content/js/ArticleListExtensionViewDocumentsModalViewModel.js",
				"Content/js/VisitListIndexViewModelExtension.js",
        "Content/js/TurnoverListIndexViewModel.js",
        "Content/js/CompanyDetailsTurnoverTabViewModelExtension.js",
        "Content/js/ErpDocumentListViewModelExtension.js",
        "Content/js/ErpDocumentArticleRelationshipListIndexViewModel.js",
        "Content/js/OfflineModel.js",
        "Content/js/CompanyDetailsViewModelExtension.js",
        "Content/js/CustomErpDocumentListIndexViewModel.js",
        "Content/js/Helper.ErpTurnover.js",
        "Content/js/VisitCreateViewModelExtension.js",
        "Content/js/VisitReportDetailsModalViewModelExtension.js",
        "Content/js/ViewModels/StatusEditModalViewModel.js",
        "Content/js/CustomArticlePartialDiscountListModalViewModel.js",
        "Content/Js/CustomErpDocumentListIndexViewModel.js", 
        "Content/Js/CustomErpDocumentDocumentsListModalViewModel.js",
        "Content/Js/CompanyDetailsDocumentsTabViewModelExtension.js",
        "Content/js/CompanyDetailsDiscountsTabViewModel.js",
        "Content/js/ErpDocumentsTabViewModelExtension.js",
        "Content/js/SalesOrderListIndexViewModelExtension.js",
        "Content/js/InvoiceListIndexViewModelExtension.js",
        "Content/js/CreditNoteListIndexViewModelExtension.js",
        "Content/js/QuoteListIndexViewModelExtension.js",
        "Content/js/DeliveryNoteListIndexViewModelExtension.js",
        "Content/js/BlanketOrderListIndexViewModelExtension.js",
        "Content/js/MasterContractListIndexViewModelExtension.js",
        "Content/js/TurnoverArticleGroupListIndexViewModel.js",
        "Content/js/ViewModels/DocumentAttributeListIndexViewModelExtension.js"

    ];

    generateJsTask(__filename, jsFiles);

};
