namespace Customer.Ramseier.Services.LookupImportServices
{
	using System;
	using System.Collections.Generic;
	using System.Linq;

	using Crm.ErpIntegration.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.LookupImportServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Globalization;
	using Crm.Library.Globalization.Lookup;
	using Crm.Library.Helper;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.Lookups;
	using Customer.Ramseier.Model.Lookups.Extensions;
	using Customer.Ramseier.Model.ProAlpha.DataSet.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity.Lookups;
	using LMobile.Unicore.NHibernate;

	using log4net;

	public class PartDiscountGroupLookupImportService : DefaultLookupImportService<PartDiscountGroupDataSet, S_ArtRabatt, PartDiscountGroups>
	{
		protected readonly ITransformService<Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups>, PartDiscountGroups> partDiscountGroupTransformService;

		public override int Priority => 50;
		public override IEnumerable<S_ArtRabatt> GetHeadEntities(PartDiscountGroupDataSet model)
		{
			return model.PartDiscountGroups;
		}

		public override void ImportLookup(S_ArtRabatt headEntity, List<Language> systemLanguages, Language defaultLanguage)
		{
			sessionProvider.GetSession().DisableIsActiveAndSoftDeleteFilter();
			var customerDiscountGroupLookups = lookupService
				.GetLookup<PartDiscountGroups>(x => x.LookupHeadProAlphaObjectId == headEntity.S_ArtRabatt_Obj)
				.ToDictionary(x => x.ProAlphaObjectId);
			sessionProvider.GetSession().EnableIsActiveAndSoftDeleteFilter();

			var translations = headEntity.S_ArtRabattSpr
				.ToDictionary(x => $"{headEntity.S_ArtRabatt_Obj}_{x.Sprache}", x => x);

			var defaultTranslation = translations[$"{headEntity.S_ArtRabatt_Obj}_{defaultLanguage.GetExtension<LanguageExtension>().ProAlphaLanguageKey}"];

			foreach (var systemLanguage in systemLanguages)
			{
				var objectId = $"{headEntity.S_ArtRabatt_Obj}_{systemLanguage.GetExtension<LanguageExtension>().ProAlphaLanguageKey}";

				var lookup = customerDiscountGroupLookups.ContainsKey(objectId) ? customerDiscountGroupLookups[objectId] : null;
				var translation = translations.ContainsKey(objectId) ? translations[objectId] : defaultTranslation;

				var partDiscountGroup = partDiscountGroupTransformService.Transform(new Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups>(headEntity, translation, systemLanguage, lookup));
				lookupService.Save(partDiscountGroup);
			}
		}

		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(RamseierPlugin.Settings.ProAlpha.MessageType.PartDiscountGroupsDataSet);

		protected override string GetProAlphaHeadObjectId(S_ArtRabatt headEntity)
		{
			return headEntity.S_ArtRabatt_Obj;
		}

		public PartDiscountGroupLookupImportService(
			ISessionProvider sessionProvider,
			IAppSettingsProvider appSettingsProvider,
			ILog logger,
			IUncHelper uncHelper,
			IProAlphaXmlHelper proAlphaXmlHelper,
			IProAlphaIntegrationDataService proAlphaIntegrationDataService,
			IProAlphaResponseService responseService,
			ILookupManager lookupManager,
			ILookupService lookupService,
			IProAlphaDataSetImportHelper proAlphaDataSetImportHelper,
			ITransformService<Tuple<S_ArtRabatt, S_ArtRabattSpr, Language, PartDiscountGroups>, PartDiscountGroups> partDiscountGroupTransformService)
			: base(
				sessionProvider,
				appSettingsProvider,
				logger,
				uncHelper,
				proAlphaXmlHelper,
				proAlphaIntegrationDataService,
				responseService,
				lookupManager,
				lookupService,
				proAlphaDataSetImportHelper)
		{
			this.partDiscountGroupTransformService = partDiscountGroupTransformService;
		}
	}
}