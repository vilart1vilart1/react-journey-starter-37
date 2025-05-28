<%@ Page Language="C#" Inherits="Crm.Library.Modularization.CrmViewPage" MasterPageFile="Response.Master" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>

<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
    <div class="whitebox">
        <% using (Html.TemplateContext("$root.DynamicForm")) { %>
			<% using (Html.TemplateForEach("$root.groupedElements()")) { %>
					<div class="section">
						<% using (Html.TemplateForEach("$data")) { %>
							<div class="row elementgroup">
								<% using (Html.TemplateForEach("$data")) { %>
									<div data-bind="css: 'form-element col-xs-' + 12 / $data.Size() + ' form-element-' + $data.FormElementType().toLowerCase(), visible: $root.showInResponse($data)">
										<% Html.RenderAction("ResponseTemplates", "DynamicForm", new { plugin = "Crm.DynamicForms" }); %>
									</div>
								<% } %>                    
							</div>
						<% } %>
					</div>
				<% } %>
        <% } %>
        <div class="dynamic-form-response-footer">
            <% Html.PluginRenderActions("DynamicFormResponseFooter"); %>
        </div>
        <% using (Html.TemplateContext("$root.DynamicForm")) { %>
            <div data-bind="visible: $data.Elements().indexOf(window.ko.utils.arrayFirst($data.Elements(), function (element) { return element.FormElementType() === 'SignaturePadWithPrivacyPolicy' && (!!element.Required && element.Required() == true || $root.DynamicForm().HideEmptyOptional() == false || $root.DynamicForm().HideEmptyOptional() == true && !!element.Required && element.Required() == false && (element.Response() != null && element.Response() != '' && ko.toJSON(element.Response) != element.DefaultResponseValue())); })) > -1">
                <% Html.RenderPartial("DataPrivacyPolicy"); %>
            </div>
        <% } %>
    </div>
</asp:Content>