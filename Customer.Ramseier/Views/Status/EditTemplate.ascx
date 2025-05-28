<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<div class="modal-header card-header ch-alt" data-bind="with: status">
	<button type="button" class="close" data-dismiss="modal" aria-label="<%= Html.Localize("Close") %>">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title" data-bind="visible: innerInstance.entityState === 20"><%= Html.Localize("AddStatus") %></h4>
	<h4 class="modal-title" data-bind="visible: innerInstance.entityState !== 20"><%= Html.Localize("EditStatus") %></h4>
</div>
<div class="modal-body card-body card-padding">
  <form role="form" action="#" data-bind="with: status">
	<div id="StatusTypeKey" class="form-group fg-line select" >
		<label class="control-label fg-label"><%= Html.Localize("StatusType") %></label>
		<select class="form-control" data-bind="select2autocompleter: { data: StatusTypeKey, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('CustomerRamseier_ContactStatusType')}" disabled>
		</select>
	</div>
    <div class="form-group" >
        <div class="fg-line">
            <label class="control-label fg-label"><%= Html.Localize("Description") %></label>
            <input  type="text" class="form-control"  data-bind="value:Description" disabled="disabled">
        </div>
    </div>
    <div class="form-group" >
        <div class="fg-line">
            <label class="control-label fg-label"><%= Html.Localize("Comment") %></label>
            <input  type="text" class="form-control"  data-bind="value:Comment">
        </div>
    </div>
	
	</form>
</div>
<div class="modal-footer card-header ch-alt p-15">
	<ul class="list-unstyled clearfix wpb-actions">
	  <li class="pull-right">
			<button type="button" class="btn btn-lg btn-default f-13 waves-effect" data-bind="click: Helper.Database.clearTrackedEntities" data-dismiss="modal">
			<%= Html.Localize("Cancel") %>
			</button>
			<button type="button" class="btn btn-lg btn-primary f-13 waves-effect" data-bind="click: save, disable: loading">
			<%= Html.Localize("Save") %>
			</button>
	  </li>
	</ul>
</div>