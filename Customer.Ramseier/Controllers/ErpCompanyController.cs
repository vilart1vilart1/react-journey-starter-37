namespace Customer.Ramseier.Controllers
{
    using System;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm;
    using Crm.Controllers;
    using Crm.ErpExtension;
    using Crm.ErpExtension.Model;
    using Crm.ErpExtension.ViewModels;
    using Crm.Helpers;
    using Crm.Library.AutoFac;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Model;
    using Crm.Library.Modularization;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Crm.Services;
    using Crm.ViewModels;

    using NHibernate.Linq;

    public class ErpCompanyController : CrmController,IReplaceRegistration<Crm.ErpExtension.Controllers.ErpCompanyController>
    {
        private readonly IRepositoryWithTypedId<Quote, Guid> quoteRepository;
        private readonly IRepositoryWithTypedId<DeliveryNote, Guid> deliveryNoteRepository;
        private readonly IRepositoryWithTypedId<Invoice, Guid> invoiceRepository;
        private readonly IRepositoryWithTypedId<SalesOrder, Guid> salesOrderRepository;
        private readonly IRepositoryWithTypedId<CreditNote, Guid> creditNoteRepository;
        private readonly IRepositoryWithTypedId<MasterContract, Guid> masterContractRepository;
        private readonly IRepositoryWithTypedId<Contact, Guid> contactRepository;
        private readonly IAppSettingsProvider appSettingsProvider;

        [RenderAction("CompanyDetailsTopMenu", Priority = 10)]
        [RequiredPermission(ErpPlugin.PermissionName.TurnoverTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult CompanyDetailsTopMenu()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsSecondaryAction")]
        [RequiredPermission(ErpPlugin.PermissionName.OpenCompany, Group = ErpPlugin.PermissionGroup.Erp)]
        public ActionResult ErpOpenCompany(string legacyId)
        {
            var companyEnableLinkToErp = appSettingsProvider.GetValue(ErpPlugin.Settings.Company.EnableLinkToErp);
            if (string.IsNullOrEmpty(legacyId) || !companyEnableLinkToErp)
            {
                return null;
            }

            var model = new ErpOpenCompanyViewModel
            {
                Item = legacyId,
                ObjectLinkIntegration = appSettingsProvider.GetValue(ErpPlugin.Settings.System.ObjectLinkIntegration),
                ErpAssemblyName = appSettingsProvider.GetValue(ErpPlugin.Settings.System.ErpAssemblyName)
            };

            return PartialView(model);
        }

        [RequiredPermission(ErpPlugin.PermissionName.DocumentSummary, Group = ErpPlugin.PermissionGroup.Erp)]
        [RenderAction("CompanyDetailsSidebar", "ErpSidebarExtensions")]
        public ActionResult ErpDocumentSummary(Guid? contactId)
        {
            var enableDocumentsOnSidebar = appSettingsProvider.GetValue(ErpPlugin.Settings.UI.EnableDocumentsOnSidebar);
            if (!enableDocumentsOnSidebar || !contactId.HasValue)
            {
                return null;
            }

            var contact = contactRepository.Get(contactId.Value);

            var quotesHeaderCount = quoteRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));
            var salesOrdersHeaderCount = salesOrderRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));
            var invoicesHeaderCount = invoiceRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));
            var deliveryNotesHeaderCount = deliveryNoteRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));
            var creditNotesHeaderCount = creditNoteRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));
            var masterContractsHeaderCount = masterContractRepository.GetAll().ToFutureValue(q => q.Count(x => x.ContactKey == contactId && x.RecordType == "Head"));

            var model = new ErpDocumentSummaryViewModel
            {
                CompanyName = contact.LegacyName,
                CompanyId = contactId,
                QuotesHeaderCount = quotesHeaderCount.Value,
                SalesOrdersHeaderCount = salesOrdersHeaderCount.Value,
                InvoicesHeaderCount = invoicesHeaderCount.Value,
                DeliveryNotesHeaderCount = deliveryNotesHeaderCount.Value,
                CreditNotesHeaderCount = creditNotesHeaderCount.Value,
                MasterContractsHeaderCount = masterContractsHeaderCount.Value
            };

            return View(model);
        }

        [RequiredPermission(ErpPlugin.PermissionName.BackgroundInformationExtension, Group = ErpPlugin.PermissionGroup.Erp)]
        [RenderAction("CompanyBackgroundInformationExtension")]
        public ActionResult ErpBackgroundInformationExtension(Guid? companyId)
        {
            if (!companyId.HasValue || !appSettingsProvider.GetValue(ErpPlugin.Settings.Company.DisplayExtendedBackgroundInformation))
            {
                return new EmptyResult();
            }

            var contact = contactRepository.Get(companyId.Value);
            var companyExtensions = contact.GetExtension<CompanyExtension>();

            var model = new CrmModelItem<CompanyExtension>
            {
                Item = companyExtensions
            };

            return View(model);
        }


        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 95)]
        [RequiredPermission(ErpPlugin.PermissionName.ErpDocumentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialDocumentsTabHeader()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 95)]
        [RequiredPermission(ErpPlugin.PermissionName.ErpDocumentsTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialDocumentsTab()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTabHeader", Priority = 90)]
        [RequiredPermission(ErpPlugin.PermissionName.TurnoverTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialTurnoverTabHeader()
        {
            return PartialView();
        }

        [RenderAction("CompanyDetailsMaterialTab", Priority = 90)]
        [RequiredPermission(ErpPlugin.PermissionName.TurnoverTab, Group = MainPlugin.PermissionGroup.Company)]
        public ActionResult MaterialTurnoverTab()
        {
            return PartialView();
        }


        public ActionResult ObjectLibraryLink(string inforId)
        {
            var contents = new StringBuilder();
            contents.AppendLine("[ILM]");
            contents.AppendLine($"SystemID={appSettingsProvider.GetValue(ErpPlugin.Settings.System.ErpSystemID)}");
            contents.AppendLine("AppID=10100001");
            contents.AppendLine($"FilterCond=([FirmaNr]='{inforId}')");
            contents.AppendLine("FilterView=relFirma");

            return File(
                Encoding.Default.GetBytes(contents.ToString()),
                "application/infor",
                $"{inforId}.iol");
        }

        public ActionResult ObjectD3Link(string inforId)
        {
            return D3IntegrationHelper.OpenD3Document(Response, "IKDSB", "1", inforId);
        }

        [RenderAction("CompanyMaterialDetailsTabExtensions")]
        public ActionResult ErpBackgroundExtensions()
        {
            return PartialView();
        }

        public ErpCompanyController(IRepositoryWithTypedId<Quote, Guid> quoteRepository,
            IRepositoryWithTypedId<DeliveryNote, Guid> deliveryNoteRepository,
            IRepositoryWithTypedId<Invoice, Guid> invoiceRepository,
            IRepositoryWithTypedId<SalesOrder, Guid> salesOrderRepository,
            IRepositoryWithTypedId<CreditNote, Guid> creditNoteRepository,
            IRepositoryWithTypedId<MasterContract, Guid> masterContractRepository,
            IRepositoryWithTypedId<Contact, Guid> contactRepository,
            IAppSettingsProvider appSettingsProvider,
            IPdfService pdfService,
            RestTypeProvider restTypeProvider,
            IRenderViewToStringService renderViewToStringService,
            RouteCollection routeCollection,
            ILookupManager lookupManager,
            IResourceManager resourceManager,
            IRuleValidationService ruleValidationService)
            : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
        {
            this.quoteRepository = quoteRepository;
            this.deliveryNoteRepository = deliveryNoteRepository;
            this.invoiceRepository = invoiceRepository;
            this.salesOrderRepository = salesOrderRepository;
            this.creditNoteRepository = creditNoteRepository;
            this.masterContractRepository = masterContractRepository;
            this.contactRepository = contactRepository;
            this.appSettingsProvider = appSettingsProvider;
        }
    }
}