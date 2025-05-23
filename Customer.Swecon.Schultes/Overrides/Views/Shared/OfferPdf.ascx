<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>

<style>@media print { .no-print { display: none; } }</style>
<div class="alert alert-danger no-print" data-bind="visible: unconfiguredItemsExist()" role="alert">
	<p>
		<%= Html.Localize("UnconfiguredItemsExist") %>
	</p>
</div>
<div style="align-items: flex-start; display: flex; justify-content: space-between; padding-bottom: 10px; height: 77px;">
	<img style="margin-left: -6mm; width: 99.99mm; height: 14.99mm" src="<%= Url.Content("~/Plugins/Customer.Swecon.Schultes/Content/img/Logo_Schultes.png") %>" />
</div>
<div class="row">
	<div class="col-xs-6">
		<% using (Html.TemplateContext("address"))
			{ %>
			<p>
				<!-- ko if: $parent.company -->
				<span data-bind="text: $parent.company().Name"></span>
				<!-- /ko -->
				<!-- ko ifnot: $parent.company -->
				<span data-bind="text: Name1"></span>
				<!-- /ko -->
				<br/>
				<span data-bind="text: Street"></span>
				<br/>
				<span data-bind="text: ZipCode"></span>&nbsp;<span data-bind="text: City"></span>
			</p>
		<% } %>
	</div>
	<div class="col-xs-6">
		<div class="row">
			<div class="col-xs-3 col-xs-offset-1 f-700">
				<%= Html.Localize("Date") %>
			</div>
			<div class="col-xs-7 col-xs-offset-1">
				<span data-bind="dateText: date"></span>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-xs-offset-1 f-700">
				<%= Html.Localize("CustomerNo") %>
			</div>
			<div class="col-xs-7 col-xs-offset-1">
				<!-- ko if: company -->
				<!-- ko with: company -->
				<span data-bind="text: LegacyId"></span>
				<!-- /ko -->
				<!-- /ko -->
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-xs-offset-1 f-700">
				<%= Html.Localize("LocationPersonId") %>
			</div>
			<div class="col-xs-7 col-xs-offset-1">
				<% using (Html.TemplateContext("responsibleUser")) { %>
				<span data-bind="text: DisplayName"></span>
				<% } %>
			</div>
		</div>
		<div class="row">
			<div class="col-xs-3 col-xs-offset-1 f-700">
				<%= Html.Localize("EMail") %>
			</div>
			<div class="col-xs-7 col-xs-offset-1">
				<% using (Html.TemplateContext("responsibleUser")) { %>
				<a data-bind="attr: { href: 'mailto:' + Email() }, text: Email"></a>
				<% } %>
			</div>
		</div>
	</div>
</div>
<h2 style="font-size: 15px">
	<%= Html.Localize("SweconOrderPresentationOfPriceInfoForModel") %>
	<!-- ko with: $root.parentViewModel.configurationBase() -->
	<strong data-bind="text: Description"></strong>
	<!-- /ko -->
</h2>
<p style="white-space: pre-line">
	<%= Html.Localize("SweconOrderStartGreeting").Replace("(name)", "<span data-bind='text: responsibleUser().DisplayName'></span>") %>
</p>
<!-- ko with: $root.parentViewModel.configurationBase() -->
<strong data-bind="text: Description"></strong>
<!-- /ko -->
<!-- ko if: offer().LegacyId -->
<br/>
<%= Html.Localize("SweconOrderConfNumber") %> <strong data-bind="text: offer().LegacyId"></strong>
<!-- /ko -->
<br/>
<br/>
<strong><%= Html.Localize("SweconOrderItemListBegin") %>:</strong>
<ul data-bind="foreach: items().filter(function (x) { return x._primeSort < 5 })" style="list-style: none; padding-left: 0; margin-bottom: 0">
	<!-- ko if: !IsAlternative() && !IsOption() -->
	<li>
		<%--<span data-bind="text: ArticleNo"></span>--%>
		<span data-bind="text: ArticleDescription"></span>
	</li>
		<!-- ko foreach: $parent.items().filter(function (x) { return x.ParentOrderItemId() === $data.Id() }) -->
		<li>&nbsp;&nbsp;<span data-bind="text: ArticleDescription"></span></li>
		<!-- /ko -->
	<!-- /ko -->
</ul>
<ul style="clear: both; list-style: none; padding-left: 0; margin-bottom:0">
<!-- ko foreach: calculationPositions().filter(x => x.CalculationPositionTypeKey() === '9999') -->
	<li style="clear: both">
		<span style="float: left" data-bind="text: CalculationPositionType.Value"></span>
		<span style="float: right" data-bind="money: SalesPrice"></span>
	</li>
	<!-- /ko -->
</ul>
	<ul data-bind="foreach: items().filter(function (x) { return x._primeSort === 5 })" style="list-style: none; padding-left: 0; clear: both; ">
		<!-- ko if: !IsAlternative() && !IsOption() -->
		<li>
			<%--<span data-bind="text: ArticleNo"></span>--%>
			<span data-bind="text: ArticleDescription"></span>
		</li>
		<!-- /ko -->
	</ul>
<p class="f-700" style="clear: both">
	<span style="float: left"><%= Html.Localize("SweconOrderPriceColumn") %></span>
	<span style="float: right" data-bind="money: offer().Price"></span>
</p>
<strong style="clear: right; display: block; padding-top: 20px;">
	<%= Html.Localize("SweconOrderWarranty") %>
</strong>
<p>
	<%= Html.Localize("SweconOrderWarrantyText") %>
</p>
<strong>
	<%= Html.Localize("SweconOrderOptionalItemListBegin") %>:
</strong>
<ul data-bind="foreach: items" style="list-style: none; padding-left: 0">
	<!-- ko if: IsAlternative() -->
	<li>
		<span data-bind="text: ArticleDescription"></span>
		<!-- ko with: $parent.items().find(function(x){ return x.Id() === $data.ParentOrderItemId(); }) -->
		(<%= Html.Localize("AlternativeFor") %>: <span data-bind="text: ArticleDescription"></span>)
		<span class="pull-right f-700" data-bind="money: $parent.Price() - Price()"></span>
		<!-- /ko -->
	</li>
	<!-- /ko -->
	<!-- ko if: IsOption() -->
	<li>
		<span data-bind="text: ArticleDescription"></span>
		<span class="pull-right f-700" data-bind="money: Price"></span>
	</li>
	<!-- /ko -->
</ul>
<p style="clear: right; padding-top: 20px">
	<%= Html.Localize("SweconOrderPriceDisplayDetails") %>
</p>
<p>
	<%= Html.Localize("SweconOrderFurtherInformation") %>
</p>
<strong>
	<%= Html.Localize("FinancingPDFTitle") %>
</strong>
<div data-bind="foreach: $root.parentViewModel.financingCalculations" style="display: flex; flex-wrap: wrap">
	<p class="small" style="padding-right: 10px; padding-top: 10px">
		<strong>Option <span data-bind="text: $index() + 1"></span></strong><br/>
		<%= Html.Localize("PrePayment") %>: <span data-bind="money: PrePayment"></span><br>
		<%= Html.Localize("Tradein") %>: <span data-bind="money: TradeIn"></span><br>
		<%= Html.Localize("DurationInMonths") %>: <span data-bind="text: DurationInMonths"></span> Monate<br>
		<%= Html.Localize("RemainingPaymentAfterFinancing") %>: <span data-bind="money: RemainingPaymentAfterFinancing"></span><br>
		<%= Html.Localize("MonthlyRate").Split(' ').Select(x => x.Capitalize()).Join(" ") %>: <span data-bind="money: MonthlyRate"></span><br>
		<%= Html.Localize("Interest") %>: <span data-bind="money: AbsoluteInterest"></span>
	</p>
</div>

<% using (Html.TemplateContext("responsibleUser"))
	{ %>
	<p>
		<%= Html.Localize("SweconOrderClosing") %><br/>
		Schultes Baumaschinen GmbH<br/>
		<span data-bind="text: DisplayName"></span>
	</p>
<% } %>

<div class="footer">
	<div class="row" style="border-top: 1px solid #000; font-size: 90%;">
		<div class="col-xs-3">
			<strong><%= Html.Localize("ReportFooterCol1Row1") %></strong><br/>
			<%= Html.Localize("ReportFooterCol1Row2") %><br/>
			<%= Html.Localize("ReportFooterCol1Row3") %><br/>
			<%= Html.Localize("ReportFooterCol1Row4") %><br/>
			<%= Html.Localize("ReportFooterCol1Row5") %>
		</div>
		<div class="col-xs-2 p-l-0 p-r-0">
			<strong><%= Html.Localize("ReportFooterCol2Row1") %></strong><br/>
			<%= Html.Localize("ReportFooterCol2Row2") %><br/>
			<%= Html.Localize("ReportFooterCol2Row3") %><br/>
			<%= Html.Localize("ReportFooterCol2Row4") %><br/>
			<%= Html.Localize("ReportFooterCol2Row5") %>
		</div>
		<div class="col-xs-2 p-l-5">
			<strong><%= Html.Localize("ReportFooterCol3Row1") %></strong><br/>
			<%= Html.Localize("ReportFooterCol3Row2") %><br/>
			<%= Html.Localize("ReportFooterCol3Row3") %><br/>
			<strong><%= Html.Localize("ReportFooterCol3Row4") %></strong><br/>
			<%= Html.Localize("ReportFooterCol3Row5") %>
		</div>
		<div class="col-xs-1 p-l-0 p-r-0">
			<strong><%= Html.Localize("ReportFooterCol4Row1") %></strong><br/>
			<%= Html.Localize("ReportFooterCol4Row2") %><br/>
			<%= Html.Localize("ReportFooterCol4Row3") %><br/>
			<strong><%= Html.Localize("ReportFooterCol4Row4") %></strong><br/>
			<%= Html.Localize("ReportFooterCol4Row5") %>
		</div>
		<div class="col-xs-4 p-l-25 p-r-0">
			<%= Html.Localize("ReportFooterCol5Row1") %><br/>
			<%= Html.Localize("ReportFooterCol5Row2") %><br/>
			<%= Html.Localize("ReportFooterCol5Row3") %><br/>
			<%= Html.Localize("ReportFooterCol5Row4") %><br/>
			<%= Html.Localize("ReportFooterCol5Row5") %>
		</div>
	</div>
</div>