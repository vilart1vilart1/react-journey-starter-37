namespace Customer.Ramseier.Controllers
{
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
	using NHibernate.Linq;
	using System.Collections.Generic;
	using System.Linq;
	using System.Web.Mvc;

	using PermissionGroup = RamseierPlugin.PermissionGroup;
	public class CustomErpDocumentListController : GenericListController<CustomErpDocument>
	{
		public CustomErpDocumentListController(IPluginProvider pluginProvider, IEnumerable<IRssFeedProvider<CustomErpDocument>> rssFeedProviders, IEnumerable<ICsvDefinition<CustomErpDocument>> csvDefinitions, IEntityConfigurationProvider<CustomErpDocument> entityConfigurationProvider, IUserService userService, IFilterExpressionBuilder expressionBuilder, IRepository<CustomErpDocument> repository, ITagService tagService, IAppSettingsProvider appSettingsProvider, IResourceManager resourceManager, IVisibilityProvider visibilityProvider, RestTypeProvider restTypeProvider, IAuthorizationManager authorizationManager)
			: base(pluginProvider, rssFeedProviders, csvDefinitions, entityConfigurationProvider, userService, expressionBuilder, repository, tagService, appSettingsProvider, resourceManager, visibilityProvider, restTypeProvider, authorizationManager)
		{
		}
		protected override string GetTitle()
		{
			return "ErpDocuments";
		}

		protected override string GetEmptySlate()
		{
			return repository.GetAll().Any() ?
				resourceManager.GetTranslation("NoErpDocumentsMatch") :
				resourceManager.GetTranslation("NoErpDocumentsAvailable");
		}


		protected override IQueryable<CustomErpDocument> GetAllItems()
		{
			//Ensure to return only head positions
			return base.GetAllItems().Where(x => x.RecordType == "Head");
		}

		protected override IQueryable<CustomErpDocument> Eager(IQueryable<CustomErpDocument> items)
		{
			return items.Fetch(x => x.Contact);
		}

		[RequiredPermission(PermissionName.Index, Group = PermissionGroup.CustomErpDocument)]
		public override ActionResult FilterTemplate()
		{
			return base.FilterTemplate();
		}
		[RequiredPermission(PermissionName.Index, Group = PermissionGroup.CustomErpDocument)]
		public override ActionResult IndexTemplate()
		{
			return base.IndexTemplate();
		}
	}
}