<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<div role="tabpanel" class="tab-pane animated fadeIn" id="tab-discounts" data-bind="with: tabs()['tab-discounts']">
    <empty-state-box params="mood: 'sad', title: 'DiscountsEmptyStateTitle', text: 'DiscountsEmptyState'" data-bind="visible:(customPartDiscounts().length === 0 && customDiscounts().length === 0 ) && !isFiltered()">
    </empty-state-box>

    <div class="listview lv-bordered" data-bind="visible: customDiscounts().length > 0">
        <div class="lv-body">
            <div class="lv-header">
                <span data-bind="translatedText: 'CustomDiscountGroup'"></span>
                <!-- ko if : customDiscounts().length > 0  -->
                <p class="text-center" data-bind="text: customDiscounts()[0].Key"></p>
                <!-- /ko -->
            </div>

            <div class="lv-item media">
                <div class="media-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><%= Html.Localize("ValidFrom") %></th>
                                <th><%= Html.Localize("ValidTo") %></th>
                                <th><%= Html.Localize("%RZ1") %></th>
                                <th><%= Html.Localize("%RZ2") %></th>
                                <th><%= Html.Localize("%RZ3") %></th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: customDiscounts">
                            <tr>
                                <td data-bind="dateText:$data.ValidFrom()"></td>
                                <td data-bind="dateText:$data.ValidTo()"></td>
                                <td data-bind="text:$data.Ds1()"></td>
                                <td data-bind="text:$data.Ds2()"></td>
                                <td data-bind="text:$data.Ds3()"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <div class="listview lv-bordered" data-bind="visible: customPartDiscounts().length > 0">
        <div class="lv-body">
            <div class="lv-header">
                <span data-bind="translatedText: 'CustomPartDiscountGroup'"></span>
            </div>

            <div class="lv-item media">
                <div class="media-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th><%= Html.Localize("KeyValue") %></th>
                                <th><%= Html.Localize("Description") %></th>
                                <th><%= Html.Localize("ValidFrom") %></th>
                                <th><%= Html.Localize("ValidTo") %></th>
                                <th><%= Html.Localize("%RZ1") %></th>
                                <th><%= Html.Localize("%RZ2") %></th>
                                <th><%= Html.Localize("%RZ3") %></th>
                            </tr>
                        </thead>
                        <tbody data-bind="foreach: customPartDiscounts">
                            <tr>
                                <td data-bind="text:$data.PartDiscountGroupKey()"></td>
                                <td data-bind="text:$data.Description()"></td>
                                <td data-bind="dateText:$data.ValidFrom()"></td>
                                <td data-bind="dateText:$data.ValidTo()"></td>
                                <td data-bind="text:$data.Ds1()"></td>
                                <td data-bind="text:$data.Ds2()"></td>
                                <td data-bind="text:$data.Ds3()"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>






