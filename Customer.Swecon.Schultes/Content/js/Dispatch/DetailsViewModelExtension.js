/// <reference path="DetailsViewModel.js" />
namespace("Crm.Service.ViewModels").DispatchDetailsViewModel = function () {
	var self = this;
	self.timeLogger = new window.TimeLogger("DispatchDetailsViewModel", this);

	self.additionalDataLoaders = window.ko.observableArray();
	self.isLoadingAdditionalData = window.ko.pureComputed(function () {
		return self.additionalDataLoaders().some(function (x) {
			return x.state() !== "resolved";
		});
	});

	// observables
	self.dispatchId = window.ko.observable();
	self.validTimePostingItemNosAfterCustomerSignature = window.ko.observableArray(_.compact(window.Crm.Service.Settings.ServiceOrderTimePosting.ValidItemNosAfterCustomerSignature.split(',')));
	self.maintenanceOrderGenerationMode = window.ko.observable(window.Crm.Service.Settings.ServiceContract.MaintenanceOrderGenerationMode);

	// observables with data binding
	self.dispatch = window.Crm.Service.OfflineModel.Dispatch();
	self.serviceOrder = window.Crm.Service.OfflineModel.ServiceOrderHead();
	self.company = window.Crm.OfflineModel.Company();
	self.payer = window.Crm.OfflineModel.Company();
	self.invoiceRecipient = window.Crm.OfflineModel.Company();
	self.initiator = window.Crm.OfflineModel.Company();
	self.initiatorAddress = window.ko.observable(null);
	self.initiatorPerson = window.Crm.OfflineModel.Person();
	self.serviceObject = window.Crm.Service.OfflineModel.ServiceObject();
	self.serviceObjectAddress = window.ko.observable(null);
	self.installation = window.ko.observable(null);
	self.installationAddress = window.ko.observable(null);
	self.installations = window.Crm.Service.OfflineModel.Installations();
	self.serviceOrderTimes = window.Crm.Service.OfflineModel.ServiceOrderTimes();
	self.materials = window.Crm.Service.OfflineModel.ServiceOrderMaterials();
	self.timePostings = window.Crm.Service.OfflineModel.ServiceOrderTimePostings();
	self.quantityUnits = window.Crm.Article.OfflineModel.QuantityUnits();
	self.user = window.Crm.OfflineModel.User();
	self.notes = window.Crm.OfflineModel.Notes();
	self.documentAttributes = window.Crm.OfflineModel.DocumentAttributes();
	self.detailedNotes = window.ko.observableArray([]);
	self.detailedDocumentAttributes = window.ko.observableArray([]);

	self.showInstallations = window.ko.observable(false);
	self.renderingInstallations = window.ko.observable(false);
	self.triggerInstallationsDisplay = function (_, event) {
		var show = event.currentTarget.classList.contains('ui-collapsible-heading-collapsed');
		self.renderingInstallations(true);
		setTimeout(function () {
			self.showInstallations(show);
			self.renderingInstallations(false);
		});
		return true;
	};

	// computed observables
	self.displayedMaterials = window.ko.computed(function () {
		return window.ko.utils
			.arrayFilter(self.materials(), function (item) {
				return item.DispatchId() == self.dispatchId() || item.EstimatedQty() > 0;
			})
			.sort(function (a, b) {
				return a.PosNo() - b.PosNo();
			});
	});
	self.displayedMaterialsWithoutJob = window.ko.computed(function () {
		//displayedMaterialsWithoutJob is obsolete, please use displayedMaterials in OrderPerInstallation
		return self.displayedMaterials();
	});
	self.displayedTimePostings = window.ko.computed(function () {
		return self.timePostings().sort(function (l, r) {
			if (l.Date() > r.Date()) {
				return 1;
			}
			if (l.Date() < r.Date()) {
				return -1;
			}
			if (l.Username() > r.Username()) {
				return 1;
			}
			if (l.Username() < r.Username()) {
				return -1;
			}
			if (l.From() > r.From()) {
				return 1;
			}
			if (l.From() < r.From()) {
				return -1;
			}
			return 0;
		});
	}).distinct('Date').distinct('Username');
	self.displayedTimePostingsWithoutJob = window.ko.computed(function () {
		//displayedTimePostingsWithoutJob is obsolete, please use displayedTimePostings in OrderPerInstallation
		return self.displayedTimePostings();
	});
	self.dispatchIsEditable = window.ko.computed(function () {
		if (!self.dispatch() || !self.dispatch().StatusKey()) {
			return false;
		}
		var editable = true;
		window.Crm.Service.Helper.DispatchStatusEvaluators.forEach(function (evaluator) { editable = editable && evaluator(self.dispatch()); });
		return editable;
	});
	self.dispatchIsCompletable = window.ko.computed(function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() || self.dispatch().StatusKey() === "SignedByCustomer";
	});
	self.dispatchIsClosed = window.ko.computed(function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatch().StatusKey() === "ClosedNotComplete"
			|| self.dispatch().StatusKey() === "ClosedComplete";
	});
	self.dispatchIsRejected = window.ko.computed(function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatch().StatusKey() === "Rejected";
	});
  self.splittedOrderNo = window.ko.computed(function () {
    if (!self.dispatch() || !self.dispatch().OrderNo()) {
      return [];
    }
  });
	self.timePostingsCanBeAdded = window.ko.computed(function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() || (self.dispatch().StatusKey() == 'SignedByCustomer' && self.validTimePostingItemNosAfterCustomerSignature().length > 0);
	});
	self.timesCanBeAdded = window.ko.computed(function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() && self.maintenanceOrderGenerationMode() == 'JobPerInstallation';
	});
	self.timePostingCanBeEdited = function (timePosting) {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() || (self.dispatch().StatusKey() == 'SignedByCustomer' && self.validTimePostingItemNosAfterCustomerSignature().indexOf(timePosting.ItemNo()) > -1);
	};
	self.installationDetailsCanBeEdited = function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() || self.dispatch().StatusKey() === "SignedByCustomer";
	};
	self.notesCanBeEdited = function () {
		if (!self.dispatch()) {
			return false;
		}
		return self.dispatchIsEditable() || (self.dispatch().StatusKey() === "SignedByCustomer");
	};
	self.totalEstimatedDuration = window.ko.computed(function () {
		var serviceOrderTimesWithEstimatedDuration = $.grep(self.serviceOrderTimes(), function (serviceOrderTime) {
			return serviceOrderTime.EstimatedDuration() != null;
		});
		if (serviceOrderTimesWithEstimatedDuration.length == 0) {
			return null;
		}
		var estimatedDurations = $.map(serviceOrderTimesWithEstimatedDuration, function (serviceOrderTime) {
			return serviceOrderTime.EstimatedDuration();
		});
		var totalEstimatedDuration = _.reduce(estimatedDurations, function (a, b) { return a + b; }, 0);
		return window.moment().startOf("day").add(totalEstimatedDuration, "h").toDate();
	});
	self.currentUserAgent = function () {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
			return 'iOS';
		} else if (userAgent.match(/Android/i)) {
			return 'Android';
		} else if (navigator.userAgent.match(/Windows/i)) {
			return 'Windows';
		} else {
			return 'unknown';
		}
	};
	self.toggleInspection = function(){
		window.database.attachOrGet(self.dispatch());
		self.dispatch().ExtensionValues().IsInspection(!self.dispatch().ExtensionValues().IsInspection());
		window.database.saveChanges();
	}
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype = new Crm.ViewModels.DefaultViewModel();
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.init = function (routeValues) {
	var self = this;

	self.additionalDataLoaders([]);
	self.timeLogger.log("init");
	var deferred = new $.Deferred();
	self.on("click", '.work-on-order', function () {
		self.loading(true);
		var setDispatchInProgress = function () {
			if (self.dispatch().RejectReasonKey()) {
				self.dispatch().RejectReasonKey(null);
			}
			self.dispatch().StatusKey("InProgress");
			self.dispatch.save().then(function () {
				self.loading(false);
			});
		};
		if (window.Crm.Service.Settings.ServiceOrderDispatch.ReadGeolocationOnDispatchStart) {
			// prefer gps locations to cell tower locations and don't allow cached locations
			var positionOptions = { enableHighAccuracy: true, maximumAge: 0 };
			navigator.geolocation.getCurrentPosition(function (position) {
				var latitude = position.coords.latitude;
				var longitude = position.coords.longitude;
				window.Log.info("getting current position via geolocation api success: [Lo:" + longitude + "; La:" + latitude + "]");
				self.user.get({ Id: self.currentUser().Id() }).then(function () {
					self.user().Latitude(latitude);
					self.user().Longitude(longitude);
					self.user().LastStatusUpdate(new Date());
					self.user.save().then(function () {
						self.dispatch().Latitude(latitude);
						self.dispatch().Longitude(longitude);
						setDispatchInProgress();
					});
				});
			}, function (error) {
				window.Log.warn("getting current position via geolocation api failed, error: " + error.message);
				setDispatchInProgress();
			}, positionOptions);
		} else {
			setDispatchInProgress();
		}
	});

	var dispatchId = window.ko.utils.unwrapObservable(routeValues.dispatch).Id();
	self.dispatchId(dispatchId);
	self.quantityUnits.get({ Language: self.currentUser().DefaultLanguageKey() }).then(function () {
		self.timeLogger.log("init finished");
		deferred.resolve();
	});
	return deferred.promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.refresh = function (routeValues) {
	var self = this;
	self.timeLogger.log("refresh");
	var decreaseApplicationBadge = function () {
		self.timeLogger.log("refresh.decreaseApplicationBadge");
		var badgeDeferred = new $.Deferred();
		if (!!window.plugins &&
			!!window.plugins.pushNotification &&
			!!window.plugins.pushNotification.getApplicationIconBadgeNumber &&
			!!window.plugins.pushNotification.setApplicationIconBadgeNumber) {
			window.plugins.pushNotification.getApplicationIconBadgeNumber(function (badgeNumber) {
				window.plugins.pushNotification.setApplicationIconBadgeNumber(badgeNumber - 1,
					function (status) {
						badgeDeferred.resolve();
					});
			});
		} else {
			badgeDeferred.resolve();
		}
		return badgeDeferred.promise();
	};
	var markDispatchAsRead = function () {
		self.timeLogger.log("refresh.markDispatchAsRead");
		if (self.dispatch().StatusKey() == 'Released') {
			self.dispatch().StatusKey('Read');
			self.dispatch.save().then(function () {
				return decreaseApplicationBadge();
			});
		}
		return new $.Deferred().resolve().promise();
	};
	return self.reloadDispatch(routeValues)
		.then(markDispatchAsRead)
		.then(function () {
			$.mobile.activePage.addClass('ui-page-footer-fixed');
			self.timeLogger.log("refresh finished");
		});
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.isDispatchLoadedCompletely = function (dispatch) {
	var entity = window.Helper.Database.getDatabaseEntity(dispatch);
	return entity.ServiceOrderTimePostings && entity.ServiceOrder;
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.getSingleCompanyStandardAddress = function (addresses) {
	var filteredAddresses = (addresses || []).filter(function (a) { return a.IsCompanyStandardAddress === true; });
	if (filteredAddresses.length !== 1) {
		var msg = "no unique standard address found";
		window.Log.error(msg);
		throw msg;
	}
	return filteredAddresses[0];
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.reloadDispatch = function (routeValues) {
	var self = this;
	var dispatchId = window.ko.unwrap(self.dispatchId);
	var deferred = null;
	if (routeValues && routeValues.dispatch && self.isDispatchLoadedCompletely(routeValues.dispatch)) {
		deferred = new $.Deferred().resolve(window.Helper.Database.getDatabaseEntity(routeValues.dispatch)).promise();
		deferred = new $.Deferred().resolve(dispatch).promise();
	}
	if (!deferred) {
		var query = self.getDispatchQuery();
		query = self.dispatchFilter(query);
		deferred = query.find(dispatchId);
	}

	var finishLoadingWhenEntityDeleted = function (translationKey) {
		alert(window.Helper.String.getTranslatedString(translationKey));
		$.mobile.changePage(window.Helper.Url.resolveUrl('~/Crm.Service/Dispatch/Index'));
	};

	return deferred.then(function (dispatch) {
		self.timeLogger.log("reloadDispatch dispatch query finished");

		self.dispatch(dispatch.asKoObservable());

		if (self.dispatch().ExtensionValues().IncidentalMaterialSet() === false) {
			self.dispatch().ExtensionValues().IncidentalMaterial(true);
			self.dispatch().ExtensionValues().IncidentalMaterialSet(1);
			self.dispatch.save();
		}

		if (!dispatch.ServiceOrder) {
			finishLoadingWhenEntityDeleted('ServiceOrderDeletedMessage');
			return this.promise();
		}
		self.serviceOrder(dispatch.ServiceOrder.asKoObservable());
		if (dispatch.ServiceOrder.Installation) {
			self.installation(dispatch.ServiceOrder.Installation.asKoObservable());
			if (dispatch.ServiceOrder.Installation.Address) {
				self.installationAddress(dispatch.ServiceOrder.Installation.Address.asKoObservable());
			}
		}
		if (dispatch.ServiceOrder.ServiceObject) {
			self.serviceObject(dispatch.ServiceOrder.ServiceObject.asKoObservable());
			var serviceObjectAddress = self.getSingleCompanyStandardAddress(dispatch.ServiceOrder.ServiceObject.Addresses);
			self.serviceObjectAddress(serviceObjectAddress.asKoObservable());
		}
		if (dispatch.ServiceOrder.Initiator) {
			self.initiator(dispatch.ServiceOrder.Initiator.asKoObservable());
			var initiatorAddress = self.getSingleCompanyStandardAddress(dispatch.ServiceOrder.Initiator.Addresses);
			self.initiatorAddress(initiatorAddress.asKoObservable());
		}
		if (dispatch.ServiceOrder.InitiatorPerson) {
			self.initiatorPerson(dispatch.ServiceOrder.InitiatorPerson.asKoObservable());
		}
		if (dispatch.ServiceOrder.Payer) {
			self.payer(dispatch.ServiceOrder.Payer.asKoObservable());
		}
		if (dispatch.ServiceOrder.InvoiceRecipient) {
			self.invoiceRecipient(dispatch.ServiceOrder.InvoiceRecipient.asKoObservable());
		}
		var company = null;
		if (dispatch.ServiceOrder.Installation && dispatch.ServiceOrder.Installation.Company) {
			company = dispatch.ServiceOrder.Installation.Company;
		} else if (dispatch.ServiceOrder.Company) {
			company = dispatch.ServiceOrder.Company;
		}
		if (company) {
			self.company(company.asKoObservable());
		}
		self.timeLogger.log("reloadDispatch init observables finished");
		return dispatch;
	})
		.then(function () {
			return self.loadTimePostings();
		}).then(function () {
			return self.loadServiceOrderTimes();
		}).then(function () {
			return self.loadServiceOrderMaterial();
		}).then(function () {
			return self.loadNotes();
		}).then(function () {
			return self.loadDocumentAttributes();
		}).fail(function (e) {
			window.Log.warn("Error occured in DispatchDetailsViewModel during loading a dispatch with Id: " + dispatchId + " | " + e.message);
			finishLoadingWhenEntityDeleted('ServiceOrderDispatchDeletedMessage');
		});
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.loadServiceOrderTimes = function () {
	var self = this;
	var installations = [];
	var serviceOrderTimes = [];
	self.timeLogger.log("reloadDispatch CrmService_ServiceOrderTime");
	var promise = window.database.CrmService_ServiceOrderTime
		.include("Installation")
		.filter("it.OrderNo === this.orderNo", { orderNo: window.ko.unwrap(self.serviceOrder().OrderNo) })
		.orderBy("it.PosNo")
		.forEach(function (sot) {
			if (sot.Installation) {
				var existingInstallationNos = installations.map(function (i) { return i.InstallationNo(); });
				if (existingInstallationNos.length === 0 || existingInstallationNos.indexOf(sot.Installation.InstallationNo) === -1) {
					installations.push(sot.Installation.asKoObservable());
				}
			}
			serviceOrderTimes.push(sot.asKoObservable());
		}).then(function () {
			self.serviceOrderTimes(serviceOrderTimes);
			self.installations(installations);
			self.timeLogger.log("reloadDispatch CrmService_ServiceOrderTime finished");
		}).then(function () {
			self.additionalDataLoaders.remove(promise);
		});
	self.additionalDataLoaders.push(promise);
	if (window.Crm.Service.Settings.DispatchDetailsViewModel.InitWaitForTimes) {
		return promise;
	}
	return new $.Deferred().resolve().promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.loadServiceOrderMaterial = function () {
	var self = this;
	self.timeLogger.log("reloadDispatch CrmService_ServiceOrderMaterial");
	var promise = window.database.CrmService_ServiceOrderMaterial
		.filter("it.OrderNo === this.orderNo", { orderNo: window.ko.unwrap(self.serviceOrder().OrderNo) })
		.toArray(function (result) {
			self.materials(result.map(function (x) { return x.asKoObservable(); }));
			self.additionalDataLoaders.remove(promise);
			self.timeLogger.log("reloadDispatch CrmService_ServiceOrderMaterial finished");
		});
	self.additionalDataLoaders.push(promise);
	if (window.Crm.Service.Settings.DispatchDetailsViewModel.InitWaitForMaterial) {
		return promise;
	}
	return new $.Deferred().resolve().promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.loadTimePostings = function () {
	var self = this;
	self.timeLogger.log("reloadDispatch CrmService_ServiceOrderTimePosting");
	var promise = window.database.CrmService_ServiceOrderTimePosting
		.filter("it.DispatchId === this.dispatchId", { dispatchId: window.ko.unwrap(self.dispatch().Id) })
		.toArray(function (result) {
			self.timePostings(result.map(function (x) { return x.asKoObservable(); }));
			self.additionalDataLoaders.remove(promise);
			self.timeLogger.log("reloadDispatch CrmService_ServiceOrderTimePosting finished");
		});
	self.additionalDataLoaders.push(promise);
	if (window.Crm.Service.Settings.DispatchDetailsViewModel.InitWaitForTimePostings) {
		return promise;
	}
	return new $.Deferred().resolve().promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.loadDocumentAttributes = function () {
	var documentAttributes = [];
	var detailedDocumentAttributes = [];
	var self = this;
	self.timeLogger.log("reloadDispatch Main_DocumentAttribute");
	var promise = window.database.Main_DocumentAttribute
		.include("File")
		.filter("it.ReferenceKey === this.orderId", { orderId: window.ko.unwrap(self.serviceOrder().Id) })
		.forEach(function (x) {
			var documentAttribute = x.asKoObservable();
			documentAttributes.push(documentAttribute);
			detailedDocumentAttributes.push({
				documentAttribute: documentAttribute,
				fileResource: x.File.asKoObservable()
			});
		}).then(function () {
			self.documentAttributes(documentAttributes);
			self.detailedDocumentAttributes(detailedDocumentAttributes);
			self.additionalDataLoaders.remove(promise);
			self.timeLogger.log("reloadDispatch Main_DocumentAttribute finished");
		});
	self.additionalDataLoaders.push(promise);
	if (window.Crm.Service.Settings.DispatchDetailsViewModel.InitWaitForDocumentAttributes) {
		return promise;
	}
	return new $.Deferred().resolve().promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.loadNotes = function () {
	var self = this;
	var noteContactIds = [self.serviceOrder().Id()];
	if (self.serviceOrder().ServiceCaseKey()) {
		noteContactIds.push(self.serviceOrder().ServiceCaseKey());
	}
	self.timeLogger.log("reloadDispatch Main_Note");
	var promise = window.Crm.Offline.Database.Main_Note
		.filter(function (note) {
			return (note.ContactId in this.noteContactIds || note.ExtensionValues.DispatchId === this.dispatchId);
		}, { noteContactIds: noteContactIds, dispatchId: window.ko.unwrap(self.dispatchId) })
		.include("Files")
		.include("Links")
		.include("User")
		.orderByDescending("it.CreateDate")
		.orderByDescending("it.Files.CreateDate")
		.orderByDescending("it.Links.CreateDate")
		.toArray(function (results) {
			var notes = [];
			var detailedNotes = [];
			results.forEach(function (result) {
				var note = result.asKoObservable();
				notes.push(note);
				detailedNotes.push({
					note: note,
					fileResources: result.Files.map(function (file) { return file.asKoObservable(); })
				});
			});
			self.notes(notes);
			self.detailedNotes(detailedNotes);
			self.additionalDataLoaders.remove(promise);
			self.timeLogger.log("reloadDispatch Main_Note finished");
		});
	self.additionalDataLoaders.push(promise);
	if (window.Crm.Service.Settings.DispatchDetailsViewModel.InitWaitForNotes) {
		return promise;
	}
	return new $.Deferred().resolve().promise();
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.getDispatchQuery = function () {
	return window.database.CrmService_ServiceOrderDispatch
		.include("ServiceOrder.Installation.Address")
		.include("ServiceOrder.Installation.Company")
		.include("ServiceOrder.ServiceObject.Addresses")
		.include("ServiceOrder.Initiator.Addresses")
		.include("ServiceOrder.InitiatorPerson")
		.include("ServiceOrder.Payer")
		.include("ServiceOrder.InvoiceRecipient")
		.include("ServiceOrder.Company");
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.dispatchFilter = function (query) {
	return query;
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.dispose = function () {
	var self = this;
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.base64toBlob = function (base64Data, contentType) {
	return window.Helper.String.base64toBlob(base64Data, contentType);
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.getObjectUrl = function (fileResource) {
	var self = this;
	if (!$.isFunction(fileResource.Content)) {
		alert(window.Helper.String.getTranslatedString("CannotOpenFile"));
		return false;
	}


	var blob = self.base64toBlob(fileResource.Content(), fileResource.ContentType());
	return window.URL.createObjectURL(blob);
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.openOfflinePictureViewer = function (fileResource) {
	if (!$.isFunction(fileResource.Content)) {
		alert(window.Helper.String.getTranslatedString("CannotOpenFile"));
		return false;
	}

	$.get(window.Helper.Url.resolveUrl("~/Crm.Service/Dispatch/OfflinePictureViewer")).then(function (html) {
		var base64Html = "data:text/html," + encodeURIComponent(html);
		var inAppBrowserRef = window.open(base64Html, "_blank", "location=no,top=20,closebuttoncaption=" + window.Helper.String.getTranslatedString("Close"));
		inAppBrowserRef.addEventListener("loadstop", function (event) {
			var base64ImageType = fileResource.ContentType();
			var base64ImageData = fileResource.Content();
			var base64ImageName = fileResource.Filename();
			inAppBrowserRef.executeScript({ code: "document.getElementById('offlineImage').setAttribute('src', 'data:" + base64ImageType + ";base64," + base64ImageData + "');" });
			inAppBrowserRef.executeScript({ code: "document.getElementById('offlineImage').setAttribute('alt', '" + base64ImageName + "');" });
		});
	});
	return false;
};
Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.getFileSize = function (length) {
	var fileSizeText;
	if (length < 1024) {
		fileSizeText = Number(length / 1024).toFixed(1) + ' Byte';
	} else if (length < 1048576) {
		fileSizeText = Number(length / 1024).toFixed(1) + ' kB';
	} else {
		fileSizeText = Number(length / 1048576).toFixed(1) + ' mB';
	}
	return fileSizeText;
};