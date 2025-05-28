<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl<Crm.ViewModels.GenericListViewModel>" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<div class="lv-item media">
    <% Html.RenderPartial("GenericListBulkControl"); %>
    <div data-bind="visible: !$parent.selectedItems || $parent.selectedItems().length === 0">
        <!-- ko if: DocumentAttributes().length > 0 -->
        <div class="lv-avatar pull-left" data-bind="fileResource: DocumentAttributes()[0].FileResource"></div>
        <!-- /ko -->
        <!-- ko if: DocumentAttributes().length === 0 -->
        <div class="lv-avatar bgm-gray pull-left" data-bind="text: Helper.Article.getArticleTypeAbbreviation($data, $parent.lookups.articleTypes)"></div>
        <!-- /ko -->
    </div>
    <div class="media-body">
        <div class="row">
            <div class="col-xs-12">
                <div class="lv-title">
                    <span data-bind="text: Helper.Article.getArticleAutocompleteDisplay($data, $root.currentUser().DefaultLanguageKey)"></span>
                    <small class="c-gray" data-bind="lookupValue: ArticleTypeKey, lookups: $root.lookups.articleTypes"></small>
                </div>
            </div>
        </div>
        <div class="row media-body">
            <div class="col-xs-6">
                <ul class="lv-attrs">
                    <!-- ko if: Price -->
                    <li>
                        <span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currencies"></span>
                        <span data-bind="money: Price"></span>
                    </li>
                    <!-- /ko -->
                    <!-- ko if: ArticleGroup01Key -->
                    <li>
                        <i class="zmdi zmdi-collection-item-1"></i>
                        <span data-bind="lookupValue: ArticleGroup01Key, lookups: $parent.lookups.articleGroups01"></span>
                    </li>
                    <!-- /ko -->
                    <!-- ko if: ArticleGroup02Key -->
                    <li>
                        <i class="zmdi zmdi-collection-item-2"></i>
                        <span data-bind="lookupValue: ArticleGroup02Key, lookups: $parent.lookups.articleGroups02"></span>
                    </li>
                    <!-- /ko -->
                    <!-- ko if: ArticleGroup03Key -->
                    <li>
                        <i class="zmdi zmdi-collection-item-3"></i>
                        <span data-bind="lookupValue: ArticleGroup03Key, lookups: $parent.lookups.articleGroups03"></span>
                    </li>
                    <!-- /ko -->
                    <!-- ko if: ArticleGroup04Key -->
                    <li>
                        <i class="zmdi zmdi-collection-item-4"></i>
                        <span data-bind="lookupValue: ArticleGroup04Key, lookups: $parent.lookups.articleGroups04"></span>
                    </li>
                    <!-- /ko -->
                    <!-- ko if: ArticleGroup05Key -->
                    <li>
                        <i class="zmdi zmdi-collection-item-5"></i>
                        <span data-bind="lookupValue: ArticleGroup05Key, lookups: $parent.lookups.articleGroups05"></span>
                    </li>
                    <!-- /ko -->
                </ul>
                <% Html.PluginRenderActions("MaterialArticleItemExtensions"); %>
            </div>
            <div class="col-xs-4">
                <ul class="lv-attrs" data-bind="foreach: Tags">
                    <li data-bind="text: Name"></li>
                </ul>
            </div>

            <div class="col-xs-4">
                <ul class="lv-attrs" data-bind="foreach: $data.relationships">
                    <li data-bind="text: Id"></li>
                </ul>
            </div>
            <lv-actions>
                <li>
                    <a id="Partial-Discount-List" href="#" data-toggle="modal" data-target="#modal" data-route="Customer.Ramseier/CustomArticle/PartialDiscountList/{{$data.Id}}">
                        <span data-bind="translatedText:'PartialDiscountList'"></span>
                    </a>
                </li>
                <% Html.PluginRenderActions("ArticleItemTemplateActions"); %>
            </lv-actions>
        </div>
    </div>
</div>
