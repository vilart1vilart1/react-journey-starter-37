using Crm;

namespace Customer.Ramseier.Controllers
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm.Controllers;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Model;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;

    using PermissionGroup = MainPlugin.PermissionGroup;

    public class RelationshipController : CrmController,IReplaceRegistration<Crm.Controllers.RelationshipController>
    {
        public RelationshipController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService)
            : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
        {
        }
        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 55)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Company)]
        public ActionResult CompanyDetailsMaterialTabHeader() => PartialView();

        [RenderAction("CompanyDetailsMaterialTab", Priority = 55)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Company)]
        public ActionResult CompanyDetailsMaterialTab() => PartialView();

        [RenderAction("MaterialCompanyItemExtensions", Priority = 50)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Company)]
        public ActionResult MaterialCompanyItemExtensions() => PartialView();

        [RenderAction("CompanyItemTemplateActions", Priority = 50)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Company)]
        public ActionResult CompanyItemTemplateActions() => PartialView();

        [RenderAction("PersonDetailsMaterialTabHeader", Priority = 70)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Person)]
        public ActionResult PersonDetailsMaterialTabHeader() => PartialView();

        [RenderAction("PersonDetailsMaterialTab", Priority = 70)]
        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Person)]
        public ActionResult PersonDetailsMaterialTab() => PartialView();
    }
}