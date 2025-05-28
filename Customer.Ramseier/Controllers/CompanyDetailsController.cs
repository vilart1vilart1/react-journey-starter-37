namespace Customer.Ramseier.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm;
    using Crm.Controllers;
    using Crm.Library.AutoFac;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Model;
    using Crm.Library.Model.Authorization.PermissionIntegration;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Crm.Model.Relationships;
    using Crm.Services;
    using Crm.Services.Interfaces;
    using Crm.ViewModels;
    using PermissionGroup = Crm.MainPlugin.PermissionGroup;


    public class CompanyDetailsController : CrmController, IReplaceRegistration<Crm.Controllers.CompanyDetailsController>

    {
        private readonly ICompanyService companyService;
        private readonly IRepositoryWithTypedId<Company, Guid> companyRepository;
        private readonly IAppSettingsProvider appSettingsProvider;

        public CompanyDetailsController(IRepositoryWithTypedId<Company, Guid> companyRepository, IRuleValidationService ruleValidationService, ICompanyService companyService, IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IAppSettingsProvider appSettingsProvider)
          : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
        {
            this.companyRepository = companyRepository;
            this.companyService = companyService;
            this.appSettingsProvider = appSettingsProvider;
        }


        [RequiredPermission(PermissionName.Read, Group = PermissionGroup.Company)]
        [RequiredEntityVisibility(typeof(Company))]
        [RenderAction("CompanyDetailsTabHeader", Priority = 90)]
        public ActionResult RelationshipsTabHeader(Guid id)
        {
            var company = companyRepository.Get(id);

            if (company == null)
            {
                return new EmptyResult();
            }

            return PartialView(company.BusinessRelationships.Count);
        }

        [RequiredPermission(MainPlugin.PermissionName.RelationshipsTab, Group = PermissionGroup.Company)]
        [RequiredEntityVisibility(typeof(Company))]
        [RenderAction("CompanyDetailsTab", Priority = 90)]
        public ActionResult RelationshipsTab(Guid id)
        {
            var company = companyRepository.Get(id);

            if (company == null)
            {
                return new EmptyResult();
            }

            var model = new CompanyRelationshipTab
            {
                Item = company,
                BusinessRelationshipIndelibleTypeKeys = appSettingsProvider.GetValue(MainPlugin.Settings.Company.BusinessRelationshipIndelibleTypeKeys)
            };
            return PartialView(model);
        }

        [HttpPost]
        [RequiredPermission(PermissionName.Edit, Group = PermissionGroup.Company)]
        public ActionResult SaveBusinessRelationship(BusinessRelationship relationship)
        {
            var ruleViolations = ruleValidationService.GetRuleViolations(relationship);
            if (ruleViolations.Any())
            {
                relationship.Child = companyRepository.Get(relationship.ChildId);
                var model = new CrmModelItem<BusinessRelationship>
                {
                    Item = relationship
                };
                model.AddRuleViolations(ruleViolations);

                return Json(new
                {
                    RelationshipAdd = RenderPartialToString("CompanyDetailsAction/BusinessRelationshipAdd", model)
                });
            }

            companyService.SaveBusinessRelationship(relationship);

            var companyRelationshipTab = new CompanyRelationshipTab
            {
                Item = companyRepository.Get(relationship.ParentId),
                BusinessRelationshipIndelibleTypeKeys = appSettingsProvider.GetValue(MainPlugin.Settings.Company.BusinessRelationshipIndelibleTypeKeys)
            };

            return Json(new
            {
                TabRelationships = RenderPartialToString("RelationshipsTab", companyRelationshipTab)
            });
        }

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 100)]
        public ActionResult MaterialDetailsTabHeader()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 100)]
        public ActionResult MaterialDetailsTab()
        {
            var model = new CompanyEditorViewModel
            {
                AllowCompanyTypeSelection = appSettingsProvider.GetValue(MainPlugin.Settings.Company.AllowCompanyTypeSelection),
                CompanyGroupFlagsAreSearchable = appSettingsProvider.GetValue(MainPlugin.Settings.Search.CompanyGroupFlagsAreSearchable)
            };
            return PartialView(model);
        }

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 75)]
        [RequiredPermission(MainPlugin.PermissionName.StaffTab, Group = MainPlugin.PermissionGroup.Company)]
        public  ActionResult MaterialStaffTabHeader()
        {
            return PartialView();
        }
        [RenderAction("CompanyDetailsMaterialTab", Priority = 75)]
        [RequiredPermission(MainPlugin.PermissionName.StaffTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialStaffTab()
        {
            return PartialView(new CrmModel());
        }
        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 70)]
        [RequiredPermission(MainPlugin.PermissionName.TasksTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialTasksTabHeader()
        {
            return PartialView();
        }
        [RenderAction("CompanyDetailsMaterialTab", Priority = 70)]
        [RequiredPermission(MainPlugin.PermissionName.TasksTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialTasksTab()
        {
            return PartialView(new CrmModel());
        }
        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 65)]
        [RequiredPermission(MainPlugin.PermissionName.NotesTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialNotesTabHeader()
        {
            return PartialView();
        }
        [RenderAction("CompanyDetailsMaterialTab", Priority = 65)]
        [RequiredPermission(MainPlugin.PermissionName.NotesTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialNotesTab()
        {
            return PartialView();
        }


        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 60)]
        public ActionResult MaterialDiscountsTabHeader()
        {
            return PartialView();
        }
        [RenderAction("CompanyDetailsMaterialTab", Priority = 60)]
        public ActionResult MaterialDiscountsTab()
        {
            return PartialView(new CrmModel());
        }


        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 54)]
        [RequiredPermission(MainPlugin.PermissionName.DocumentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialDocumentsTabHeader()
        {
            return PartialView("ContactDetails/MaterialDocumentsTabHeader");
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 54)]
        [RequiredPermission(MainPlugin.PermissionName.DocumentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialDocumentsTab()
        {
            return PartialView("ContactDetails/MaterialDocumentsTab");
        }

       

    }
}
