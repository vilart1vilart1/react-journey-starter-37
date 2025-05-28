<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl<Crm.ViewModels.CrmModelItem<Crm.Library.Model.Usergroup>>" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Customer.Ramseier.Model.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>

<%
var userGroup = Model.Item;
var email = userGroup.GetExtension<UserGroupExtension>().Email;
%>


<div class="whitebox_header">
	<div class="left">
		<h2>
			<%= Html.Localize("Edit") %>
			<%= Model.Item.Name %></h2>
	</div>
	<div class="clearfix">
	</div>
</div>
<div id="usergroup_edit_validation_message">
	<%= Html.LocalizeValidationMessage("_FORM") %>
</div>
<form class="usergroup-edit-form" method="POST">
	<%= Html.Hidden("Id", Model.Item.Id) %>
	<%= Html.WrappedTextBox(Model.Item, x => x.Name, htmlAttributes: new { autocomplete = "off" }.CreateDictionary()) %>
    <label class="control-label">
		<%= Html.Localize("Email") %></label>
	<%= Html.TextBox("email", email, new { @class = "form-control" }) %>
	<p class="submit">
		<%= Html.SubmitButton("edit_usergroup_save", Html.Localize("Save"), new { Class = "submit btn btn-primary" }) %>
		<a href="#" class="useradmin-usergroup-assign-cancel btn btn-default">
			<%= Html.Localize("Cancel") %></a>
	</p>
</form>
