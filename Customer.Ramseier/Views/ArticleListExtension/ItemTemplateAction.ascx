<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<li>
	<a href="#" data-bind="attr: { 'data-route': 'Customer.Ramseier/ArticleListExtension/ViewDocuments/' + Id() }" data-toggle="modal" data-target="#modal">
		<%= Html.Localize("Documents") %>
	</a>
</li>