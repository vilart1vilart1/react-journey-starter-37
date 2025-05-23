<%@ Control Language="C#" Inherits="System.Web.Mvc.ViewUserControl<Customer.Swecon.Schultes.ViewModels.CustomChecklistInstallationTypeRelationshipViewModel>" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Combres.Mvc" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%= Html.CombresLink("customerChecklistInstallationTypeDesignerJs") %>
<% using (Html.TemplateContext("form")) { %>
	<div class="tab-pane fade " id="checklistInstallationTypeRelationshipCustom" data-bind="visible: CategoryKey() == 'Checklist'">
		<div class="box ptpx15">
			<div class="entry clearfix no-border">
				<%= Html.Localize("Loading") %>
			</div>
		</div>
	</div>
<% } %>