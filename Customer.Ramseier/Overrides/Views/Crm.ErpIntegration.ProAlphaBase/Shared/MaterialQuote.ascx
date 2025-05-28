<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<div class="lv-item media">
    <div class="pull-left">
        <div class="lv-avatar pull-left" data-bind="text: Helper.ErpDocument.getDocumentAbbreviation($data, $parent.documentStatuses), style: { backgroundColor: window.Helper.ErpDocument.getDocumentColor($data, $parent.documentStatuses) }"></div>
    </div>
    <div class="pull-right">
        <div class="actions dropdown">
            <a href="#" data-toggle="dropdown" aria-expanded="true">
                <i class="zmdi zmdi-more-vert"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-right">
                 <!-- ko if: ExtensionValues().FileResourceKey() -->
                <li>
                    <a data-bind="translatedText: 'LoadDocument', attr: { href: '<%= ResolveUrl("~/Customer.Ramseier/Head/GetDocument/") %>' + ExtensionValues().FileResourceKey() }" target="_blank"></a>
                </li>
                <!-- /ko -->
                <li>
                    <a id="Articles-List" href="#/Customer.Ramseier/ErpDocumentArticleRelationshipList/IndexTemplate/{{$data.Id}}">
                        <span data-bind="translatedText: 'ArticlesList'"></span>
                    </a>
                </li>
                <li>
                    <a id="Documents-List" href="#" data-toggle="modal" data-target="#modal" data-route="Customer.Ramseier/CustomErpDocument/DocumentsList/{{$data.Id}}">
                        <span data-bind="translatedText: 'DocumentsList'"></span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="media-body">
        <div class="lv-title">
            <span data-bind="translatedText: 'T_QuoteNo'"></span>
            <span data-bind="text: QuoteNo"></span>
        </div>
        <% Html.RenderPartial("MaterialErpDocumentItemContactLink"); %>
        <ul class="lv-attrs">
            <% Html.RenderPartial("MaterialErpDocumentItemDefaultAttributes"); %>
            <li data-bind="visible: QuoteDate">
                <span data-bind="translatedText: 'QuoteDate'"></span>:
				<span data-bind="dateText: QuoteDate"></span>
            </li>
            <li data-bind="visible: OrderNo">
                <span data-bind="translatedText: 'T_OrderNo'"></span>:
				<span data-bind="text: OrderNo"></span>
            </li>
        </ul>
    </div>
</div>
