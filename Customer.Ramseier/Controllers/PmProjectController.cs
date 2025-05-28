namespace Customer.Ramseier.Controllers
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm;
    using Crm.Controllers;
    using Crm.ErpIntegration.ProAlphaBase;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Model;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;
    using Crm.ViewModels;

    public class PmProjectController : CrmController, IReplaceRegistration<Crm.ErpIntegration.ProAlphaBase.Controllers.PmProjectController>
    {
        [RequiredPermission(ProAlphaBasePlugin.Permissions.PermissionName.PmProjectView, Group = ProAlphaBasePlugin.Permissions.PermissionGroup.PmProject)]
        public ActionResult DetailsTemplate()
        {
            return PartialView(new CrmModel());
        }

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 15)]
        [RequiredPermission(ProAlphaBasePlugin.Permissions.PermissionName.PmProjectsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialPmProjectsTabHeader()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 15)]
        [RequiredPermission(ProAlphaBasePlugin.Permissions.PermissionName.PmProjectsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialPmProjectsTab()
        {
            return PartialView(new CrmModel());
        }

        public PmProjectController(
            IPdfService pdfService,
            RestTypeProvider restTypeProvider,
            IRenderViewToStringService renderViewToStringService,
            RouteCollection routeCollection,
            ILookupManager lookupManager,
            IResourceManager resourceManager,
            IRuleValidationService ruleValidationService)
            : base(
                pdfService,
                restTypeProvider,
                renderViewToStringService,
                routeCollection,
                lookupManager,
                resourceManager,
                ruleValidationService)
        {
        }
    }
}