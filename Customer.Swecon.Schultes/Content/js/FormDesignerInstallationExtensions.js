/// <reference path="../../../../Content/js/system/knockout-3.4.0.js" />
/// <reference path="../../../../Content/js/knockout.wrap.js" />
/// <reference path="../../../../Content/js/system/jquery-1.11.3.js" />
/// <reference path="../../../../Content/js/helper/Helper.DOM.js" />
/// <reference path="../../../../Content/js/helper/Helper.Url.js" />

$(function () {
	var viewModel = {
		formId: window.ko.observable(),
		relationships: window.ko.observableArray([])
	};
	viewModel.sortedRelationships = window.ko.computed(function () {
		return viewModel.relationships().sort(function (a, b) {
			var aCustomInstallationType = (!!a.CustomInstallationType.Value ? a.CustomInstallationType.Value() : a.InstallationTypeKey()).toLowerCase();
			var bCustomInstallationType = (!!b.CustomInstallationType.Value ? b.CustomInstallationType.Value() : b.InstallationTypeKey()).toLowerCase();
			if (aCustomInstallationType > bCustomInstallationType) {
				return 1;
			}
			if (aCustomInstallationType < bCustomInstallationType) {
				return -1;
			}
			return 0;
		});
	});


	$(document).on('click', 'a[href=#checklistInstallationTypeRelationshipCustom]', function () {
		var $checklistInstallationTypeRelationshipCustom = $('#checklistInstallationTypeRelationshipCustom');
		window.Helper.DOM.blockElement($checklistInstallationTypeRelationshipCustom);
		var form = window.ko.contextFor(this).$data;
		var formId = form.Id();
		$.ajax({
			url: window.Helper.Url.resolveUrl("~/Customer.Swecon.Schultes/CustomChecklistInstallationTypeRelationshipRest/GetRelationships/" + formId),
			dataType: "json",
			data: { format: "json" },
			success: function (data) {
				$.get(window.Helper.Url.resolveUrl("~/Customer.Swecon.Schultes/CustomChecklistInstallationTypeRelationship/RelationshipEditor"))
					.done(function (relationshipEditor) {
						viewModel.formId(formId);
						viewModel.relationships(window.ko.wrap.fromJS(data)());
						var relationshipEditorContainer = $('.entry', $checklistInstallationTypeRelationshipCustom).detach().clone();
						relationshipEditorContainer.html(relationshipEditor);
						window.ko.applyBindings(viewModel, relationshipEditorContainer.get(0));
						$('.box', $checklistInstallationTypeRelationshipCustom).append(relationshipEditorContainer);
						window.Helper.DOM.blockElement($checklistInstallationTypeRelationshipCustom, true);
					});
			}
		});
	});



	$(document).on('click', '.remove-checklist-custom-installationtype-relationship', function (e) {
		e.preventDefault();
		var $checklistInstallationTypeRelationship = $('#checklistInstallationTypeRelationshipCustom');
		window.Helper.DOM.blockElement($checklistInstallationTypeRelationship);
		if (!confirm(window.Helper.String.getTranslatedString('ConfirmDelete'))) {
			window.Helper.DOM.blockElement($checklistInstallationTypeRelationship, true);
			return false;
		}
		var context = window.ko.contextFor(this);
		var relationships = context.$parent.relationships;
		var relationship = context.$data;
		$.post(window.Helper.Url.resolveUrl("~/Customer.Swecon.Schultes/CustomChecklistInstallationTypeRelationshipRest/Delete/" + relationship.Id()))
			.then(function() {
				relationships.remove(relationship);
				window.Helper.DOM.blockElement($checklistInstallationTypeRelationship, true);
			});
		return false;
	});
	$(document).on('click', '#checklistInstallationTypeRelationshipCustom .submit', function (e) {
		e.preventDefault();
		var $checklistInstallationTypeRelationship = $('#checklistInstallationTypeRelationshipCustom');
		
		if ($("#selectedCustomInstallationTypeId").val() == null || $("#selectedCustomInstallationTypeId").val() == "") {
			return null;
		}
		var relationship = {
			Id: 0,
			ChecklistId: viewModel.formId(),
			InstallationTypeKey: $('#selectedCustomInstallationTypeId').val(),
			Description: $("#selectedCustomInstallationTypeId option:selected").text(),
			RequiredForServiceOrderCompletion: $('#RequiredForServiceOrderCompletion').attr('checked') == 'checked',
			SendToCustomer: $('#SendToCustomer').attr('checked') == 'checked'
		};
		$("#selectedCustomInstallationTypeId").text("");
		window.Helper.DOM.blockElement($checklistInstallationTypeRelationship);
		if (_.any(viewModel.relationships(), function(existingRelationship) {
			 return existingRelationship.InstallationTypeKey() == relationship.InstallationTypeKey;
		})) {
			alert(window.Helper.String.getTranslatedString('ChecklistInstallationTypeRelationshipAlreadyExists'));
			window.Helper.DOM.blockElement($checklistInstallationTypeRelationship, true);
			return false;
		}
		$.ajax({
			type: "POST",
			url: window.Helper.Url.resolveUrl("~/Customer.Swecon.Schultes/CustomChecklistInstallationTypeRelationshipRest/Save?format=json"),
			dataType: "json",
			data: relationship,
			success: function(result) {
				viewModel.relationships.push(window.ko.wrap.fromJS(result));
				window.Helper.DOM.blockElement($checklistInstallationTypeRelationship, true);
			}
		});
		return false;
	});
	$(document).on('change', '#checklistInstallationTypeRelationshipCustom #checklist-custom-installationtype-relationship-table input[type=checkbox]', function (e) {
		
		var $checklistInstallationTypeRelationship = $('#checklistInstallationTypeRelationshipCustom');
		window.Helper.DOM.blockElement($checklistInstallationTypeRelationship);
		var relationship = window.ko.contextFor(this).$data;
		setTimeout(function() {
			$.ajax({
				type: "POST",
				url: window.Helper.Url.resolveUrl("~/Customer.Swecon.Schultes/CustomChecklistInstallationTypeRelationshipRest/Save?format=json"),
				dataType: "json",
				data: relationship,
				success: function () {
					window.Helper.DOM.blockElement($checklistInstallationTypeRelationship, true);
				}
			});
		}, 10);
	});
});