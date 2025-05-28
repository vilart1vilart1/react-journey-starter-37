<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Application.Master" Inherits="Crm.Library.Modularization.CrmViewPage<Customer.Ramseier.ViewModels.VisitReportViewModel>" %>
<%@ Import Namespace="System.Activities.Expressions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>
<%@ Import Namespace="System.Collections.ObjectModel" %>
<%@ Import Namespace="System.Globalization" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Library.Extensions" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Model" %>
<%@ Import Namespace="Crm.VisitReport.Model.Relationships" %>
<%@ Import Namespace="Customer.Ramseier.Model.Extensions" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>
<%@ Import Namespace="Crm.VisitReport" %>

<asp:content ID="Main" ContentPlaceHolderID="MainContent" runat="server">
  <%
    var participants = Model.visit?.ContactPersonRelationships ?? new List<ContactPersonRelationship>();  	
  %>

  <div id="visitreport-container">
      <div class="dynamic-form-response-header">   
      </div>
      <h3><%= Model.formReference.Filename  %></h3>
      <table style="border-collapse: collapse; width: 60%">
          <tr>
              <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("ReportBy") %></span>
                  <% if (Model.formReference?.ResponsibleUserObject != null) { %>
                  <span><%= Html.UserDisplayName(Model.formReference.ResponsibleUserObject.DisplayName)  %></span>
                  <% } %>
              </td>
              <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("Date") %></span>:
                      <span><%= Model.formReference?.Date.ToShortDateString()  %></span>
              </td>
          </tr>
      </table>
      <br />
      <table style="border: 1px solid black; width: 100%">
          <tr>
              <td style="width: 40px"></td>
              <td>
                  <table style="border-collapse: collapse">
                      <% if (Model.Company.LegacyId != null) { %>
                      <tr>
                          <td colspan="2" style="padding-top: 20px; border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                              <span style="font-weight: bold"><%= Html.Localize("KdNr") %></span>:
                                  <span><%= Model.Company.LegacyId  %></span>
                          </td>
                      </tr>
                      <% } %>
                      <tr>
                          <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                              <span style="font-weight: bold"><%= Html.Localize("Company") %></span>:
                                  <span><%= Model.Company.Name  %></span>
                          </td>
                      </tr>
                      <tr>
                          <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                              <span style="font-weight: bold"><%= Html.Localize("Street") %></span>:
                              <% if (Model.visit != null) { %>
                              <%= Model.visit.Address.Street %>
                              <% } %>
                              <% if (Model.visit == null) { %>
                              <%= Model.CompanyAddresses.First().Street %>
                              <% } %>
                              <br />
                              <span style="font-weight: bold"><%= Html.Localize("City") %></span>:
                                    <% if (Model.visit != null) { %>
                              <%= Model.visit.Address.ZipCode %> <%= Model.visit.Address.City %>
                              <% } %>
                              <% if (Model.visit == null) { %>
                              <%= Model.CompanyAddresses?.First().ZipCode %> <%= Model.CompanyAddresses?.First().City %>
                              <% } %>
                          </td>
                      </tr>
                      <tr>
                          <td colspan="2" style="padding-bottom: 20px; border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                              <span style="font-weight: bold"><%= Html.Localize("TeleNo") %></span>:
                                  <%= Model.Company?.Addresses?.First().Phones?.FirstOrDefault()?.Data %>
                          </td>
                      </tr>
                  </table>
              </td>
              <% if (Model.visit != null) { %>
              <td style="border-left-style: hidden;">
                  <span style="font-weight: bold"><%= Html.Localize("ReferencePersons") %></span>
                  <br />
                  <% foreach (var participant in participants) {
                  %> <span><%= participant?.RelationshipType.Value %></span> : <span><%= participant?.Child.Name %></span><br />
                  <%}%>
              </td>
              <% } %>
          </tr>
      </table>
      <br />
      <table style="width: 100%">
          <tr>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("SalesPY") %></span>:
                   <% foreach (var statistics in Model.statistics)
                   {%>
                  <%= statistics?.TotalPreviousYear %>
                  <% } %>
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("PotGes") %></span>:
                      <span><%= Model.formReference.Company?.CompanyGroupFlag2?.Value %></span>
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>

              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("Classification") %></span>:
                      <span><%= Model.formReference.Company?.CompanyGroupFlag1?.Value %></span>
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>
          </tr>
          <tr>
          </tr>
          <tr>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("SalesLY") %></span>:
                   
                  <% foreach (var statistics in Model.statistics)
                  {%>
                  <%= statistics?.TotalCurrentYear %>

                  <% } %>
           
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("SalesTarget") %></span>:
              <span><%= Model.formReference.Company?.CompanyGroupFlag3?.Value %></span>
              </td>
          </tr>
      </table>
      <hr />
      <table style="border-collapse: collapse; width: 100%">
          <tr>
              <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("Industry") %></span>:
              <span><%= Model.formReference.Company?.BackgroundInfo %></span>
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>
          </tr>
      </table>
      <hr />
      <table style="border-collapse: collapse; width: 100%">
          <tr>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                  <span style="font-weight: bold"><%= Html.Localize("Needs") %></span>:
                     <span><%= Model.formReference.Company?.GetExtension<CompanyExtension>().Needs %></span>
              </td>
              <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>

          </tr>
      </table>
      <hr />
      <div>
          <span style="font-weight: bold"><%= Html.Localize("Supplier") %></span>:
              <% foreach (var relationshipsChild in Model.relationshipsChild)
           {%>
          <span><%= relationshipsChild?.Name %></span>
          <br />
          <% } %>
      </div>
      <hr />
      <div>
          <span style="font-weight: bold"><%= Html.Localize("TypeOfVisitShortBez") %></span>:
       <% if (Model.visit != null) { %>
          <span><%= Model.visit.VisitAimKey.IsNotNullOrEmpty() ? Model.visit.VisitAim.Value : Model.visit.CustomAim %></span>
          <% } %>
      </div>
      <hr />
  </div>
  <%= Html.CssResource("Crm.DynamicForms", "dynamicFormsCss") %>
  <%= Html.JsResource("jayDataJs") %>
  <%= Html.JsResource("Crm.VisitReport", "visitReportDetailsJs") %>
</asp:content>