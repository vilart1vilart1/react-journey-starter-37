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
    using Crm.Library.Model.Authorization;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;
    using Crm.ViewModels;

    public class SalesAgentController : CrmController,IReplaceRegistration<Crm.ErpIntegration.ProAlphaBase.Controllers.SalesAgentController>
    {
        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 52)]
        [RequiredPermission(ProAlphaBasePlugin.Permissions.PermissionName.SalesAgentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialSalesAgentsTabHeader()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 52)]
        [RequiredPermission(ProAlphaBasePlugin.Permissions.PermissionName.SalesAgentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialSalesAgentsTab()
        {
            return PartialView(new CrmModel());
        }

        public SalesAgentController(
            IPdfService pdfService,
            RestTypeProvider restTypeProvider,
            IRenderViewToStringService renderViewToStringService,
            RouteCollection routeCollection,
            ILookupManager lookupManager,
            IResourceManager resourceManager,
            IRuleValidationService ruleValidationService
        )
            : base(
                pdfService,
                restTypeProvider,
                renderViewToStringService,
                routeCollection,
                lookupManager,
                resourceManager,
                ruleValidationService
            )
        {
        }
    }
}