namespace Customer.Ramseier.Controllers
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
    using Crm.Services;
    using Crm.Controllers;

    public class CustomErpDocumentController : CrmController
    {
        public CustomErpDocumentController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService) : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
        {
        }

        public ActionResult DocumentsList()
        {
            return PartialView();
        }

    }
}
