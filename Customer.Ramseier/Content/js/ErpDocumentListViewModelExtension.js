;
(function () {
    var baseViewModel = window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel;
    window.Crm.ErpExtension.ViewModels.ErpDocumentListViewModel =
        function (entityType, orderBy, orderByDirection, joins = []) {
            var viewModel = this;

            baseViewModel.call(this, entityType, orderBy, orderByDirection, joins);
            viewModel.bookmarks.push({
                Category: window.Helper.String.getTranslatedString("Filter"),
                Name: window.Helper.String.getTranslatedString("All"),
                Key: "All",
                Expression: function (query) {
                    return query;
                }
            });
            viewModel.bookmarks.push({
                Category: window.Helper.String.getTranslatedString("Filter"),
                Name: window.Helper.String.getTranslatedString("IsComplained"),
                Key: "IsComplained",
                Expression: function (query) {
                    return query.filter("it.ExtensionValues.IsComplained === this.isComplained", { isComplained: true });
                }
            });
            viewModel.bookmarks.push({
                Category: window.Helper.String.getTranslatedString("Filter"),
                Name: window.Helper.String.getTranslatedString("IsNotComplained"),
                Key: "IsNotComplained",
                Expression: function (query) {
                    return query.filter("it.ExtensionValues.IsComplained === this.isComplained", { isComplained: false });
                }
            });
            viewModel.bookmarks.push({
                Category: window.Helper.String.getTranslatedString("Filter"),
                Name: window.Helper.String.getTranslatedString("LastWeek"),
                Key: "LastWeek",
                Expression: function (query) {

                    if (query.name == "CrmErpExtension_Quote")
                        query = query.filter("it.QuoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpExtension_SalesOrder")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpExtension_Invoice")
                        query = query.filter("it.InvoiceDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpExtension_DeliveryNote")
                        query = query.filter("it.DeliveryNoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpExtension_CreditNote")
                        query = query.filter("it.CreditNoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpExtension_MasterContract")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    if (query.name == "CrmErpIntegrationProAlphaBase_BlanketOrder")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 7, "days").toDate() });

                    return query;
                }
            });
            viewModel.bookmarks.push({
                Category: window.Helper.String.getTranslatedString("Filter"),
                Name: window.Helper.String.getTranslatedString("LastWorkingDay"),
                Key: "LastWorkingDay",
                Expression: function (query) {

                    if (query.name == "CrmErpExtension_Quote")
                        query = query.filter("it.QuoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpExtension_SalesOrder")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpExtension_Invoice")
                        query = query.filter("it.InvoiceDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpExtension_DeliveryNote")
                        query = query.filter("it.DeliveryNoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpExtension_CreditNote")
                        query = query.filter("it.CreditNoteDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpExtension_MasterContract")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    if (query.name == "CrmErpIntegrationProAlphaBase_BlanketOrder")
                        query = query.filter("it.OrderConfirmationDate >= this.min", { min: window.moment().utc().startOf("day").add(- 1, "days").toDate() });

                    return query;
                }
            });
        };

})();