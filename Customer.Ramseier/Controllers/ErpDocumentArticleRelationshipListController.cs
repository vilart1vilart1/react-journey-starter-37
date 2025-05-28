using Crm.Article;
namespace Customer.Ramseier.Controllers
{
    using System.Web.Mvc;
    using Crm.Controllers;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Modularization.Interfaces;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using System.Collections.Generic;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.EntityConfiguration;
    using Crm.Library.EntityConfiguration.Interfaces;
    using Crm.Library.Helper;
    using Crm.Library.Model;
    using Crm.Library.Model.Authorization.Interfaces;
    using Crm.Results;
    using Crm.Services.Interfaces;
    using Customer.Ramseier.Model;
    using Crm.Library.Model.Authorization.PermissionIntegration;
    using PermissionGroup = ArticlePlugin.PermissionGroup;

    public class ErpDocumentArticleRelationshipListController : GenericListController<ErpDocumentArticleRelationship>
    {
        public ErpDocumentArticleRelationshipListController(IPluginProvider pluginProvider, IEnumerable<IRssFeedProvider<ErpDocumentArticleRelationship>> rssFeedProviders, IEnumerable<ICsvDefinition<ErpDocumentArticleRelationship>> csvDefinitions, IEntityConfigurationProvider<ErpDocumentArticleRelationship> entityConfigurationProvider, IUserService userService, IFilterExpressionBuilder expressionBuilder, IRepository<ErpDocumentArticleRelationship> repository, ITagService tagService, IAppSettingsProvider appSettingsProvider, IResourceManager resourceManager, IVisibilityProvider visibilityProvider, RestTypeProvider restTypeProvider, IAuthorizationManager authorizationManager)
            : base(pluginProvider, rssFeedProviders, csvDefinitions, entityConfigurationProvider, userService, expressionBuilder, repository, tagService, appSettingsProvider, resourceManager, visibilityProvider, restTypeProvider, authorizationManager)
        {
        }
        public override ActionResult FilterTemplate()
        {
            return base.FilterTemplate();
        }
        [RequiredPermission(PermissionName.Index, Group = PermissionGroup.Article)]

        public override ActionResult IndexTemplate()
        {
            return base.IndexTemplate();
        }
    }
}