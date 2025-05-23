<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Crm.Service.Model.Lookup" %>
<%@ Import Namespace="Crm.Service.Rest.Model" %>
<%@ Import Namespace="Customer.Swecon.Model" %>
<%@ Import Namespace="Customer.Swecon.Model.Lookups" %>
<div class="reportcontainer">
	<div class="report">
		<div class="header">
			<div style="height: 200px">
        <div style="float:left; margin-top: 10px;">
          <img src="<%= Url.Content("~/Plugins/Customer.Swecon.Schultes/Content/img/Logo_Schultes.png") %>" height="30"/>
        </div>
        <div style="float: right;">
          <img src="<%= Url.Content("~/Plugins/Customer.Swecon.Schultes/Content/img/Logo-Volvo-1.jpg") %>" height="50" />
        </div>
			</div>
			<table>
				<tbody>
					<tr>
						<td style="width: 48%" colspan="3" class="textcell">
							<div>
								<%= Html.TemplateText("$root.companyStandardAddress().Name1") %> <%= Html.TemplateText("$root.companyStandardAddress().Name2") %> <%= Html.TemplateText("$root.companyStandardAddress().Name") %>
							</div>
						</td>
						<td style="width: 4%" rowspan="3"></td>
						<td style="width: 48%">
							<h3 style="padding: 0; margin: 0;">
								<%= Html.Localize("OrderNo") %>
							</h3>

						</td>
					</tr>
					<tr>
						<td colspan="3" class="textcell">
							<div><%= Html.TemplateText("$root.companyStandardAddress().Street") %></div>
						</td>
						<td rowspan="2" style="padding-top: 10px">
              <span data-bind="text: $root.serviceOrder().OrderNo()"></span></br></br>
              <span data-bind="text: $root.serviceOrder().CommissionNo()"></span>
						</td>
					</tr>
					<tr>
						<td colspan="3" class="textcell">
							<div><%= Html.TemplateText("$root.companyStandardAddress().ZipCode") %> <%= Html.TemplateText("$root.companyStandardAddress().City") %></div>
						</td>
					</tr>
					<tr>
						<td colspan="5">&nbsp;</td>
					</tr>
					<tr>
						<td colspan="3"></td>
						<td rowspan="5"></td>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.serviceOrder().Name1") %> <%= Html.TemplateText("$root.serviceOrder().Name2") %> <%= Html.TemplateText("$root.serviceOrder().Name3") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("ServiceLocation") %>
							</div>
						</td>
					</tr>
					<tr>
						<td style="width: 23.5%" class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.installation().ExtensionValues().CustomInstallationType") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("CustomInstallationType") %>
							</div>
						</td>
						<td style="width: 1%" rowspan="2"></td>
						<td style="width: 23.5%" class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.installation().LegacyInstallationId") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("LegacyInstallationId") %>
							</div>
						</td>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.serviceOrder().Street") %>
							</div>
						</td>
					</tr>
					<tr>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateDate("$root.installation().KickOffDate", pattern: "{skeleton: 'y'}") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("CustomYearOfManufacture") %>
							</div>
						</td>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.dispatch().ExtensionValues().OperatingHours() || $root.installation().ExtensionValues().OperatingHours()") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("OperatingHours") %>
							</div>
						</td>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.serviceOrder().ZipCode") %> <%= Html.TemplateText("$root.serviceOrder().City") %>
							</div>
						</td>
					</tr>
					<tr>
						<td colspan="3" class="textcell">
							<div class="right">
								<% using (Html.TemplateContext("$root.installation().ExtensionValues()")) { %>
									<%= Html.TemplateText<InstallationExtension>(x => x.UsageCodeKey).AsLookup(typeof(UsageCode)).ToString().TemplateCondition<InstallationExtension>(x => x.UsageCodeKey, Html.Localize("Unspecified")) %>
								<% } %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("UsageCode") %>
							</div>
						</td>
						<td class="textcell">
							<div class="right">
								<%= Html.TemplateText("$root.serviceOrder().PurchaseOrderNo") %>
							</div>
							<div class="descriptor">
								<%= Html.Localize("PurchaseOrderNo") %>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h2 style="text-align: center"><%= Html.Localize("ServiceOrder").ToUpper() %></h2>
		<h3><%= Html.Localize("ExecutedWork").ToUpper() %></h3>
		<% using (Html.TemplateForEach("$root.displayedTimePostings.indexKeys.Date().sort(function(left, right) { return left > right ? 1 : -1; })"))
		   { %>
			<% using (Html.TemplateForEach("$root.displayedTimePostings.indexKeys.Username().sort(function(left, right) { return left > right ? 1 : -1; })"))
			   { %>
				<% const string timePostings = "_.intersection($root.displayedTimePostings.index.Username()[$data], $root.displayedTimePostings.index.Date()[$parent])"; %>
				<% using (Html.TemplateCondition(timePostings + ".length > 0"))
				   { %>
					<table style="width: 100%">
						<tr>
							<td class="underline bold"><%= Html.Localize("Date") %></td>
							<td colspan="1" class="center border-left border-top border-bottom"><%= Html.TemplateDate(timePostings + "[0].Date") %></td>
							<td colspan="1" class="border-bottom border-left"></td>
							<td colspan="1" class="border-bottom bold"><%= Html.Localize("DispatchedUser") %></td>
							<td colspan="2" class="border-bottom bold border-left border-top border-right" style="white-space: nowrap"><span data-bind="text: <%= timePostings %>[0].UserDisplayName"></span></td>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td></td>
							<td colspan="2" class="center border-left"><%= Html.Localize("Time") %></td>
							<td class="center border-left"><%= Html.Localize("Break") %></td>
							<td class="center border-left"><%= Html.Localize("Total") %></td>
							<td class="center border-left border-right"></td>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td></td>
							<td class="center border-left border-bottom"><%= Html.Localize("Begin") %></td>
							<td class="center border-bottom border-left"><%= Html.Localize("End") %></td>
							<td class="center border-bottom border-left"><%= Html.Localize("Hours") %></td>
							<td class="center border-bottom border-left"><%= Html.Localize("Hours") %></td>
							<td class="center border-right border-bottom border-left">KM</td>
							<td></td>
							<td style="width: 100%"></td>
						</tr>
						<% using (Html.TemplateForEach(timePostings + ".sort(function(left, right) { if (!!left.Date && !!right.Date && left.Date().getDay() != right.Date().getDay()) { return left.Date().getDay() < right.Date().getDay() ? -1 : 1; } if (!!left.From && !!right.From) { return left.From() == right.From() ? 0 : (left.From() < right.From() ? -1 : 1); } else { return left.ItemNo() == right.ItemNo() ? 0 : (left.ItemNo() < right.ItemNo() ? -1 : 1); } })"))
						   { %>
							<tr>
								<td><%= Html.TemplateText<ServiceOrderTimePostingRest>(x => x.ItemDescription) %></td>
								<td class="center border-left border-bottom"><%= Html.TemplateTime<ServiceOrderTimePostingRest>(x => x.From) %></td>
								<td class="center border-left border-bottom"><%= Html.TemplateTime<ServiceOrderTimePostingRest>(x => x.To) %></td>
								<td class="center border-left border-bottom"><%= Html.TemplateText<ServiceOrderTimePostingRest>(x => x.Break) %></td>
								<td class="center border-left border-bottom"><%= Html.TemplateText<ServiceOrderTimePostingRest>(x => x.Duration) %></td>
								<td class="center border-right border-left border-bottom"><%= Html.TemplateText<ServiceOrderTimePostingRest>(x => x.Kilometers) %></td>
								<td class="center"></td>
								<td class="border-bottom">
									<% const string serviceOrderTime = "window.ko.utils.arrayFirst($root.serviceOrderTimes(), function (serviceOrderTime){ return serviceOrderTime.Id() == ServiceOrderTimeId(); })"; %>
									<!-- ko if: ItemNo() == '0300' && !!<%= serviceOrderTime %> && !!<%= serviceOrderTime %>.Diagnosis()  -->
									<%= Html.Localize("Diagnosis") %>: <span data-bind="text: <%= serviceOrderTime %>.Diagnosis"></span><br />
									<!-- /ko -->
									<%= Html.TemplateText<ServiceOrderTimePostingRest>(x => x.Description) %>
								</td>
							</tr>
						<% } %>
						</table>
						<hr />
					<% } %>
				<% } %>
		<% } %>
		<!-- ko if: $root.serviceOrderTimesWithCausingItem().length > 0 -->
			<h3><%= Html.Localize("CausingItem").ToUpper() %></h3>
			<table style="width: 100%">
				<thead>
					<tr class="left">
						<th class="border-top border-bottom"><%= Html.Localize("CausingItemNo") %></th>
						<th class="border-top border-bottom border-left"><%= Html.Localize("PreviousSerialNo") %></th>
						<th class="border-top border-bottom border-left"><%= Html.Localize("SerialNo") %></th>
					</tr>
				</thead>
				<tbody data-bind="foreach: $root.serviceOrderTimesWithCausingItem">
						<tr>
							<td class="border-bottom">
								<%= Html.TemplateText<ServiceOrderTimeRest>(x => x.CausingItemNo) %>
							</td>
							<td class="border-bottom border-left">
								<%= Html.TemplateText<ServiceOrderTimeRest>(x => x.CausingItemPreviousSerialNo) %>
								<% using (Html.TemplateCondition<ServiceOrderTimeRest>(x => x.NoCausingItemPreviousSerialNoReasonKey))
								   { %>
									<%= Html.TemplateText<ServiceOrderTimeRest>(x => x.NoCausingItemPreviousSerialNoReasonKey).AsLookup(typeof(NoCausingItemPreviousSerialNoReason)) %>
								<% } %>
							</td>
							<td class="border-bottom border-left">
								<%= Html.TemplateText<ServiceOrderTimeRest>(x => x.CausingItemSerialNo) %>
								<% using (Html.TemplateCondition<ServiceOrderTimeRest>(x => x.NoCausingItemSerialNoReasonKey))
								   { %>
									<%= Html.TemplateText<ServiceOrderTimeRest>(x => x.NoCausingItemSerialNoReasonKey).AsLookup(typeof(NoCausingItemSerialNoReason)) %>
								<% } %>
							</td>
						</tr>
				</tbody>
			</table>	
			<hr />
		<!-- /ko -->
		<h3><%= Html.Localize("MaterialUsage").ToUpper() %></h3>
		<table style="width: 100%">
			<thead>
				<tr class="left">
					<th class="border-top border-bottom"><%= Html.Localize("Quantity") %></th>
					<th class="border-top border-bottom border-left"><%= Html.Localize("ItemNo") %></th>
					<th class="border-top border-bottom border-left"><%= Html.Localize("ItemDescription") %></th>
				</tr>
			</thead>
			<tbody>
				<% const string materialsBinding = "window.ko.utils.arrayFilter($root.displayedMaterials(), function(material){ return material.ActualQty() > 0; })" +
												   ".sort(function(left, right) { " +
												   "if (left.EstimatedQty() == 0 && right.EstimatedQty() == 0) { return left.Description().toString().localeCompare(right.Description().toString()); } " +
												   "if (left.EstimatedQty() == 0) { return 1; } " +
												   "if (right.EstimatedQty() == 0) { return -1; } " +
												   "return parseInt(window.ko.utils.unwrapObservable(left.PosNo || 0)) - parseInt(window.ko.utils.unwrapObservable(right.PosNo || 0)); " +
												   "})"; %>
				<% using (Html.TemplateForEach(materialsBinding))
				   { %>
					<tr>
						<td class="border-bottom">
							<span data-bind="text: ActualQty"></span>
						</td>
						<td class="border-bottom border-left"><span data-bind="text: ItemNo().split('||')[1]"></span></td>
						<td class="border-bottom border-left">
							<% using (Html.TemplateVisible("ItemNo() == 'KART@0||VT2||133' || ItemNo() == 'KART@0||T2||133' "))
							   { %>
								<%= Html.TemplateText<ServiceOrderMaterialRest>(x => x.ExternalRemark) %>
							<% } %>
							<% using (Html.TemplateVisible("ItemNo() != 'KART@0||VT2||133' && ItemNo() != 'KART@0||T2||133' "))
							   { %>
								<%= Html.TemplateText<ServiceOrderMaterialRest>(x => x.Description) %>
							<% } %>
						</td>
					</tr>
				<% } %>
				<% using (Html.TemplateCondition(materialsBinding + ".length == 0"))
				   { %>
					<tr><td colspan="5" class="border-bottom"><%= Html.Localize("NoUsedMaterial") %></td></tr>
				<% } %>
				<tr><td colspan="5" class="small"><%= Html.Localize("MaterialUsageTermsAndConditions") %></td></tr>
			</tbody>
		</table>	
		<hr />
		<table>
			<tr>
				<td><%= Html.Localize("WorkDone") %>:</td>
				<td>
					<% using (Html.TemplateCondition("StatusKey() == 'ClosedComplete'"))
					   { %>
						<span class="checkbox-checked">x</span> <%= Html.Localize("yes") %>
					<% } %>
					<% using (Html.TemplateCondition("StatusKey() == 'ClosedComplete'", false))
					   { %>
						<span class="checkbox">x</span> <%= Html.Localize("yes") %>
					<% } %>
					<% using (Html.TemplateCondition("StatusKey() == 'ClosedNotComplete'"))
					   { %>
						<span class="checkbox-checked" style="margin-left: 15px;">x</span> <%= Html.Localize("no") %>
					<% } %>
					<% using (Html.TemplateCondition("StatusKey() == 'ClosedNotComplete'", false))
					   { %>
						<span class="checkbox" style="margin-left: 15px;">x</span> <%= Html.Localize("no") %>
					<% } %>
				</td>
			</tr>
			<tr>
				<td><%= Html.Localize("IncidentalMaterial") %>:</td>
				<td>
					<% using (Html.TemplateCondition("ExtensionValues().IncidentalMaterial()"))
					   { %>
						<span class="checkbox-checked">x</span> <%= Html.Localize("yes") %> <span class="checkbox" style="margin-left: 15px;">x</span> <%= Html.Localize("no") %>
					<% } %>
					<% using (Html.TemplateCondition("ExtensionValues().IncidentalMaterial()", false))
					   { %>
						<span class="checkbox">x</span> <%= Html.Localize("yes") %> <span class="checkbox-checked" style="margin-left: 15px;">x</span> <%= Html.Localize("no") %>
					<% } %>
				</td>
			</tr>
			<tr>
				<td><%= Html.Localize("Disposal") %>:</td>
				<td>
					<span class="input" style="margin-right: 5px;"> <%= Html.TemplateText("ExtensionValues().DisposedOil").TemplateCondition("ExtensionValues().DisposedOil", "0") %> </span> <%= Html.Localize("Oil") %>/<%= Html.Localize("Liter") %> 
					<span class="input" style="margin-right: 5px; margin-left: 15px;"> <%= Html.TemplateText("ExtensionValues().DisposedFilters").TemplateCondition("ExtensionValues().DisposedFilters", "0") %> </span> <%= Html.Localize("Filters") %>/<%= Html.Localize("Piece") %> 
					<span class="input" style="margin-right: 5px; margin-left: 15px;"> <%= Html.TemplateText("ExtensionValues().DisposedTubes").TemplateCondition("ExtensionValues().DisposedTubes", "0") %> </span> <%= Html.Localize("Tubes") %>/<%= Html.Localize("Piece") %>
				</td>
			</tr>
			<% using (Html.TemplateCondition("ExtensionValues().DisposalByCustomer()"))
			   { %>
			<tr>
				<td></td>
				<td><%= Html.Localize("DisposalByCustomer") %></td>
			</tr>
			<% } %>
		</table>
		<div style="text-align: right; padding-right: 25px">
			<table style="display: inline-block">	
				<tr><td class="left"><%= Html.TemplateText<ServiceOrderDispatchRest>(x => x.SignatureContactName) %></td></tr>
				<% using (Html.TemplateCondition<ServiceOrderDispatchRest>(x => x.SignatureJson))
				   { %>
					<tr>
						<td class="left underline">
							<input type="hidden" data-bind="signaturePad: SignatureJson" data-sigpencolour="#000000" data-sigbgcolour="#FFFFFF" />
						</td>
					</tr>
					<tr><td class="left"><%= Html.Localize("CustomerSignature") %></td></tr>
				<% } %>
			</table>
		</div>
	</div>
</div>