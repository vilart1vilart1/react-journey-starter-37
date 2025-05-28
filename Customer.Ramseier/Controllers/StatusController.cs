using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Controllers
{
	using System.Web.Mvc;
	using System.Web.Routing;

	using Crm.Controllers;
	using Crm.Library.Globalization.Lookup;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
	using Crm.Services;

	public class StatusController : CrmController
	{
		public StatusController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService)
			: base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
		{
		}
		public ActionResult EditTemplate()
		{
			return PartialView();
		}
	}
}