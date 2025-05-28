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

	public class CustomerDiscountGroupLookupImportService : DefaultLookupImportService<CustomerDiscountGroupDataSet, S_KunRabatt, CustomerDiscountGroup>
	{
		protected readonly ITransformService<Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup>, CustomerDiscountGroup> customerDiscountGroupTransformService;

		public override int Priority => 50;
		public override IEnumerable<S_KunRabatt> GetHeadEntities(CustomerDiscountGroupDataSet model)
		{
			return model.CustomerDiscountGroups;
		}

		public override void ImportLookup(S_KunRabatt headEntity, List<Language> systemLanguages, Language defaultLanguage)
		{
			sessionProvider.GetSession().DisableIsActiveAndSoftDeleteFilter();
			var customerDiscountGroupLookups = lookupService
				.GetLookup<CustomerDiscountGroup>(x => x.ModelExtension<CustomerDiscountGroupExtension, string>(m => m.LookupHeadProAlphaObjectId) == headEntity.S_KunRabatt_Obj)
				.ToDictionary(x => x.ProAlphaObjectId);
			sessionProvider.GetSession().EnableIsActiveAndSoftDeleteFilter();

			var translations = headEntity.S_KunRabattSpr
				.ToDictionary(x => $"{headEntity.S_KunRabatt_Obj}_{x.Sprache}", x => x);

			var defaultTranslation = translations[$"{headEntity.S_KunRabatt_Obj}_{defaultLanguage.GetExtension<LanguageExtension>().ProAlphaLanguageKey}"];

			foreach (var systemLanguage in systemLanguages)
			{
				var objectId = $"{headEntity.S_KunRabatt_Obj}_{systemLanguage.GetExtension<LanguageExtension>().ProAlphaLanguageKey}";

				var lookup = customerDiscountGroupLookups.ContainsKey(objectId) ? customerDiscountGroupLookups[objectId] : null;
				var translation = translations.ContainsKey(objectId) ? translations[objectId] : defaultTranslation;

				var customerDiscountGroup = customerDiscountGroupTransformService.Transform(new Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup>(headEntity, translation, systemLanguage, lookup));
				lookupService.Save(customerDiscountGroup);
			}
		}

		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(RamseierPlugin.Settings.ProAlpha.MessageType.CustomerDiscountGroupsDataSet);

		protected override string GetProAlphaHeadObjectId(S_KunRabatt headEntity)
		{
			return headEntity.S_KunRabatt_Obj;
		}

		public CustomerDiscountGroupLookupImportService(
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
			ITransformService<Tuple<S_KunRabatt, S_KunRabattSpr, Language, CustomerDiscountGroup>, CustomerDiscountGroup> customerDiscountGroupTransformService)
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
			this.customerDiscountGroupTransformService = customerDiscountGroupTransformService;
		}
	}
}