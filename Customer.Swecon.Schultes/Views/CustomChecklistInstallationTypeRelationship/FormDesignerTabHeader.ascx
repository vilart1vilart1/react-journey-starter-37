<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<% using (Html.TemplateContext("form")) { %>
	<li data-bind="visible: CategoryKey() == 'Checklist'">
		<a style="margin-bottom: 1px;" href="#checklistInstallationTypeRelationshipCustom" data-toggle="tab">
			<%= Html.Localize("ChecklistInstallationTypeRelationshipCustom") %>
		</a>
	</li>
<% } %>