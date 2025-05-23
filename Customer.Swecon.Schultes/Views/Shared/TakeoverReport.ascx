<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Crm.Service.Rest.Model" %>
<%@ Import Namespace="Crm.Library.Modularization" %>
<%@ Import Namespace="Customer.Swecon.Rest.Model" %>
<div class="reportcontainer">
	<div class="report">
		<div class="header" style="height: 127px;">
		    <div style="float:left; padding-top: 43px; margin-left: -12px;">
				<img src="<%= Url.Content("~/Plugins/Customer.Swecon.Schultes/Content/img/Logo_Schultes.png") %>" width="342" height="51" />
			</div>
		</div>
		<table style="width: 100%">
			<tr>
				<td style="width: 63%; vertical-align: top">
					<table style="width: 100%;">
						<tr>
							<td class="left" colspan="3"><%= Html.Localize("WasteProducer") %>:</td>
						</tr>
						<tr>
							<td colspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td class="left" colspan="3"> <%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress).Name1") %> <%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress).Name2") %> <%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress).Name") %></td>
						</tr>
						<tr>
							<td colspan="3" class="left"><%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress).Street") %></td>
						</tr>
						<tr>
							<td colspan="3" class="left"><%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress).ZipCode") %> <%= Html.TemplateText("window.ko.utils.unwrapObservable($root.companyStandardAddress().City") %></td>
						</tr>
						<tr>
							<td colspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td class="left" colspan="3"><%= Html.Localize("Carrier") %>:</td>
						</tr>
						<tr>
							<td class="left" colspan="3">Swecon Baumaschinen GmbH</td>
						</tr>
						<tr>
							<td colspan="3" class="left">Europaring 60</td>
						</tr>
						<tr>
							<td colspan="3" class="left">40878 Ratingen</td>
						</tr>
						<tr>
							<td colspan="3">&nbsp;</td>
						</tr>
						<tr>
							<td colspan="3" class="left"><%= Html.Localize("CarrierNumber") %>:</td>
						</tr>
						<tr>
							<td colspan="3" class="left">E158T5761</td>
						</tr>
					</table>				
				</td>
				<td style="width: 5%">
				</td>
				<td style="width: 32%; vertical-align: top">
					<table style="width: 100%;">
						<tr>
							<td colspan="2" style="height: 45px;">
								<span style="border: 1px solid black; padding-top: 10px; padding-bottom: 2px;"><% using (Html.TemplateForEach("$root.splittedOrderNo")){ %><span style="padding-left: 10px; padding-right: 10px; padding-bottom: 2px;" data-bind="text: $data, css: { 'border-left': $index() > 0 }"></span><% } %></span>
							</td>
						</tr>
						<tr>
							<td colspan="2" class="left bold" style="padding-top: 10px;"><%= Html.Localize("OrderNo") %></td>
						</tr>
						<tr>
							<td colspan="2" class="left" data-bind="dateText: new Date()"></td>
						</tr>
						<tr>
							<td colspan="2" class="left bold"><%= Html.Localize("Date") %></td>
						</tr>
					</table>	
				</td>
			</tr>
		</table>
		<h2 style="text-align: center; padding-bottom: 25px"><%= Html.Localize("TakingOverCertificate").ToUpperInvariant() %></h2>
		<table style="width: 100%">
			<thead>
				<tr>
					<th style="white-space: nowrap; padding-left: 0;"><%= Html.Localize("ECNumber") %></th>
					<th style="padding-left: 10px;"><%= Html.Localize("WasteCode") %></th>
					<th style="padding-left: 10px;"><%= Html.Localize("Amount") %></th>
					<th style="padding-left: 10px;"><%= Html.Localize("Unit") %></th>
				</tr>
			</thead>
			<tbody>
				<% const string takeoverPositionsBinding = "window.ko.utils.arrayFilter($root.takeoverPositions(), function(takeoverPosition){ return takeoverPosition.ActualQty() > 0; })" +
				                                   ".sort(function(left, right) { " +
																						 "return parseInt(left.ItemNo()) - parseInt(right.ItemNo()); " +
				                                   "})"; %>
				<% var quantityUnit = Html.TemplateText("(window.ko.utils.arrayFirst($root.quantityUnits(), function (quantityUnit) { return quantityUnit.Key() == $data.QuantityUnitKey(); }) || { Key: $data.QuantityUnitKey(), Value: $data.QuantityUnitKey()}).Value"); %>
				<% using (Html.TemplateForEach(takeoverPositionsBinding)){ %>
					<tr>
						<td class="border-bottom small" style="padding-left: 0;"><%= Html.TemplateText<TakeoverPositionRest>(x => x.ItemNo)%></td>
						<td class="border-bottom small" style="padding-left: 10px;"><%= Html.TemplateText<TakeoverPositionRest>(x => x.Description)%></td>
						<td class="border-bottom small" style="padding-left: 10px;"><%= Html.TemplateText<TakeoverPositionRest>(x => x.ActualQty)%></td>
						<td class="border-bottom small" style="padding-left: 10px;"><%= quantityUnit %></td>
					</tr>
				<% } %>
				<tr>
					<td colspan="4" class="small" style="padding-top: 15px">
						<%= Html.Localize("TakingOverCertificateTerms") %>
					</td>
				</tr>
			</tbody>
		</table>	
		<hr />
		<% using (Html.TemplateContext("$root.dispatch")){ %>
			<div style="text-align: right; padding-right: 25px; padding-top: 10px;">
				<table style="display: inline-block; width: 250px;">	
					<tr><td class="left"><%= Html.TemplateText<ServiceOrderDispatchRest>(x => x.SignatureContactName)%></td></tr>
					<% using (Html.TemplateCondition<ServiceOrderDispatchRest>(x => x.SignatureJson)){ %>
						<tr>
							<td class="left underline">
								<input type="hidden" data-bind="signaturePad: SignatureJson" data-sigpencolour="#000000" data-sigbgcolour="#FFFFFF" />
							</td>
						</tr>
						<tr><td class="left small" style="text-align: center"><%= Html.Localize("TakingOverCertificateCustomerSignature") %></td></tr>
					<% } %>
				</table>
			</div>
		<% } %>
	</div>
</div>