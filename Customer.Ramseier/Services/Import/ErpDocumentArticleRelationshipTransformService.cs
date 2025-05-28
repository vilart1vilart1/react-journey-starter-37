namespace Customer.Ramseier.Services.Import
{
	using System;

	using AutoMapper;

	using Crm.Article.Model;
	using Crm.ErpExtension.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Services.Interfaces;

	using Customer.Ramseier.Model;

	using log4net;

	public class ErpDocumentArticleRelationshipTransformService : DefaultTransformService<Tuple<V_BelegPos, ErpDocumentArticleRelationship>, ErpDocumentArticleRelationship>
	{
		protected readonly Func<ErpDocumentArticleRelationship> erpDocumentArticleRelationshipFactory;
		protected readonly ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService;
		protected readonly ILegacyIdResolveService<ErpDocument, Guid> erpDocumentLegacyIdResolveService;
		public ErpDocumentArticleRelationshipTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, Func<ErpDocumentArticleRelationship> erpDocumentArticleRelationshipFactory, ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService, ILegacyIdResolveService<ErpDocument, Guid> erpDocumentLegacyIdResolveService)
			: base(mapper, domainService, extensionMappingService, resourceManager, ruleValidationService, logger)
		{
			this.erpDocumentArticleRelationshipFactory = erpDocumentArticleRelationshipFactory;
			this.articleLegacyIdResolveService = articleLegacyIdResolveService;
			this.erpDocumentLegacyIdResolveService = erpDocumentLegacyIdResolveService;
		}
		public override void ValidateInput(Tuple<V_BelegPos, ErpDocumentArticleRelationship> input)
		{
			var ErpDocumentPosition = input.Item1;

			if (ErpDocumentPosition == null)
			{
				throw new ArgumentNullException(nameof(V_BelegPos), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}
		}
		public override ErpDocumentArticleRelationship MapInput(Tuple<V_BelegPos, ErpDocumentArticleRelationship> input)
		{
			var ErpDocumentPosition = input.Item1;
			var output = input.Item2 ?? erpDocumentArticleRelationshipFactory();

			Map(ErpDocumentPosition, output);

			return output;
		}
		public override ErpDocumentArticleRelationship MapAndResolveLegacyIds(Tuple<V_BelegPos, ErpDocumentArticleRelationship> src, ErpDocumentArticleRelationship dest)
		{
			var ErpDocumentPosition = src.Item1;
			dest.ErpDocumentId = erpDocumentLegacyIdResolveService.ResolveLegacyId($"{ErpDocumentPosition.Firma}_{ErpDocumentPosition.BelegArt}_{ErpDocumentPosition.BelegNummer}");

			var article = articleLegacyIdResolveService.ResolveEntityOrDefault(ErpDocumentPosition.Artikel);
			if (article == null)
			{
				logger.Error($"Importing ERP Document item failed for Document {ErpDocumentPosition.Firma}_{ErpDocumentPosition.BelegArt}_{ErpDocumentPosition.BelegNummer} because no item for Part {ErpDocumentPosition.Artikel} found. Please check Part imports.");
				throw new ArgumentOutOfRangeException($"Importing ERP Document item failed for Document {ErpDocumentPosition.Firma}_{ErpDocumentPosition.BelegArt}_{ErpDocumentPosition.BelegNummer} because no item for Part {ErpDocumentPosition.Artikel} found. Please check Part imports.");
			}
			dest.ArticleId = article.Id;
			return base.MapAndResolveLegacyIds(src, dest);
		}

		public override ErpDocumentArticleRelationship MapDomain(Tuple<V_BelegPos, ErpDocumentArticleRelationship> src, ErpDocumentArticleRelationship dest)
		{
			if (domainService.IsMultitenantPluginActive())
			{
				var domain = domainService.GetDomainByLegacyId(src.Item1.Firma);
				dest.AuthData = dest.AuthData ?? new LMobile.Unicore.EntityAuthData { DomainId = domain.UId };
			}
			return dest;
		}
	}
}