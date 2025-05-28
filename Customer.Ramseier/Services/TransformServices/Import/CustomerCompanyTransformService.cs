namespace Customer.Ramseier.Services.Import
{
	using System;
	using System.Collections.Generic;
	using System.Linq;

	using AutoMapper;
	using Castle.Core.Internal;
	using Crm.ErpIntegration.ProAlphaBase;
	using Crm.ErpIntegration.ProAlphaBase.Extensions;
    using Crm.ErpIntegration.ProAlphaBase.Model;
    using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
    using Crm.Library.BaseModel;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Model;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model.ProAlpha.Entity;
	using log4net;

	public class CustomerCompanyTransformService : DefaultTransformService<Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company>, Company>
	{
		protected readonly IAppSettingsProvider appSettingsProvider;
		protected readonly Func<Company> companyFactory;
		protected readonly ILegacyIdResolveService<User, string> userLegacyIdResolveService;
		protected readonly ILookupResolveService<Currency, string> currencyLookupResolveService;
		protected readonly ILookupResolveService<PaymentTerms, string> paymentTermsLookupResolveService;
		protected readonly ILookupResolveService<TermsOfDelivery, string> termsOfDeliveryLookupResolveService;
        private readonly IRepositoryWithTypedId<SalesAgentCompanyRelationship, Guid> salesAgentCompanyRepository;

        public override void ValidateInput(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(Custom_VC_Interessent), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}

			if (input.Item3 == null)
			{
				throw new ArgumentNullException(nameof(S_Adresse), $"{nameof(input)}.{nameof(input.Item3)} cannot be null");
			}
		}

		public override Company MapInput(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> input)
		{
			var prospect = input.Item1;
			var customer = input.Item2;
			var address = input.Item3;
			var output = input.Item4 ?? companyFactory();

			output.IsExported = true;
			output.SourceTypeKey = appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.Company.DefaultSourceTypeKey);

			Map(prospect, output);
			Map(address, output);
			MapBackgroundInformation(prospect.BT_Kopf, output, appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.Prospect.BackgroundInfoTextTypeKey));

			if (customer != null)
			{
				Map(customer, output);
				MapBackgroundInformation(customer.BT_Kopf, output, appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.Customer.BackgroundInfoTextTypeKey));
			}

			return output;
		}

		public override Company MapAndResolveLegacyIds(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> src, Company dest)
		{
			var prospect = src.Item1;
			var customer = src.Item2;

			if (customer != null)
			{
				dest.ResponsibleUser = !string.IsNullOrEmpty(customer.Sachbearbeiter) ? userLegacyIdResolveService.ResolveLegacyId(customer.Sachbearbeiter, appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.Import.LoadInactiveUsers)) : null;
			}
			else
			{
				dest.ResponsibleUser = !string.IsNullOrEmpty(prospect.Sachbearbeiter) ? userLegacyIdResolveService.ResolveLegacyId(prospect.Sachbearbeiter, appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.Import.LoadInactiveUsers)) : null;
			}

			return base.MapAndResolveLegacyIds(src, dest);
		}

		public override Company MapAndResolveLookups(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> src, Company dest)
		{
			var customer = src.Item2;

			if (customer != null)
			{
				dest.CompanyGroupFlag1Key = customer.ABC_Klasse.IsNullOrEmpty() ? null : customer.ABC_Klasse;
				dest.GetExtension<CompanyExtension>().ProAlphaCurrencyKey = customer.Waehrung.IsNullOrZero() ? null : currencyLookupResolveService.ResolveLookupKey(customer.Waehrung.ToString());
				dest.GetExtension<CompanyExtension>().ProAlphaPaymentTermsKey = customer.ZahlungsZiel.IsNullOrZero() ? null : paymentTermsLookupResolveService.ResolveLookupKey(customer.ZahlungsZiel.ToString());
				dest.GetExtension<CompanyExtension>().ProAlphaTermsOfDeliveryKey = customer.LieferBedingung.IsNullOrZero() ? null : termsOfDeliveryLookupResolveService.ResolveLookupKey(customer.LieferBedingung.ToString());
			}

			return base.MapAndResolveLookups(src, dest);
		}

		public virtual Company MapBackgroundInformation(List<BT_Kopf> src, Company dest, string textTypeKey)
		{
			var bt_kopfEntry = src?.FirstOrDefault(x => x.Sprache == appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.BackgroundInfo.DefaultProAlphaLanguageKey) && x.TextArt == textTypeKey);
			dest.BackgroundInfo = bt_kopfEntry?.PlainText;

			return dest;
		}
		public override Company MapDomain(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> src, Company dest)
		{
			if (domainService.IsMultitenantPluginActive())
			{
				var domain = domainService.GetDomainByLegacyId(src.Item1.Firma);
				dest.AuthData = dest.AuthData ?? new LMobile.Unicore.EntityAuthData { DomainId = domain.UId };
			}
			return dest;
		}
		public override Company MapAfterResolve(Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company> src, Company dest)
		{
			var Interesent = src.Item1;
            
            if (dest.Visibility != Visibility.UserGroups && dest.Visibility != Visibility.OnlyMe)
            {
                dest.Visibility = Visibility.OnlyMe;
            }
            
            dest.GetExtension<Customer.Ramseier.Model.Extensions.CompanyExtension>().CustomerDiscountGroupKey = Interesent.Rabattgruppe;
			return base.MapAfterResolve(src, dest);
		}
		public CustomerCompanyTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IAppSettingsProvider appSettingsProvider,
			ILegacyIdResolveService<User, string> userLegacyIdResolveService,
			ILookupResolveService<Currency, string> currencyLookupResolveService,
			ILookupResolveService<PaymentTerms, string> paymentTermsLookupResolveService,
			ILookupResolveService<TermsOfDelivery, string> termsOfDeliveryLookupResolveService,
			Func<Company> companyFactory,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
            IRepositoryWithTypedId<SalesAgentCompanyRelationship, Guid> salesAgentCompanyRepository,
            ILog logger)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				resourceManager,
				ruleValidationService,
				logger)
		{
			this.appSettingsProvider = appSettingsProvider;
			this.userLegacyIdResolveService = userLegacyIdResolveService;
			this.currencyLookupResolveService = currencyLookupResolveService;
			this.paymentTermsLookupResolveService = paymentTermsLookupResolveService;
			this.termsOfDeliveryLookupResolveService = termsOfDeliveryLookupResolveService;
			this.companyFactory = companyFactory;
            this.salesAgentCompanyRepository = salesAgentCompanyRepository;

        }
	}
}