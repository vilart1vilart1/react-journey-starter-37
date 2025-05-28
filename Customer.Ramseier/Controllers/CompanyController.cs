namespace Customer.Ramseier.Controllers
{
    using Crm;
    using Crm.Controllers;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Model;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;
    using Crm.ViewModels;
    using Crm.VisitReport;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class CompanyController : CrmController,IReplaceRegistration<Crm.VisitReport.Controllers.CompanyController>
    {
        public CompanyController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService)
            : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
        {
        }

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 85)]
        [RequiredPermission(VisitReportPlugin.PermissionName.VisitsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialVisitsDetailsTabHeader() => PartialView();

        [RenderAction("CompanyDetailsMaterialTab", Priority = 85)]
        [RequiredPermission(VisitReportPlugin.PermissionName.VisitsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialVisitsDetailsTab() => PartialView(new CrmModel());

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 80)]
        [RequiredPermission(VisitReportPlugin.PermissionName.VisitReportsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialVisitReportsTabHeader() => PartialView();

        [RenderAction("CompanyDetailsMaterialTab", Priority = 80)]
        [RequiredPermission(VisitReportPlugin.PermissionName.VisitReportsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialVisitReportsTab() => PartialView();
    }
}