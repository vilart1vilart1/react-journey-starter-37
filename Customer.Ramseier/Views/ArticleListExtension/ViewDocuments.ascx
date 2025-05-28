<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl<CrmModel>" %>
<%@ Import Namespace="Crm.ViewModels" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<div class="modal-header card-header ch-alt">
	<button type="button" class="close" data-dismiss="modal" aria-label="<%= Html.Localize("Close") %>">
		<span aria-hidden="true">&times;</span>
	</button>
	<h4 class="modal-title"><%= Html.Localize("Documents") %></h4>
</div>

<div class="modal-body card-body card-padding">
	<div class="generic-list listview lv-bordered">
		<div class="lv-body">
			<div data-bind="foreach: items">
				<% Html.RenderPartial("GenericListItemGroup"); %>
				<% Html.RenderPartial("../DocumentAttributeList/MaterialItemTemplate"); %>
			</div>
			<!-- ko if: items().length === 0 -->
				<div id="generic-list-empty-state" class="lv-item media">
					<div class="row media-body">
						<div class="col-xs-12">
							<small class="lv-small"><%= Html.Localize("NoRecordsForSearchCriteria") %></small>
						</div>
					</div>
				</div>
			<!-- /ko -->
		</div>
	</div>
</div>

<div class="modal-footer card-header ch-alt p-15">
	<button type="button" class="btn btn-lg btn-default f-13 waves-effect" data-bind="click: Helper.Database.clearTrackedEntities" data-dismiss="modal">
		<%= Html.Localize("Close") %>
	</button>
</div>