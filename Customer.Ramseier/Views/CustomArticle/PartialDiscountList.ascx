<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Customer.Ramseier.Model" %>

<div class="modal-header card-header ch-alt p-15" >
    <button type="button" class="close" data-dismiss="modal" aria-label="<%= Html.Localize("Close") %>">
        <span aria-hidden="true">&times;</span>
    </button>
    <h4 class="modal-title" data-bind="text:Helper.String.getTranslatedString('PartialDiscountList')"></h4>
    <!-- ko if: $root.partialDiscounts().length > 0 -->
    <div data-bind="foreach: $root.partialDiscounts">
        <h5 class="modal-title" data-bind="text:Key"></h5>
    </div>
    <!-- /ko -->
</div>

<div class="modal-body">
    <empty-state-box params="mood: 'sad', title: 'PartialDiscountList', text: 'NoPartialDiscount'" data-bind="visible: $root.partialDiscounts().length == 0">
    </empty-state-box>
    <div class="generic-list listview lv-bordered">
        <div class="lv-attrs" data-bind="foreach: $root.partialDiscounts">
            <div class="lv-item">
                <% Html.RenderPartial("GenericListBulkControl"); %>
                <div class="card-body table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><%= Html.Localize("Name") %></th>
                                <th><%= Html.Localize("%RZ1") %></th>
                                <th><%= Html.Localize("%RZ2") %></th>
                                <th><%= Html.Localize("%RZ3") %></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td data-bind="text:Value"></td>
                                <td data-bind="text:Ds1"></td>
                                <td data-bind="text:Ds2"></td>
                                <td data-bind="text:Ds3"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal-footer card-header ch-alt p-15">
   <!-- ko if: window.ko.utils.unwrapObservable($root.article().ExtensionValues.PartDiscountClass) -->
      <div style="float:left;display: flex;width: 40%;" >
    <h5 style="padding-right: 2%;" ><%= Html.Localize("PartDiscountClass") %></h5>
    <h5 data-bind="text:window.ko.utils.unwrapObservable($root.article().ExtensionValues.PartDiscountClass)"></h5>
      </div>
    <!-- /ko -->
    <button type="button" class="btn btn-lg btn-default f-13 waves-effect" data-bind="click: Helper.Database.clearTrackedEntities" data-dismiss="modal">
        <%= Html.Localize("Cancel") %>
    </button>
</div>
