namespace Customer.Ramseier.Services.TransformServices.Import.Part
{
	using System;

	using AutoMapper;

	using Crm.Article.Model;
	using Crm.Article.Model.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Part;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Customer.Ramseier.Model.Extensions;
	using log4net;

	public class CustomerArticleTransformService : ArticleTransformService, IReplaceRegistration<ArticleTransformService>
	{
		public CustomerArticleTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger,
			Func<Article> articleFactory,
			ILookupResolveService<QuantityUnit, string> quantityUnitLookupResolveService,
			ILookupResolveService<ArticleGroup01, string> articleGroupLookupResolveService,
			IAppSettingsProvider appSettingsProvider)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				resourceManager,
				ruleValidationService,
				logger, articleFactory, quantityUnitLookupResolveService, articleGroupLookupResolveService, appSettingsProvider)
		{
		}
		public override Article MapAfterResolve(Tuple<S_Artikel, S_ArtikelSpr, Article> src, Article dest)
		{
			var artikel = src.Item1;

			dest.GetExtension<ArticleExtension>().PartDiscountGroupKey = artikel.Rabattgruppe;

			return base.MapAfterResolve(src, dest);
		}
	}
}