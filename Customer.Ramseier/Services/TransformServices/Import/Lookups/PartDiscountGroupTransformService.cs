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

	public class PartDiscountGroupTransformService : DefaultTransformService<Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups>, PartDiscountGroups>
	{
		protected readonly Func<PartDiscountGroups> partDiscountGroupFactory;

		public override void ValidateInput(Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(S_ArtRabatt), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}

			if (input.Item2 == null)
			{
				throw new ArgumentNullException(nameof(S_ArtRabattSpr), $"{nameof(input)}.{nameof(input.Item2)} cannot be null");
			}

			if (input.Item3 == null)
			{
				throw new ArgumentNullException(nameof(Language), $"{nameof(input)}.{nameof(input.Item3)} cannot be null");
			}
		}

		public override PartDiscountGroups MapInput(Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups> input)
		{
			var lookupHead = input.Item1;
			var lookupTranslation = input.Item2;
			var language = input.Item3;
			var languageExtension = language.GetExtension<LanguageExtension>();

			var dest = input.Item4 ?? partDiscountGroupFactory();

			Map(lookupHead, dest);
			Map(lookupTranslation, dest);

			dest.Language = language.Key;
			dest.ProAlphaObjectId = $"{lookupHead.S_ArtRabatt_Obj}_{languageExtension.ProAlphaLanguageKey}";
			dest.ProAlphaLegacyId = $"{lookupHead.Rabattgruppe}_{languageExtension.ProAlphaLanguageKey}";

			return dest;
		}

		public PartDiscountGroupTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			Func<PartDiscountGroups> partDiscountGroupFactory,
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
			this.partDiscountGroupFactory = partDiscountGroupFactory;
		}
	}
}