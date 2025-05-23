<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Application.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.AutoFac" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Crm.Library.Rest" %>
<%@ Import Namespace="Combres.Mvc" %>

<asp:Content ID="HeaderContent" ContentPlaceHolderID="HeaderContent" runat="server">
	<%= Html.CombresLink("dynamicFormsCss") %>
	<%= Html.CombresLink("sweconDynamicFormCss") %>
</asp:Content>
<asp:Content ID="MainContent" ContentPlaceHolderID="MainContent" runat="server">
	<div class="reportcontainer">
		<div class="report">
			<div class="header" style="height: 75px;">
				<div style="float:left; padding-top: 20px;">
					<img style="margin-left: -6mm; width: 99.99mm; height: 14.99mm" src="<%= Url.Content("~/Plugins/Customer.Swecon.Schultes/Content/img/Logo_Schultes.png") %>" />
				</div>
			</div>
		</div>
	</div>
</asp:Content>