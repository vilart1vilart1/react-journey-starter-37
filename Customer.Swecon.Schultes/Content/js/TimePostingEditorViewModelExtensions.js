; (function () {
    namespace("Crm.Service.ViewModels");
    var baseViewmodel = Crm.Service.ViewModels.DispatchTimePostingEditorViewModel;
    Crm.Service.ViewModels.DispatchTimePostingEditorViewModel = function () {
        var self = this;
        baseViewmodel.apply(this, arguments);
        self.ItemNoSelected = window.ko.observable();
    }
    Crm.Service.ViewModels.DispatchTimePostingEditorViewModel.prototype = baseViewmodel.prototype;
    Crm.Service.ViewModels.DispatchTimePostingEditorViewModel.prototype.init = function (routeValues) {
        var self = this;

        self.ItemNoSelected(routeValues.serviceItemNo);
        self.dispatch(routeValues.dispatch());
        var deferred = new $.Deferred();

        self.on("click", '.timeposting-user-selection .timeposting-user', function () {
            var context = window.ko.contextFor(this);
            self.selectUser(context.$data);
        });
        self.on("click", '.timeposting-selected-user', function () {
            self.clearUser();
        });

        var loadServiceOrderTimes = function (cb) {
            self.serviceOrderTimes.get({ OrderNo: self.dispatch().OrderNo() }).then(function () {
                cb();
            });
        };

        var getTimePostingUser = function (cb) {
            self.timePostingUser.get({ Id: self.timePosting().Username() }).then(function () {
                cb();
            });
        };

        var loadTimePostingItemNos = function (cb) {

            window.Crm.Offline.Database.CrmArticle_Article
                .filter(function (article) {
                    return article.ArticleTypeKey == this.articleType && article.ItemNo.contains(this.testString);
                }, {
                    articleType: 'Service', testString: self.ItemNoSelected().substring(0, 3)
                })
                .toArray(function (results) {
                    var services = $.map(results, function (result) { return result.asKoObservable(); });
                    services = $.grep(services, function (service) {
                        return self.hiddenItemNos().length == 0 || self.hiddenItemNos().indexOf(service.ItemNo()) == -1;
                    });
                    services = $.grep(services, function (service) {
                        return self.dispatch().StatusKey() != 'SignedByCustomer'
                            || self.dispatch().StatusKey() == 'SignedByCustomer'
                            && self.validTimePostingItemNosAfterCustomerSignature().length > 0
                            && self.validTimePostingItemNosAfterCustomerSignature().indexOf(service.ItemNo()) > -1;
                    });
                    self.services(services);
                }).pipe(function () {
                    return window.Crm.Offline.Database.CrmArticle_ArticleDescription
                        .filter(function (articleDescription) {
                            return articleDescription.Key in this.itemNos;
                        }, {
                            itemNos: $.map(self.services(), function (service) {
                                return service.ItemNo();
                            })
                        })
                        .toArray(
                        self.articleDescriptions);
                })
                .pipe(function () {
                    cb();
                });
        };

        var initEditor = function (cb) {
					window.ko.custom.initEditor(self, routeValues);
					self.ItemNoSelected(routeValues.serviceItemNo);

            if (routeValues.timePosting == null) {
                self.timePosting().Date(self.DateSelectListOptions()[0]);
            }

            self.timePosting().DispatchId(self.dispatch().Id());
            if (routeValues.timePosting) {
                cb();
                return;
            }
            var serviceOrderTime = window.ko.utils.unwrapObservable(routeValues.serviceOrderTime);
            self.timePosting().Id($data.createGuid().toString().toLowerCase());
            if (!!serviceOrderTime) {
                self.timePosting().ServiceOrderTimeId(serviceOrderTime.Id());
            }
            self.getLatestTimeEntryToOrDefault(self.currentUser().Id(), self.timePosting().Date()).then(function (latestTo) {
                self.timePosting().From(latestTo);
                self.timePosting().Username(self.currentUser().Id());
                self.timePosting().UserDisplayName(self.currentUser().DisplayName());
                cb();
            });
        };

        async.series([
            initEditor,
            loadTimePostingItemNos,
            getTimePostingUser,
            loadServiceOrderTimes
        ], function () {

            // todo: dropdown list does not refresh itself to show selected value. Thus force refresh by next line of code. Remove next line if you have an approprita fix.
            self.timePosting().ItemNo.valueHasMutated();
            self.timePosting().From.extend({
                validation: {
                    async: true,
                    validator: window.OverlappingTimeEntryValidator.bind(self.timePosting)
                }
            });
            self.timePosting().To.extend({
                validation: {
                    async: true,
                    validator: window.OverlappingTimeEntryValidator.bind(self.timePosting)
                }
            });
            deferred.resolve();
        });

        return deferred.promise();
    };


  
    window.Crm.Service.ViewModels.DispatchTimePostingEditorViewModel.prototype.remove = function () {
        var viewModel = this;

        var deferred = new $.Deferred();
        return viewModel.applyChanges().then(function () {
           
           
            viewModel.timePosting().ItemDescription(viewModel.getItemDescription(viewModel.timePosting().ItemNo()));
            window.database.remove(viewModel.timePosting());
         
            var DispatchTimePostingsOvertimes = [];
            return window.Crm.Offline.Database.CrmService_ServiceOrderTimePosting
                .filter(function (serviceOrderTimePosting) {
                    return serviceOrderTimePosting.Username === currentUserName &&
                        serviceOrderTimePosting.Date === date &&
                        serviceOrderTimePosting.From === TimeFrom &&
                        serviceOrderTimePosting.To === TimeTo &&
                        serviceOrderTimePosting.OrderNo === OrderNumber &&
                        serviceOrderTimePosting.IsActive === '1'
                        && (serviceOrderTimePosting.ExtensionValues.IsOvertime === 1)
                },
                {
                    date: viewModel.timePosting().Date(),
                    TimeFrom: viewModel.timePosting().From(),
                    TimeTo: viewModel.timePosting().To(),
                    currentUserName: viewModel.timePosting().Username(),
                    OrderNumber: viewModel.timePosting().OrderNo()
                })
                .toArray(function (results) {
                    if (results.length > 0) {
                        results.forEach(function (x) {
                            window.database.remove(x);

                        });


                        window.database.saveChanges().then(function () {
                            $.mobile.closeDialog(true);
                        });
                    }
                    else {
                        window.database.saveChanges().then(function () {
                            $.mobile.closeDialog(true);
                        });
                        return deferred.promise();
                    }

                });           
        });
    };


   window.Crm.Service.ViewModels.DispatchTimePostingEditorViewModel.prototype.clearUser = function () {
		var self = this;
		self.timePosting().Username('');
		self.timePosting().UserDisplayName('');
		self.userFilter('');
		self.timePosting().To.valueHasMutated();
	};

}());