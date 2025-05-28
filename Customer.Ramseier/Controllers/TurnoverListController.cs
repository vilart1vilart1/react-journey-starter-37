namespace Customer.Ramseier.Controllers
{
	using System.Collections.Generic;
	using System.Web.Mvc;

	using Crm.Controllers;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.EntityConfiguration;
	using Crm.Library.EntityConfiguration.Interfaces;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Model.Authorization.Interfaces;
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization.Interfaces;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
	using Crm.Results;
	using Crm.Services.Interfaces;

	using Customer.Ramseier.Model;

	public class TurnoverListController : GenericListController<Turnover>
	{
		public TurnoverListController(IPluginProvider pluginProvider, IEnumerable<IRssFeedProvider<Turnover>> rssFeedProviders, IEnumerable<ICsvDefinition<Turnover>> csvDefinitions, IEntityConfigurationProvider<Turnover> entityConfigurationProvider, IUserService userService, IFilterExpressionBuilder expressionBuilder, IRepository<Turnover> repository, ITagService tagService, IAppSettingsProvider appSettingsProvider, IResourceManager resourceManager, IVisibilityProvider visibilityProvider, RestTypeProvider restTypeProvider, IAuthorizationManager authorizationManager)
			: base(pluginProvider, rssFeedProviders, csvDefinitions, entityConfigurationProvider, userService, expressionBuilder, repository, tagService, appSettingsProvider, resourceManager, visibilityProvider, restTypeProvider, authorizationManager)
		{
		}
		protected override string GetTitle()
		{
			return "StatisticsTitle";
		}
		protected override string GetEmptySlate()
		{
			return resourceManager.GetTranslation("StatisticsEmptySlate");
		}
		[RequiredPermission(PermissionName.Index, Group = RamseierPlugin.PermissionGroup.Turnover)]
		public override ActionResult IndexTemplate() => base.IndexTemplate();
	}
}