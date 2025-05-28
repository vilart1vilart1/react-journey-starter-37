<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Customer.Ramseier.Model" %>

<div id="{{Id}}" class="lv-item media">
    <div data-bind="with: Article">
        <div class="lv-avatar bgm-gray pull-left" data-bind="text: Helper.Article.getArticleTypeAbbreviation($data,$root.lookups.articleTypes)"></div>
    </div>
    <div class="media-body">
        <div class="row">
            <div class="col-xs-12">
				<div class="lv-title" data-bind="with: Article">
                    <span data-bind="text: Helper.Article.getArticleAutocompleteDisplay($data,$root.currentUser().DefaultLanguageKey)"></span>
				</div>
			</div>
        </div>
        <div class="row media-body">
			<div class="col-xs-6">
                <ul class="lv-attrs">
                    <li data-bind="with: Article">
                        <small class="c-gray" data-bind="lookupValue: ArticleTypeKey, lookups: $root.lookups.articleTypes"></small>
                    </li>
                    <li data-bind="with: ErpDocument">
                        <small class="c-gray" data-bind="text: DocumentType()"></small>
                    </li>
                </ul>
			</div>
			<lv-actions>
                <li data-bind="with: Article">
                    <a id="Partial-Discount-List" href="#" data-toggle="modal" data-target="#modal" data-route="Customer.Ramseier/CustomArticle/PartialDiscountList/{{$data.Id}}">
                        <span data-bind="translatedText:'PartialDiscountList'"></span>
                    </a>
                </li>
                <li>
	                <a href="#" data-bind="attr: { 'data-route': 'Customer.Ramseier/ArticleListExtension/ViewDocuments/' + ArticleId() }" data-toggle="modal" data-target="#modal">
		            <%= Html.Localize("Documents") %>
	                </a>
                </li>
            </lv-actions>
		</div>
         
    </div>
</div>

