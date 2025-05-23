<%@	Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Customer.Swecon.Schultes.ViewModels.CustomChecklistInstallationTypeRelationshipViewModel>" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Customer.Swecon.Schultes.Model" %>
<%= Html.HiddenTranslation("ChecklistInstallationTypeRelationshipAlreadyExists") %>
<%= Html.HiddenTranslation("ConfirmDelete") %>

<script src="../../../../Content/js/select2/select2.js"></script>
<script src="../../../../Content/js/select2/select2.min.js"></script>
<script src="../../../../Content/js/select2/select2crm.js"></script>
<form>
	<div class="row">
		<div class="col-md-12">
			<div class="form-group">
				<label class="field" for="DispatchedUser">
					<%= Html.Localize("InstallationTypeCustom") %>
					<%= Html.UserAutoCompleter("selectedCustomInstallationTypeId", Model.Item.CustomInstallationType?.Description,
						    url: Url.Action(nameof(Customer.Swecon.Schultes.Controllers.CustomInstallationTypeController.CustomInstallationTypeCompleter), "CustomInstallationType"),
						    placeholder:Model.Item.CustomInstallationType?.Description
						    //preferredUserId:Model.OrderHead.AffectedInstallation?.PreferredUserObj?.Id
						    ) %>
				</label>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-6">
			<%= Html.WrappedCheckBox(Model.Item, x => x.RequiredForServiceOrderCompletion) %>		
		</div>
		<div class="col-md-6">
			<%= Html.WrappedCheckBox(Model.Item, x => x.SendToCustomer) %>
		</div>
	</div>
	<div class="row">
		<div class="col-md-12">
			<br /><%= Html.SubmitButton("submit", "Add".GetTranslation(), new { @class = "submit btn btn-primary" }) %>
		</div>
	</div>
</form>
<hr data-bind="visible: sortedRelationships().length > 0" />
<table data-bind="visible: sortedRelationships().length > 0" id="checklist-custom-installationtype-relationship-table" class="table table-striped table-hover" style="padding: 5px">
	<thead>
		<tr>
			<th><%= Html.Localize("InstallationTypeCustom") %></th>
			<th><%= Html.Localize("Required") %></th>
			<th><%= Html.Localize("Send") %></th>
			<th><%= Html.Localize("Action") %></th>
		</tr>
	</thead>
	<tbody data-bind="foreach: sortedRelationships">
		<tr class="relationship-entry">
			<td>
				<span data-bind="text: Description"></span>
				
			</td>
			<td><input class="required-for-completion" type="checkbox" data-bind="checked: RequiredForServiceOrderCompletion" /></td>
			<td><input class="send-to-customer" type="checkbox" data-bind="checked: SendToCustomer" /></td>
			<td>
				<%= Html.Link("Remove".GetTranslation(), "#", new { @class = "btn btn-danger remove-checklist-custom-installationtype-relationship" }) %>
			</td>
		</tr>
	</tbody>
</table>