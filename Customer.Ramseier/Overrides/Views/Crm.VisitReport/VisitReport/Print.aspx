<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Application.Master" Inherits="Crm.Library.Modularization.CrmViewPage<Crm.VisitReport.ViewModels.VisitReportPrintViewModel>" %>
<%@ Import Namespace="System.Activities.Expressions" %>
<%@ Import Namespace="System.Collections.ObjectModel" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Model" %>
<%@ Import Namespace="Crm.VisitReport.Lookups" %>
<%@ Import Namespace="Crm.VisitReport.Model.Notes" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Crm.VisitReport.Model.Relationships" %>
<%@ Import Namespace="Crm.Model.Lookups" %>
<%@ Import Namespace="Crm.Model.Relationships" %>
<%@ Import Namespace="Customer.Ramseier.Model.Extensions" %>

<asp:content ID="Title" ContentPlaceHolderID="TitleContent" runat="server">
	<title>
		<%= Html.Localize("VisitReport") %>
	</title>

	<script type="text/javascript">
        window.onload = function () {
            $(".print").click(function () {
                window.print();
            });
            $(".closebutton").click(function () {
                window.close();
            });
        }
    </script>

	<style>
		body, .print-options {
			min-width: 500px;
		}
		table, table *, .logo-and-title, html, body {
			box-sizing: border-box;
			background: #fff !important;
		}
		#visitreport-container {
			background: #fff;
			margin: 0 auto;
			width: 95%;
			padding: 0;
		}
		h1 {
			font-size: 1.4em !important;
		}
		table {
			width: 100%;
			border-top: 1px solid #eee !important;
			border-right: 1px solid #eee !important;
			padding: 0 10px;
		}
		table td, table tr, table th {
			border: 1px solid #eee;
		}
		table tr {
			border-bottom: none;
		}
		table td, table th, .form-element-title {
			border-top: none;
			border-right: none;
			padding: 10px;
		}
		.form-element-response {
			padding: 0 10px;
		}
		.p-l-0 {
			padding-left: 0 !important;
		}
		table td, .noprintbreak {
			page-break-inside: avoid !important;
		}
		ol li {
			list-style-type: decimal;
			margin-left: 20px;
		}
		.logo-and-title {
			overflow: hidden;
			padding: 0;
			margin-bottom: 5px;
			position: relative;
			min-height: 43px;
		}
		.logo-and-title h1 {
			position: absolute;
			bottom: 0;
		}
		.logo-and-title img {
			position: relative;
			float: right;
			bottom: 0;
			right: 0;
		}
		thead {
			display: table-header-group;
		}
		tfoot {
			display: table-footer-group;
		}
		.print-options {
			background: #f0e68c;
			padding: 10px 25px 25px;
			overflow: hidden;
		}
		form label.field {
			float: left;
			width: 200px;
			clear: none;
		}
		form label.field + label {
			margin-left: 5px;
			width: 75px;
		}
		.closebutton {
			margin-left: 15px;
		}
		.center {
			text-align: center;
		}
		.w30p {
			width: 30%;
		}
		th, .form-element-title {
			font-weight: bold !important;
		}
		th[colspan='5'], th[colspan='4'], th[colspan='3'] {
			background: #eee !important;
		}
		p {
			margin: 10px 0;
		}
	</style>

	<style media="print">
		@font-face {
			font-weight: normal;
			font-style: normal;
		}
		.no-print {
			display: none;
		}
		[contenteditable], [contenteditable] * {
			background: #ffffff !important;
		}
	</style>
</asp:content>

<asp:content ID="Main" ContentPlaceHolderID="MainContent" runat="server">
	<%
		var visitReport = Model.Item;
		Func<string, string> translate = s =>
		{
			var t = Model.ResourceManager.GetTranslation(s, new CultureInfo(Model.SelectedLanguage));
			return t ?? $"TranslationNotFound({s})";
		};
		var visitParent = visitReport.Company;
		var participants = visitReport.Visit?.ContactPersonRelationships ?? new List<ContactPersonRelationship>();
		var statistics =  new List<Customer.Ramseier.Model.Turnover>();
		var relationships = visitParent?.BusinessRelationships ?? new List<BusinessRelationship>();
	%>

	<div class="no-print print-options">
		<form action="" method="GET">
			<div class="left">
				<label class="field">
					<span class="description">&nbsp;</span>
					<a class="btn btn-success print"><%= Html.Localize("Print") %></a>
					<a class="btn btn-warning closebutton"><%= Html.Localize("Close") %></a>
				</label>
			</div>
			<div style="position: absolute; right: 0">
				<label class="field">
					<span class="description"><%= Html.Localize("Language") %>:</span>
					<select class="form-control" name="language">
						<% foreach (KeyValuePair<string, string> lang in Model.Languages) { %>
							<option <%= lang.Key == Model.SelectedLanguage ? "selected" : "" %> value="<%= lang.Key %>"><%= lang.Value %></option>
						<% } %>
					</select>
				</label>
				<label class="field">
					<span class="description">&nbsp;</span>
					<input class="btn btn-default btn-sm" type="submit" value="<%= Html.Localize("Change") %>" />
				</label>
			</div>
		</form>
	</div>

	<div id="visitreport-container">
		<div class="logo-and-title">
			<% if (Model.Site.ReportLogo != null) { %>
				<img src="data:image/png;base64,<%= Convert.ToBase64String(Model.Site.ReportLogo) %>" alt="logo" class="logo" />
			<% } %>
			<h1><%= translate(visitReport.ActualType.Name) %></h1>
		</div>
    <hr/>
		<table style="border-collapse:collapse;width:60%">
			<tr>
                <td style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("ReportBy") %></span>
                    <span><%= Html.UserDisplayName(visitReport.ResponsibleUserObject.DisplayName) %></span>
                </td>
								<td style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
									<span style="font-weight: bold"><%= translate("Date") %></span>:
									<span><%= visitReport.Date.ToShortDateString()  %></span>
								</td>
            </tr>
		</table>
		
        <table style="border-collapse:collapse" >
            <tr>
                <td style="border-right-style: hidden;width: 40px"></td>
                <td>
                    <table style="border-collapse:collapse" >
						<% if (visitParent?.LegacyId != null) { %>
                        <tr>
                            <td colspan="2" style="border-right-style: hidden;border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                                <span style="font-weight: bold"><%= translate("KdNr") %></span> :
                                <%= visitParent?.LegacyId %>
                            </td>
                        </tr>
						<% } %>
						<tr>
                            <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                                <span style="font-weight: bold"><%= translate("Company") %></span>
                                <%= visitParent?.Name %>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                                <span style="font-weight: bold"><%= translate("Street") %></span>:
                                <% if (visitReport.Visit != null) { %>
                                    <%= visitReport.Visit.Address.Street %>
                                <% } %>
                                <% if (visitReport.Visit == null) { %>
                                    <%= visitParent?.Addresses.First().Street %>
                                <% } %>
                                <br />
                                <span style="font-weight: bold"><%= translate("City") %></span>:
                                <% if (visitReport.Visit != null) { %>
								<%= visitReport.Visit.Address.ZipCode %> <%= visitReport.Visit.Address.City %>
                                <% } %>
                                <% if (visitReport.Visit == null) { %>
                                    <%= visitParent?.Addresses.First().ZipCode %> <%= visitParent?.Addresses.First().City %>
                                <% } %>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                                <span style="font-weight: bold"><%= translate("TeleNo") %></span> :
                                <%= visitParent?.Addresses?.First().Phones?.FirstOrDefault()?.Data %>
                            </td>
                        </tr>
                    </table>
                </td>
                <% if (visitReport.Visit != null) { %>
                <td style="border-left-style: hidden;">
                    <span style="font-weight: bold"><%= translate("ReferencePersons") %></span> 
                    <br/>
                    <%
                        foreach (var participant in participants)
                        {
                    %>
                        <span><%= participant?.RelationshipType.Value %></span> : <span><%= participant?.Child.Name %></span><br/>
                    <%
						}
                    %>
                </td>
                <% } %>
            </tr>
        </table>
        <table style="border-collapse:collapse;">
            <tr>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("SalesPY") %></span> : 
                    <%= statistics.FirstOrDefault(x => x.ContactKey == visitParent?.Id)?.TotalPreviousYear %>
                </td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("PotGes") %> </span> :
                    <%= visitParent?.CompanyGroupFlag2?.Value %>
                </td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden"></td>
            </tr>
            <tr>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden"></td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden"></td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("Classification") %></span> :
                    <%= visitParent?.CompanyGroupFlag1?.Value %>
                </td>
            </tr>
            <tr>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("SalesLY") %></span> :
                    <%= statistics.FirstOrDefault(x => x.ContactKey == visitParent?.Id)?.TotalCurrentYear %>
                </td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("SalesTarget") %></span> :
                    <%= visitParent?.CompanyGroupFlag3?.Value %>
                </td>
                <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden;border-bottom-style: hidden"></td>
            </tr>
        </table>
        <hr/>
		<table style="border-collapse:collapse;width:60%">
			<tr>
                <td style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("Industry") %></span> :
                </td>
				<td  style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
					 <p>
						<%= visitParent?.BackgroundInfo %>
					</p>
				</td>
            </tr>
		</table>
        <hr/>
		<table style="border-collapse:collapse;width:60%">
			<tr>
                <td style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
                    <span style="font-weight: bold"><%= translate("Demand") %></span> :
                </td>
				<td  style="border-top-style: hidden; border-left-style: hidden;border-right-style: hidden;border-bottom-style: hidden">
					 <%= visitParent?.GetExtension<CompanyExtension>().Needs %>
				</td>
            </tr>
		</table>
        <hr/>
        <div>
            <%
                foreach (var relationship in relationships)
                {
            %>
                <span style="font-weight: bold"><%= translate("Competitor") %></span> :<span><%= relationship?.Child.Name %></span> <br/>
            <%
                        }
            %>
        </div>
        <hr/>
        <div>
            <span style="font-weight: bold"><%= translate("TypeOfVisitShortBez") %></span> :
            <% if (visitReport.Visit != null) { %>
                <span><%= visitReport.Visit.VisitAimKey.IsNotNullOrEmpty() ? visitReport.Visit.VisitAim.Value : visitReport.Visit.CustomAim %></span>
            <% } %>
        </div>
        <hr/>
        <table>
				<tr>
					<td colspan="5">
						<div id="visit-report-dynamic-form" data-visit-report-id="<%= Model.Item.Id %>">
							<p data-bind="visible: false">
								<img src="<%= Url.Content("~/Content/img/ajax-loader.gif") %>" />
							</p>
							<div data-bind="visible: true" style="display: none; margin: 0 5px;">
								<!-- ko foreach: groupedElements -->
								<div class="section" data-bind="foreach: $data">
									<div class="row elementgroup" data-bind="foreach: $data">
										<div data-bind="css: 'form-element col-xs-' + 12 / $data.Size(), visible: $root.showInResponse($data)">
											<% Html.RenderAction("ResponseTemplates", "DynamicForm", new { plugin = "Crm.DynamicForms" }); %>
										</div>
									</div>
								</div>
								<!-- /ko -->
							</div>
						</div>
					</td>
				</tr>
				
				<tr>
					<th colspan="5"><%= translate("Topics") %>:</th>
				</tr>
				<tr>
					<th>&nbsp;</th>
					<th colspan="2"><%= translate("Subject") %></th>
					<th colspan="2"><%= translate("Topic") %></th>
				</tr>
				<% foreach (VisitReportTopicNote topic in Model.Topics) { %>
					<tr>
						<th style="width: 10px"><%= Model.Topics.IndexOf(topic) + 1 %>.</th>
						<td colspan="2">
							<div class="noprintbreak" contenteditable="true">
								<p><%= topic.Subject %></p>
								<% var imageFiles = (topic.Files ?? new Collection<FileResource>()).Where(x =>
									   x.Filename.EndsWith(".gif", true, CultureInfo.InvariantCulture) ||
									   x.Filename.EndsWith(".jpeg", true, CultureInfo.InvariantCulture) ||
									   x.Filename.EndsWith(".jpg", true, CultureInfo.InvariantCulture) ||
									   x.Filename.EndsWith(".png", true, CultureInfo.InvariantCulture)).ToList(); %>
								<% if (imageFiles.Any()) { %>
									<% foreach (FileResource file in imageFiles) { %>
										<img src="data:image/<%= file.Filename.Split('.').Last() %>;base64,<%= Convert.ToBase64String(file.Content) %>" alt="<%= file.Filename %>" title="<%= file.Filename %>"  />
									<% } %>
								<% } %>
							</div>
						</td>

						<td colspan="2">
							<p class="note-text"><%= topic.DisplayText.ReplaceLineBreaks("<br />") %></p>
						</td>
					</tr>
				<% } %>
				<tr>
					<th colspan="5">
						<%= translate("Tasks") %>:
					</th>
				</tr>
				<tr>
					<th>&nbsp;</th>
					<th colspan="2"><%= translate("Description") %></th>
					<th><%= translate("Responsible") %></th>
					<th><%= translate("DueDate") %> / <%= translate("Completed") %></th>
				</tr>
				<% foreach (Task task in Model.Tasks) { %>
						<tr <%= task.IsActive ? "" : "class=\"strike\"" %>>
							<th style="width: 10px"><%= Model.Tasks.IndexOf(task) + 1 %>.</th>
							<td colspan="2"><div class="pre"><%= task.Text %></div></td>
							<td><%= task.ResponsibleUser %></td>
							<td>
								<%= task.DueDate.GetValueOrDefault().ToShortDateString() %>
								<%= task.IsActive ? "" : $"/ {task.ModifyDate.ToShortDateString()}" %>
							</td>
						</tr>
					<% } %>
		</table>
	</div>
	<%= Html.JsResource("jayDataJs") %>
	<%= Html.JsResource("Crm.VisitReport", "visitReportDetailsJs") %>
</asp:content>
