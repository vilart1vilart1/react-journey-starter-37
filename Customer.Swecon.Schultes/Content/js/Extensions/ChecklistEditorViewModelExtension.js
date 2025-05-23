$(function () {
	var baseViewModel = namespace("Sms.Checklists.ViewModels").ChecklistChecklistEditorViewModel;
	namespace("Sms.Checklists.ViewModels").ChecklistChecklistEditorViewModel = function (routeValues) {
		baseViewModel.apply(this, arguments);
		var self = this;
		self.displayedChecklists = window.ko.observableArray([]);

		self.dynamicFormAutoCompleter = window.ko.custom.autoCompleter({
			source: window.Crm.Offline.Database.CrmDynamicForms_DynamicForm,

			filter: function (dynamicForm) {
				return (dynamicForm.CategoryKey === "Checklist" &&
					(this.filter === "" || dynamicForm.Title.toLowerCase().contains(this.filter)) &&
					dynamicForm.Id in this.displayedChecklists);


			},
			filterParameters: { displayedChecklists: self.displayedChecklists },
			condition: function () {

				return self.serviceOrderChecklist().DynamicFormKey() === 0;
			},
			displayedText: function (dynamicForm) {
				var text = dynamicForm.Title();
				return text;
			},
			onSelect: function (dynamicForm) {
				self.serviceOrderChecklist().DynamicFormKey(dynamicForm.Id());
				self.serviceOrderChecklist().DynamicFormTitle(dynamicForm.Title());
				self.serviceOrderChecklist().RequiredForServiceOrderCompletion(true);

				//Send the Checklist with the Report SendToCustomer = True
				if (dynamicForm.ExtensionValues().DynamicFormType() == "handover+admission") {
					self.serviceOrderChecklist().SendToCustomer(true);
				}

				if (dynamicForm.ExtensionValues().DynamicFormType() == "BGR500") {
					self.serviceOrderChecklist().SendToCustomer(true);
				}

				if (dynamicForm.ExtensionValues().DynamicFormType() == "MaintenanceChecklist") {
					self.serviceOrderChecklist().SendToCustomer(false);
				}

				self.serviceOrderChecklist()
					.Filename(dynamicForm.Title() + " - " + self.serviceOrder().OrderNo());
			},
			onClear: function () {
				self.serviceOrderChecklist().DynamicFormKey(0);
				self.serviceOrderChecklist().DynamicFormTitle(null);
				self.serviceOrderChecklist().Filename(null);
				self.serviceOrderChecklist().ReferenceType("ServiceOrderChecklist");
				self.serviceOrderChecklist().RequiredForServiceOrderCompletion(false);
				self.serviceOrderChecklist().SendToCustomer(false);
				self.dynamicFormAutoCompleter.search();
			}

		});
	};
	namespace("Sms.Checklists.ViewModels").ChecklistChecklistEditorViewModel.prototype = baseViewModel.prototype;

	var baseInit = namespace("Sms.Checklists.ViewModels").ChecklistChecklistEditorViewModel.prototype.init;
	namespace("Sms.Checklists.ViewModels").ChecklistChecklistEditorViewModel.prototype.init = function (routeValues) {
		var self = this;
	
		self.serviceOrderChecklists = routeValues.serviceOrderChecklists;

		//MaschinenKey
		var customInstallationTypeKey = routeValues.serviceOrder().Installation().InstallationTypeKey();

		



		return baseInit.apply(this, arguments).then(function () {


			//window.database.CustomerSweconSchultes_CustomChecklistInstallationTypeRelationship.filter(
			//		function (item) {
			//			return item.Description == "LOP22";
			//		},
			//		{ installationKey: customInstallationTypeKey })
			//	.toArray(function (item) {
			//		if (item.length > 0) {
			//			alert("found");
			//		}
			//	});

			var bgr500Key = parseInt(window.Customer.Swecon.Settings.Checklists.Bgr500ChecklistKey);
			var instructionChecklistKey = parseInt(window.Customer.Swecon.Settings.Checklists.HandoverSubmissionChecklistKey);

			return window.database.CustomerSweconSchultes_CustomChecklistInstallationTypeRelationship.filter(
					function(item) {
						return item.Description == installationKey;
					},
					{ installationKey: customInstallationTypeKey })
				.toArray(function(item) {
					if (item.length > 0) {
						item.forEach(function(x) {
							self.displayedChecklists.push(x.ChecklistId);
						});
					}
				}).then(function () {
					//Checklisten die immer da sind-----------


					self.displayedChecklists.push(bgr500Key);
					self.displayedChecklists.push(instructionChecklistKey);


					self.serviceOrderChecklists().forEach(function(x) {
						if (self.displayedChecklists().includes(x.DynamicFormKey())) {
							self.displayedChecklists().splice(x.DynamicFormKey(), 1);
							const index = self.displayedChecklists().indexOf(x.DynamicFormKey());
							if (index > -1) { // only splice array when item is found
								self.displayedChecklists().splice(index, 1); // 2nd parameter means remove one item only
							}
						}
					});
					//----------------------------------------

					return window.database.SmsChecklists_ServiceOrderChecklist.filter(function (checklist) {
						return checklist.DynamicForm.ExtensionValues.DynamicFormType === this.dynamicFormType &&
							checklist.ReferenceKey === this.serviceOrderId
					}, {
						dynamicFormType: window.Customer.Swecon.Settings.Checklists.PictureProofChecklistDynamicFormType,
						dispatchId: self.dispatch().Id()
					}).toArray()
				})
				.then(function (checklistResult) {
					var proofPictureChecklistExists = !!checklistResult[0]
					if (proofPictureChecklistExists) {
						self.dynamicFormAutoCompleter.page.valueHasMutated();
						return
					}
					return window.Crm.Offline.Database.CrmDynamicForms_DynamicForm.filter(function (checklist) {
						return checklist.ExtensionValues.DynamicFormType === this.dynamicFormType
					}, {
						dynamicFormType: window.Customer.Swecon.Settings.Checklists.PictureProofChecklistDynamicFormType
					}).toArray();
				})
				.then(function (dynamicFormResult) {
					if (!dynamicFormResult) {
						self.dynamicFormAutoCompleter.page.valueHasMutated();
						return
					}
					var proofPictureDynamicFormId = dynamicFormResult[0].Id
					self.displayedChecklists.push(proofPictureDynamicFormId);
					self.dynamicFormAutoCompleter.page.valueHasMutated();
				});


		});
	};
});
