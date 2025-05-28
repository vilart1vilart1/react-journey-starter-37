namespace Customer.Ramseier.Controllers
{
	using System.Collections.Generic;
	using System.Web.Mvc;

	using Crm;
	using Crm.Library.AutoFac;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.EntityConfiguration;
	using Crm.Library.EntityConfiguration.Interfaces;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Model.Authorization.Interfaces;
	using Crm.Library.Modularization.Interfaces;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
	using Crm.Results;
	using Crm.Services.Interfaces;
	using Crm.VisitReport;
	using Crm.VisitReport.Controllers;
	using Crm.VisitReport.Model;

	public class CustomVisitListController : VisitListController, IReplaceRegistration<VisitListController>
	{
		public CustomVisitListController(IPluginProvider pluginProvider, IEnumerable<IRssFeedProvider<Visit>> rssFeedProviders, IEnumerable<ICsvDefinition<Visit>> csvDefinitions, IEntityConfigurationProvider<Visit> entityConfigurationProvider, IUserService userService, IFilterExpressionBuilder expressionBuilder, IRepository<Visit> repository, ITagService tagService, IAppSettingsProvider appSettingsProvider, IResourceManager resourceManager, IVisibilityProvider visibilityProvider, RestTypeProvider restTypeProvider, IAuthorizationManager authorizationManager)
			: base(pluginProvider, rssFeedProviders, csvDefinitions, entityConfigurationProvider, userService, expressionBuilder, repository, tagService, appSettingsProvider, resourceManager, visibilityProvider, restTypeProvider, authorizationManager)
		{
		}

		[RequiredPermission(MainPlugin.PermissionName.Ics, Group = VisitReportPlugin.PermissionGroup.Visit)]
		public override ActionResult GetIcsLink() => base.GetIcsLink();
	}
}