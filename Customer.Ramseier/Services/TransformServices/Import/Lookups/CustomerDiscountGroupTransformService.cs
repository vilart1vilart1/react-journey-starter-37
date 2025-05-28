namespace Customer.Ramseier.Services.TransformServices.Import.Lookups
{
	using System;

	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.Library.Globalization;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Services.Interfaces;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity.Lookups;
	using log4net;

	public class CustomerDiscountGroupTransformService : DefaultTransformService<Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup>, CustomerDiscountGroup>
	{
		protected readonly Func<CustomerDiscountGroup> customerDiscountGroupFactory;

		public override void ValidateInput(Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(S_KunRabatt), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}

			if (input.Item2 == null)
			{
				throw new ArgumentNullException(nameof(S_KunRabattSpr), $"{nameof(input)}.{nameof(input.Item2)} cannot be null");
			}

			if (input.Item3 == null)
			{
				throw new ArgumentNullException(nameof(Language), $"{nameof(input)}.{nameof(input.Item3)} cannot be null");
			}
		}

		public override CustomerDiscountGroup MapInput(Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup> input)
		{
			var lookupHead = input.Item1;
			var lookupTranslation = input.Item2;
			var language = input.Item3;
			var languageExtension = language.GetExtension<LanguageExtension>();

			var dest = input.Item4 ?? customerDiscountGroupFactory();

			Map(lookupHead, dest);
			Map(lookupTranslation, dest);

			dest.Language = language.Key;
			dest.ProAlphaObjectId = $"{lookupHead.S_KunRabatt_Obj}_{languageExtension.ProAlphaLanguageKey}";
			dest.ProAlphaLegacyId = $"{lookupHead.Rabattgruppe}_{languageExtension.ProAlphaLanguageKey}";

			return dest;
		}

		public CustomerDiscountGroupTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			Func<CustomerDiscountGroup> customerDiscountGroupFactory,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				resourceManager,
				ruleValidationService,
				logger)
		{
			this.customerDiscountGroupFactory = customerDiscountGroupFactory;
		}
	}
}