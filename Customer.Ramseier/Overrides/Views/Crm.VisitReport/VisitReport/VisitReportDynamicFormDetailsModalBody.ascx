<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Extensions" %>
<%@ Import Namespace="Crm.Model" %>
<%@ Import Namespace="Crm.Offline.Extensions" %>

<!-- ko with: formReference -->
<table style="border-collapse: collapse; width: 60%">
    <tr>
        <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'ReportBy'"></span>
            <!-- ko if: ResponsibleUserUser() -->
            <span data-bind="text: Helper.User.getDisplayName(ResponsibleUserUser())"></span>
            <!-- /ko -->
        </td>
        <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'Date'"></span>:
            <span data-bind="dateText : Date"></span>
        </td>
    </tr>
</table>
<br />
<table style="border: 1px solid black; width: 100%">
    <tr>
        <td style="width: 40px"></td>
        <td>
            <table style="border-collapse: collapse">
                <tr data-bind="visible: Company().LegacyId()">
                    <td colspan="2" style="padding-top: 20px; border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                        <span style="font-weight: bold" data-bind="translatedText: 'KdNr'"></span>:
                        <span data-bind="text: Company().LegacyId()"></span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                        <span style="font-weight: bold" data-bind="translatedText: 'Company'"></span>:
                                <span data-bind="text: Company().Name()"></span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                        <span style="font-weight: bold" data-bind="translatedText: 'Street'"></span>:
                                <!-- ko if: Visit() && Visit().Address() -->
                        <span data-bind="text: Visit().Address().Street()"></span>
                        <!-- /ko -->
                        <!-- ko if: !Visit() && Company().Addresses() -->
                        <span data-bind="text: Company().Addresses()[0].Street()"></span>
                        <!-- /ko -->
                        <br />
                        <span style="font-weight: bold" data-bind="translatedText: 'City'"></span>:
                        <!-- ko if: Visit() && Visit().Address() -->
                        <span data-bind="text: Visit().Address().ZipCode()"></span> <span data-bind="text: Visit().Address().City()"></span>
                        <!-- /ko -->
                        <!-- ko if: !Visit() && Company().Addresses() -->
                        <span data-bind="text: Company().Addresses()[0].ZipCode()"></span> <span data-bind="text: Company().Addresses()[0].City()"></span>
                        <!-- /ko -->
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="padding-bottom: 20px; border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
                        <span style="font-weight: bold" data-bind="translatedText: 'TeleNo'"></span>:
                                <!-- ko if: Company().Addresses() && Company().Addresses()[0].Phones().length>0 -->
                        <span data-bind="text: Company().Addresses()[0].Phones()[0].Data"></span>
                        <!-- /ko -->
                    </td>
                </tr>
            </table>
        </td>
        <td>
            <!-- ko if: Visit() -->
            <span style="font-weight: bold" data-bind="translatedText: 'ReferencePersons'"></span>
            <br />
            <!-- ko with: $root -->
            <% using (Html.TemplateForEach("participants()"))
                       { %>
            <span data-bind="text: window.Helper.Lookup.getLookupValue($root.lookups.contactPersonRelationshipTypes, RelationshipTypeKey)"></span>: <span data-bind="text: Child().Firstname()"></span> <span data-bind="text: Child().Surname()"></span><br />
            <% } %>
            <!-- /ko -->
            <!-- /ko -->
        </td>
    </tr>
</table>
<br />
<table style="width: 100%">
    <tr>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'SalesPY'"></span>:
                    <!-- ko with: $root -->
            <% using (Html.TemplateForEach("statistics()"))
                       { %>
            <span data-bind="money: TotalPreviousYear"></span>
            <% } %>
            <!-- /ko -->
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'PotGes'"></span>:
                    <span data-bind="text: window.Helper.Lookup.getLookupValue($root.lookups.companyGroupFlags2, Company().CompanyGroupFlag2Key)"></span>
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>

        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'Classification'"></span>:
                    <span data-bind="text: window.Helper.Lookup.getLookupValue($root.lookups.companyGroupFlags1, Company().CompanyGroupFlag1Key)"></span>
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>
    </tr>
    <tr>
    </tr>
    <tr>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'SalesLY'"></span>:
                    <!-- ko with: $root -->
            <% using (Html.TemplateForEach("statistics()"))
                       { %>
            <span data-bind="money: TotalCurrentYear"></span>
            <% } %>
            <!-- /ko -->
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'SalesTarget'"></span>:
            <span data-bind="text: window.Helper.Lookup.getLookupValue($root.lookups.companyGroupFlags3, Company().CompanyGroupFlag3Key)"></span>
        </td>
    </tr>
</table>
<hr />
<table style="border-collapse: collapse; width: 100%">
    <tr>
        <td style="border-top-style: hidden; border-left-style: hidden; border-right-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'Industry'"></span>:
            <span data-bind="text: Company().BackgroundInfo()"></span>
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>
    </tr>
</table>
<hr />
<table style="border-collapse: collapse; width: 100%">
    <tr>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden">
            <span style="font-weight: bold" data-bind="translatedText: 'Needs'"></span>:
                     <!-- ko with: Company().ExtensionValues() -->
            <span data-bind="text: Needs"></span>
            <!-- /ko -->
        </td>
        <td style="border-right-style: hidden; border-left-style: hidden; border-top-style: hidden; border-bottom-style: hidden"></td>

    </tr>
</table>
<hr />
<div>
    <span style="font-weight: bold" data-bind="translatedText: 'Supplier'"></span>:
    <!-- ko with : $root -->
    <% using (Html.TemplateForEach("relationships()")){ %>
        <span data-bind="text: Child().Name()"></span><br />
    <% } %>
    <!-- /ko -->
</div>
<hr />
<div>
    <span style="font-weight: bold" data-bind="translatedText: 'TypeOfVisitShortBez'"></span>:
    <!-- ko if: Visit() && Visit().VisitAimKey() -->
        <span data-bind="text: window.Helper.Lookup.getLookupValue($root.lookups.visitAims, Visit().VisitAimKey)"></span>
    <!-- /ko -->
    <!-- ko if: Visit() && Visit().CustomAim() -->
    <span data-bind="text: Visit().CustomAim() "></span>
    <!-- /ko -->
</div>
<hr />
<!-- /ko -->

