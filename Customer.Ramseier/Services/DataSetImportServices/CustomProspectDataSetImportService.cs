namespace Customer.Ramseier.Services.DataSetImportServices
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using Crm.ErpIntegration.ProAlphaBase;
	using Crm.ErpIntegration.ProAlphaBase.Helper;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Import;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;
	using Crm.Model;
	using Crm.Model.Lookups;
	using Customer.Ramseier.Model;
	using Customer.Ramseier.Model.ProAlpha.DataSet;
	using Customer.Ramseier.Model.ProAlpha.Entity;
	using log4net;

	public class CustomProspectDataSetImportService : DefaultDataSetImportService<CustomProspectDataSet, Custom_VC_Interessent, Company>, IReplaceRegistration<ProspectDataSetImportService>
	{
		protected readonly IIntegrationService<Company, Guid> companyIntegrationService;
		protected readonly IIntegrationService<Address, Guid> addressIntegrationService;
		protected readonly IIntegrationService<Email, Guid> emailIntegrationService;
		protected readonly IIntegrationService<Phone, Guid> phoneIntegrationService;
		protected readonly IIntegrationService<Fax, Guid> faxIntegrationService;
		protected readonly IIntegrationService<Website, Guid> websiteIntegrationService;
		protected readonly ITransformService<Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company>, Company> companyTransformService;
		protected readonly ITransformService<Tuple<S_Adresse, Company, Address>, Address> addressTransformService;
		protected readonly ITransformService<Tuple<Address, string, string, Email>, Email> emailTransformService;
		protected readonly ITransformService<Tuple<Address, string, string, Phone>, Phone> phoneTransformService;
		protected readonly ITransformService<Tuple<Address, string, string, Fax>, Fax> faxTransformService;
		protected readonly ITransformService<Tuple<Address, string, string, Website>, Website> websiteTransformService;
		protected readonly IIntegrationService<ArticleDiscountGroupCustomer, Guid> companyArticleDiscountIntegrationService;
		protected readonly ITransformService<Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer>, ArticleDiscountGroupCustomer> companyArticleDiscountTransformService;

		protected override bool SupportsBidirectionalIntegration => true;
		public override int Priority => 1400;
		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.MessageType.ProspectDataSet);
		protected override string GetProAlphaHeadObjectId(Custom_VC_Interessent headEntry)
		{
			return headEntry.VC_Interessent_Obj;
		}
		public override IEnumerable<Custom_VC_Interessent> GetHeadEntities(CustomProspectDataSet model)
		{
			return model.Prospects;
		}

		public override ImportResult ImportHeadEntity(Custom_VC_Interessent headEntity)
		{
			var existingCompany = companyIntegrationService.GetPersistentEntityByLegacyId(headEntity.VC_Interessent_Obj);
			if (existingCompany == null && !string.IsNullOrEmpty(headEntity.LmobileId))
			{
				existingCompany = companyIntegrationService.GetPersistentEntityById(Guid.Parse(headEntity.LmobileId));
			}

			if (headEntity.TransferData.Deleted)
			{
				if (existingCompany == null)
				{
					return new ImportResult(ImportAction.Nothing);
				}

				DeleteCompany(existingCompany);
				return new ImportResult(ImportAction.Delete, existingCompany.Id);
			}

			var existingStandardAddress = existingCompany?.Addresses.FirstOrDefault(x => x.IsCompanyStandardAddress);
			var existingCommunications = existingCompany?.Communications;

			var importedCompany = CreateOrUpdateCompany(existingCompany, headEntity);
			var importedAddress = CreateOrUpdateCompanyStandardAddress(importedCompany, existingStandardAddress, headEntity.S_Adresse);
			CreateOrUpdateCommunication(importedAddress, existingCommunications?.ToList(), headEntity.S_Adresse);

			var companyArticleDiscounts = headEntity?.S_Kunde?.S_KunARabStaffel;
			if (companyArticleDiscounts != null)
			{
				foreach (var companyArticleDiscount in companyArticleDiscounts)
				{
					var existingCompanyArticleDiscount = companyArticleDiscountIntegrationService.GetPersistentEntityByLegacyId(companyArticleDiscount.S_KunARabStaffel_Obj);
					var companyArticledis = companyArticleDiscountTransformService.Transform(
					new Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer>(
						headEntity,
						companyArticleDiscount,
						existingCompanyArticleDiscount));
					companyArticledis.ContactKey = importedCompany.Id;
					companyArticleDiscountIntegrationService.SaveOrUpdate(companyArticledis);
				}
			}
			return new ImportResult(existingCompany == null ? ImportAction.Insert : ImportAction.Update, importedCompany.Id);
		}

		protected virtual Company CreateOrUpdateCompany(Company existingCompany, Custom_VC_Interessent prospect)
		{
			var company = companyTransformService.Transform(
				new Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company>(
					prospect,
					prospect.S_Kunde,
					prospect.S_Adresse,
					existingCompany));
			return companyIntegrationService.SaveOrUpdate(company);
		}

		protected virtual Address CreateOrUpdateCompanyStandardAddress(Company company, Address existingStandardAddress, S_Adresse address)
		{
			if (existingStandardAddress != null &&
			    existingStandardAddress.IsActive &&
			    !string.IsNullOrEmpty(existingStandardAddress.GetExtension<AddressExtension>().ProAlphaObjectId) &&
			    existingStandardAddress.GetExtension<AddressExtension>().ProAlphaObjectId != address.S_Adresse_Obj)
			{
				addressIntegrationService.Remove(existingStandardAddress);
				addressIntegrationService.FlushSession(existingStandardAddress);
                existingStandardAddress = null;
			}

			var standardAddress = addressTransformService.Transform(
				new Tuple<S_Adresse, Company, Address>(
					address,
					company,
					existingStandardAddress.UnwrapProxy()));

			return addressIntegrationService.SaveOrUpdate(standardAddress);
		}

		protected virtual void CreateOrUpdateCommunication(Address address, List<Communication> communications, S_Adresse sAdresse)
		{
			IList<Phone> phones = communications?.OfType<Phone>().ToList();
			IList<Email> mails = communications?.OfType<Email>().ToList();
			IList<Website> websites = communications?.OfType<Website>().ToList();
			IList<Fax> faxes = communications?.OfType<Fax>().ToList();

			CreateOrUpdateCommunication(address, phones, phoneTransformService, phoneIntegrationService, PhoneType.WorkKey, sAdresse.Telefon);
			CreateOrUpdateCommunication(address, phones, phoneTransformService, phoneIntegrationService, "PhoneWork2", sAdresse.Telefon2);
			CreateOrUpdateCommunication(address, phones, phoneTransformService, phoneIntegrationService, "PhoneCar", sAdresse.AutoTelefon);
			CreateOrUpdateCommunication(address, phones, phoneTransformService, phoneIntegrationService, PhoneType.MobileKey, sAdresse.Handy);
			CreateOrUpdateCommunication(address, mails, emailTransformService, emailIntegrationService, EmailType.WorkKey, sAdresse.EMail);
			CreateOrUpdateCommunication(address, websites, websiteTransformService, websiteIntegrationService, WebsiteType.WorkKey, sAdresse.HomePage);
			CreateOrUpdateCommunication(address, faxes, faxTransformService, faxIntegrationService, FaxType.WorkKey, sAdresse.Telefax);
			CreateOrUpdateCommunication(address, faxes, faxTransformService, faxIntegrationService, "FaxWork2", sAdresse.Telefax2);
		}

		protected virtual void CreateOrUpdateCommunication<TCommunication>(
			Address address,
			IList<TCommunication> communications,
			ITransformService<Tuple<Address, string, string, TCommunication>, TCommunication> transformService,
			IIntegrationService<TCommunication, Guid> integrationService,
			string typeKey,
			string data)
			where TCommunication : Communication
		{
			var existingCommunication = communications?
				.Where(
					x => x.GetExtension<CommunicationExtension>().ProAlphaObjectId == $"{address.GetExtension<AddressExtension>().ProAlphaObjectId}_{typeKey}" ||
					     x.TypeKey == typeKey)
				.OrderBy(x => x.CreateDate)
				.FirstOrDefault();

			if (existingCommunication != null && string.IsNullOrEmpty(data))
			{
				integrationService.Remove(existingCommunication);
			}
			else if (!string.IsNullOrEmpty(data))
			{
				var communication = transformService.Transform(
					new Tuple<Address, string, string, TCommunication>(
						address,
						typeKey,
						data,
						existingCommunication));

				integrationService.SaveOrUpdate(communication);
			}
		}

		protected virtual void DeleteCompany(Company company)
		{
			foreach (var companyCommunication in company.Communications)
			{
				if (companyCommunication is Email email)
				{
					emailIntegrationService.Remove(email);
				}
				else if (companyCommunication is Phone phone)
				{
					phoneIntegrationService.Remove(phone);
				}
				else if (companyCommunication is Fax fax)
				{
					faxIntegrationService.Remove(fax);
				}
				else if (companyCommunication is Website website)
				{
					websiteIntegrationService.Remove(website);
				}
			}

			addressIntegrationService.Remove(company.StandardAddress);
			companyIntegrationService.Remove(company);
		}

		public CustomProspectDataSetImportService(
			ISessionProvider sessionProvider,
			IAppSettingsProvider appSettingsProvider,
			ILog logger,
			IUncHelper uncHelper,
			IProAlphaXmlHelper proAlphaXmlHelper,
			IProAlphaIntegrationDataService proAlphaIntegrationDataService,
			IProAlphaResponseService responseService,
			IProAlphaDataSetImportHelper proAlphaDataSetImportHelper,
			IIntegrationService<Company, Guid> companyIntegrationService,
			IIntegrationService<Address, Guid> addressIntegrationService,
			IIntegrationService<Email, Guid> emailIntegrationService,
			IIntegrationService<Phone, Guid> phoneIntegrationService,
			IIntegrationService<Fax, Guid> faxIntegrationService,
			IIntegrationService<Website, Guid> websiteIntegrationService,
			ITransformService<Tuple<Custom_VC_Interessent, S_Kunde, S_Adresse, Company>, Company> companyTransformService,
			ITransformService<Tuple<S_Adresse, Company, Address>, Address> addressTransformService,
			ITransformService<Tuple<Address, string, string, Email>, Email> emailTransformService,
			ITransformService<Tuple<Address, string, string, Phone>, Phone> phoneTransformService,
			ITransformService<Tuple<Address, string, string, Fax>, Fax> faxTransformService,
			ITransformService<Tuple<Address, string, string, Website>, Website> websiteTransformService,
			IIntegrationService<ArticleDiscountGroupCustomer, Guid> companyArticleDiscountIntegrationService,
			ITransformService<Tuple<Custom_VC_Interessent, S_KunARabStaffel, ArticleDiscountGroupCustomer>, ArticleDiscountGroupCustomer> companyArticleDiscountTransformService)
			: base(
				sessionProvider,
				appSettingsProvider,
				logger,
				uncHelper,
				proAlphaXmlHelper,
				proAlphaIntegrationDataService,
				responseService,
				proAlphaDataSetImportHelper)
		{
			this.companyIntegrationService = companyIntegrationService;
			this.addressIntegrationService = addressIntegrationService;
			this.emailIntegrationService = emailIntegrationService;
			this.phoneIntegrationService = phoneIntegrationService;
			this.faxIntegrationService = faxIntegrationService;
			this.websiteIntegrationService = websiteIntegrationService;
			this.companyTransformService = companyTransformService;
			this.addressTransformService = addressTransformService;
			this.emailTransformService = emailTransformService;
			this.phoneTransformService = phoneTransformService;
			this.faxTransformService = faxTransformService;
			this.websiteTransformService = websiteTransformService;
			this.companyArticleDiscountIntegrationService = companyArticleDiscountIntegrationService;
			this.companyArticleDiscountTransformService = companyArticleDiscountTransformService;
		}
	}
}