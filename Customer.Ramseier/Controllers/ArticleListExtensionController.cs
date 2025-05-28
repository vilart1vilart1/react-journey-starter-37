namespace Customer.Ramseier.Controllers
{
	using System.Web.Mvc;
	using System.Web.Routing;

	using Crm.Controllers;
	using Crm.Library.Globalization.Lookup;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Modularization;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
	using Crm.Services;

	public class ArticleListExtensionController : CrmController
	{
		public ArticleListExtensionController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService)
			: base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
		{
		}
		[RenderAction("ArticleItemTemplateActions")]
		public ActionResult ItemTemplateAction()
		{
			return PartialView();
		}
		public ActionResult ViewDocuments()
		{
			return PartialView();
		}
	}
}