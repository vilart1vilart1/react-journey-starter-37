namespace Customer.Ramseier.Services.TransformServices.Import.Lookups
{
	using System;

	using AutoMapper;

	using Crm.Article.Model;
	using Crm.Article.Model.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Customer.Ramseier.Model;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity;
	using log4net;

	public class CompanyArticleDiscountTransformService : DefaultTransformService<Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer>, ArticleDiscountGroupCustomer>
	{
		protected readonly Func<ArticleDiscountGroupCustomer> CompanyArticleDiscountFactory;

		public override void ValidateInput(Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(S_Artikel), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}
		}
		public override ArticleDiscountGroupCustomer MapInput(Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer> input)
		{
			var CompanyArticleDiscount = input.Item2;
			var output = input.Item3 ?? CompanyArticleDiscountFactory();

			Map(CompanyArticleDiscount, output);

			return output;
		}
		public CompanyArticleDiscountTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger,
			Func<ArticleDiscountGroupCustomer> CompanyArticleDiscountFactory)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				resourceManager,
				ruleValidationService,
				logger)
		{
			this.CompanyArticleDiscountFactory = CompanyArticleDiscountFactory;
		}
	}
}