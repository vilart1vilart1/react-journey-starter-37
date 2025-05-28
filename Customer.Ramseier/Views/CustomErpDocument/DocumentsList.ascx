<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Customer.Ramseier.Model" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.Validation.Extensions" %>
<%@ Import Namespace="Crm.ViewModels" %>


<div class="modal-header card-header ch-alt p-15">
    <button type="button" class="close" data-dismiss="modal" aria-label="<%= Html.Localize("Close") %>">
        <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" data-bind="text:Helper.String.getTranslatedString('DocumentsList')"></h4>
</div>

<empty-state-box params="mood: 'sad', title: 'DocumentsList', text: 'NoDocuments'" data-bind="visible: Documents().length === 0">
</empty-state-box>

<div class="generic-list listview lv-bordered">
    <div data-bind="foreach: Documents()">
        <div class="lv-item modal" style="min-height: 100px;">
            <% Html.RenderPartial("GenericListBulkControl"); %>
            <div class="pull-left lv-avatar" data-bind="css: $parent.getAvatarColor($data), text: $parent.getAbbreviation($data), visible: !$parent.selectedItems || $parent.selectedItems().length === 0">
            </div>
            <div class="modal-body card-body card-padding">
                <div class="lv-title"  >
                    <span data-bind="text: $data.FileName"></span> (<small data-bind="text: $data.Description"></small>)
                </div>
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
                <!-- ko with : FileResource() -->
                <div class="lv-actions actions dropdown" >
                    <a href="#" data-toggle="dropdown" aria-expanded="true">
                        <i class="zmdi zmdi-more-vert"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-right">
                        <li >
                                <a data-bind="click : $root.get.bind($root)">
                                <%= Html.Localize("OpenFile") %>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- /ko -->
            </div>
        </div>
    </div>
</div>
<div class="modal-footer card-header ch-alt p-15">
    <button type="button" class="btn btn-lg btn-default f-13 waves-effect" data-bind="click: Helper.Database.clearTrackedEntities" data-dismiss="modal">
        <%= Html.Localize("Cancel") %>
    </button>
</div>
