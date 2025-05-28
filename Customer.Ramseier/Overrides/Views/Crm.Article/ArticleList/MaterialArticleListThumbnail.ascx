<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>

<div class="pull-right">
	<lv-actions>
			<% Html.PluginRenderActions("ArticleItemTemplateActions"); %>
		<li>
                    <a id="Partial-Discount-List" href="#" data-toggle="modal" data-target="#modal" data-route="Customer.Ramseier/CustomArticle/PartialDiscountList/{{$data.Id}}">
                        <span data-bind="translatedText:'PartialDiscountList'"></span>
                    </a>
        </li>
	</lv-actions>
</div>
<!-- ko if: DocumentAttributes().length > 0 -->
<div class="pv-main" data-bind="fileResource: DocumentAttributes()[0].FileResource" data-toggle="modal" data-target="#{{Id}}">
</div>
<div class="modal fade" id="{{Id}}" tabindex="-1" role="dialog" aria-labelledby="imagePopUpModal">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
        <img class="img-responsive" data-bind="fileResource: DocumentAttributes()[0].FileResource"/>
    </div>
  </div>
</div>
<!-- /ko -->
<!-- ko if: DocumentAttributes().length === 0 -->
<div class="lv-avatar bgm-gray pv-main">
	<div class="vertical-align" data-bind="text: Helper.Article.getArticleTypeAbbreviation($data, $parent.lookups.articleTypes)"></div>
</div>
<!-- /ko -->
<div class="caption">
	<h5 class="text-center break-word">
		<span class="visible-xs visible-sm" data-bind="text: ItemNo"></span>
		<span class="visible-md visible-lg" data-bind="text: Helper.Article.getArticleAutocompleteDisplay($data, $root.currentUser().DefaultLanguageKey)"></span>
	</h5>
</div>