namespace Customer.Ramseier.Services.TransformServices.Export
{
	using System;

	using AutoMapper;

	using Customer.Ramseier.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Customer.Ramseier.Model;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.Globalization;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Model;
	using Crm.Library.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;

	using log4net;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.Model;
	using System.Linq;
	using LMobile.Unicore.NHibernate;

	public class ContactStatusesTransformService : DefaultTransformService<Tuple<ContactStatus, BBT_WflLockStatusInst>, BBT_WflLockStatusInst>
	{
		protected readonly Func<ContactStatus> contactStatusFactory;
		protected readonly ILookupResolveService<Language, string> languageLookupResolveService;
		protected readonly IUserNameResolveService userNameResolveService;
		protected readonly IUserEmailService userEmailService;
		protected readonly IIntegrationService<Company, Guid> companyIntegrationService;

		public override void ValidateInput(Tuple<ContactStatus, BBT_WflLockStatusInst> input)
		{
			var contactStatus = input.Item1;
			if (contactStatus == null)
			{
				throw new ArgumentNullException(nameof(Company), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}
		}

		public override BBT_WflLockStatusInst MapInput(Tuple<ContactStatus, BBT_WflLockStatusInst> input)
		{
			var contactStatus = input.Item1;
			var output = input.Item2 ?? new BBT_WflLockStatusInst();

			Map(contactStatus, output);

			return output;
		}
		public override BBT_WflLockStatusInst MapAfterResolve(Tuple<ContactStatus, BBT_WflLockStatusInst> src, BBT_WflLockStatusInst dest)
		{
			var contactStatus = src.Item1;

			MapContactStatusCompany(contactStatus, dest);

			return base.MapAfterResolve(src, dest);
		}
		public virtual BBT_WflLockStatusInst MapContactStatusCompany(ContactStatus src, BBT_WflLockStatusInst dest)
		{
			var contactStatusCompany = companyIntegrationService.GetPersistentEntityByQuery(
				companyIntegrationService.GetQueryable()
					.Where(x => x.Id == src.ContactKey));

			dest.Customer = contactStatusCompany.LegacyId;
			dest.Owning_Obj = contactStatusCompany.GetExtension<CompanyExtension>().CustomerObjectId?? contactStatusCompany.GetExtension<CompanyExtension>().ProAlphaObjectId;
			return dest;
		}

		public ContactStatusesTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger,
			ILookupResolveService<Language, string> languageLookupResolveService,
			Func<ContactStatus> contactStatusFactory,
			IIntegrationService<Company, Guid> companyIntegrationService)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				resourceManager,
				ruleValidationService,
				logger)
		{
			this.languageLookupResolveService = languageLookupResolveService;
			this.contactStatusFactory = contactStatusFactory;
			this.companyIntegrationService = companyIntegrationService;
		}
	}
}