<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Customer.Ramseier.Model" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>

<div class="lv-item media">
	<div class="pull-left">
		<div class="lv-avatar pull-left" data-bind="text: Helper.ErpDocument.getDocumentAbbreviation($data, $parent.documentStatuses), style: { backgroundColor: window.Helper.ErpDocument.getDocumentColor($data, $parent.documentStatuses) }"></div>
	</div>
	<div class="media-body">
		<div class="lv-title">
			<!-- ko if: DocumentType()=='MasterContract' -->
			<span data-bind="translatedText: 'T_MasterContractNo'"></span>
			<span data-bind="text: OrderNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='CreditNote' -->
			<span data-bind="translatedText: 'T_CreditNoteNo'"></span>
			<span data-bind="text: InvoiceNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='DeliveryNote' -->
			<span data-bind="translatedText: 'T_DeliveryNoteNo'"></span>
			<span data-bind="text: DeliveryNoteNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='Invoice' -->
			<span data-bind="translatedText: 'T_InvoiceNo'"></span>
			<span data-bind="text: InvoiceNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='SalesOrder' -->
			<span data-bind="translatedText: 'T_SalesOrderNo'"></span>
			<span data-bind="text: OrderNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='Quotes' -->
			<span data-bind="translatedText: 'T_QuoteNo'"></span>
			<span data-bind="text: QuoteNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='DemoDeliveryNote' -->
			<span data-bind="translatedText: 'DemoDeliveryNoteNo'"></span>
			<span data-bind="text: OrderNo"></span>
			<!-- /ko -->
			<!-- ko if: DocumentType()=='BlanketOrder' -->
			<span data-bind="translatedText: 'BlanketOrderNo'"></span>
			<span data-bind="text: OrderNo"></span>
			<!-- /ko -->
		</div>
		<small class="small" data-bind="visible: $parent.showContactLink">
			<span data-bind="translatedText: 'For'"></span>
			<span data-bind="translatedText: ContactType"></span>
			<a href="#" data-bind="text: CompanyName, attr: { href: '#/Main/Company/DetailsTemplate/' + ContactKey() }, visible: ContactType() == 'Company'"></a>
			<a href="#" data-bind="text: CompanyName, attr: { href: '#/Crm.Project/Project/DetailsTemplate/' + ContactKey() }, visible: ContactType() == 'Project'"></a>
		</small>

		<ul class="lv-attrs">
			<%--<li>
				<span><%=Html.TemplateText<CustomErpDocument>(x => x.DocumentType).Localize() %></span>
			</li>--%>
			<li>
				<span data-bind="text: window.Helper.Lookup.getLookupValue($parent.documentStatuses, $data.StatusKey()), style: { color: window.Helper.ErpDocument.getDocumentColor($data, $parent.documentStatuses) }"></span>
			</li>
			<li>
				<span data-bind="translatedText: 'T_GrossAmount'"></span>:
				<span data-bind="money: Total"></span>
				<span data-bind="text: window.Helper.Lookup.getLookupValue($parent.currencies, $data.CurrencyKey())"></span>
			</li>
			<li data-bind="visible: OrderNo">
				<span data-bind="translatedText: 'T_OrderNo'"></span>:
				<span data-bind="text: OrderNo"></span>
			</li>
			<li data-bind="visible: DeliveryNoteDate">
				<span data-bind="translatedText: 'DeliveryNoteDate'"></span>:
				<span data-bind="dateText: DeliveryNoteDate"></span>
			</li>
			<li data-bind="visible: Commission">
				<span data-bind="translatedText: 'T_Reference'"></span>:
				<span data-bind="dateText: Commission"></span>
			</li>
		</ul>
	</div>
</div>
