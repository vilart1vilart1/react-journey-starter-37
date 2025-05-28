<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>

<div class="lv-item media" data-bind="infiniteScrollItem: { index: $index(), array: $parent.items }">
	<% Html.RenderPartial("GenericListBulkControl"); %>
	<div class="pull-left lv-avatar" data-bind="css: $parent.getAvatarColor($data), text: $parent.getAbbreviation($data), visible: !$parent.selectedItems || $parent.selectedItems().length === 0">
	</div>
	<div class="media-body">
		<div class="lv-title" data-bind="text: Description"></div>
		<ul class="lv-attrs">
			<li>
				<span data-bind="lookupValue: DocumentCategoryKey, lookups: $parent.lookups.documentCategories"></span>
			</li>
			<li data-bind="fileSize: Length"></li>
			<li>
				<i class="zmdi zmdi-calendar"></i>
				<span data-bind="dateText: !!FileResource() ? FileResource().CreateDate : CreateDate"></span>
			</li>
			<% Html.PluginRenderActions("DocumentAttributeAttribute"); %>
		</ul>
		<div class="lv-actions actions dropdown">
			<a href="#" data-toggle="dropdown" aria-expanded="true">
				<i class="zmdi zmdi-more-vert"></i>
			</a>
			<ul class="dropdown-menu dropdown-menu-right">
				<li data-bind="visible: FileResource() ">
					<!-- ko with : FileResource() -->
					<a data-bind="click : $root.get.bind($root)">
						<%= Html.Localize("OpenFile") %>
					</a>
					<!-- /ko -->
				</li>
				<!-- ko if: $parent.canDelete($data) -->
				<li class="divider" data-bind="visible: (navigator.userAgent.indexOf('Android') === -1 && (!window.Helper.Offline || window.Helper.Offline.status === 'online' || (!!FileResource() && FileResource().IsSynced()) || (!!FileResource() &&  !FileResource().Content()) ))"></li>
				<li>
					<a href="#" data-bind="click: $parent.remove"><%= Html.Localize("Delete") %></a>
				</li>
				<!-- /ko -->
			</ul>
		</div>
	</div>
</div>