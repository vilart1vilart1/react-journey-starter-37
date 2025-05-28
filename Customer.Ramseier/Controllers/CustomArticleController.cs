namespace Customer.Ramseier.Controllers
{
    using System;
    using System.Web.Mvc;
    using System.Web.Routing;
    using Autofac;
    using Crm.Article.Controllers;
    using Crm.Article.Model;
    using Crm.Article.Services.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Modularization.Interfaces;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;

    public class CustomArticleController : ArticleController, IReplaceRegistration<ArticleController>
    {
        private readonly IArticleService articleService;
        private readonly IPluginProvider pluginProvider;
        private readonly RestTypeProvider restTypeProvider;
        private readonly Func<Article> articleFactory;
        private readonly ILifetimeScope lifetimeScope;
        public ActionResult PartialDiscountList()
        {
            return PartialView();
        }
        public CustomArticleController(IArticleService articleService,
            RestTypeProvider restTypeProvider,
            IRuleValidationService ruleValidationService,
            IPluginProvider pluginProvider,
            IPdfService pdfService,
            IRenderViewToStringService renderViewToStringService,
            RouteCollection routeCollection,
            ILookupManager lookupManager,
            IResourceManager resourceManager,
            Func<Article> articleFactory,
            ILifetimeScope lifetimeScope)
            : base(articleService, restTypeProvider, ruleValidationService, pluginProvider, pdfService, renderViewToStringService, routeCollection, lookupManager, resourceManager, articleFactory, lifetimeScope)
        {
            this.articleService = articleService;
            this.restTypeProvider = restTypeProvider;
            this.pluginProvider = pluginProvider;
            this.articleFactory = articleFactory;
            this.lifetimeScope = lifetimeScope;
        }
    }
}