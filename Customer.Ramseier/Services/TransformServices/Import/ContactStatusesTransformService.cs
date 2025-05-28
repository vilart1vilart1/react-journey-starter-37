namespace Customer.Ramseier.Services.TransformServices.Import.User
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

	public class ContactStatusesTransformService : DefaultTransformService<Tuple<BBT_WflLockStatusInst, ContactStatus>, ContactStatus>
	{
		protected readonly Func<ContactStatus> contactStatusFactory;
		protected readonly ILookupResolveService<Language, string> languageLookupResolveService;
		protected readonly IUserNameResolveService userNameResolveService;
		protected readonly IUserEmailService userEmailService;
		protected readonly ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService;

		public override void ValidateInput(Tuple<BBT_WflLockStatusInst, ContactStatus> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(BBT_WflLockStatusInst), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}else if (input.Item1.LockStatusDescription == null)
			{
				throw new ArgumentNullException(nameof(BBT_WflLockStatusInst), $"{nameof(input)}.{nameof(input.Item1.LockStatusDescription)} cannot be null");
			}
			else if (input.Item1.LockStatusFunction == null)
			{
				throw new ArgumentNullException(nameof(BBT_WflLockStatusInst), $"{nameof(input)}.{nameof(input.Item1.LockStatusFunction)} cannot be null");
			}
			else if (input.Item1.BBM_WflLockStatus_ID == null)
			{
				throw new ArgumentNullException(nameof(BBT_WflLockStatusInst), $"{nameof(input)}.{nameof(input.Item1.BBM_WflLockStatus_ID)} cannot be null");
			}
			else if (input.Item1.Owning_Obj == null)
			{
				throw new ArgumentNullException(nameof(BBT_WflLockStatusInst), $"{nameof(input)}.{nameof(input.Item1.Owning_Obj)} cannot be null");
			}
		}

		public override ContactStatus MapInput(Tuple<BBT_WflLockStatusInst, ContactStatus> input)
		{
			var contactStatus = input.Item1;
			var output = input.Item2 ?? contactStatusFactory();
			output.IsExported = true;
			Map(contactStatus, output);

			return output;
		}
		public override ContactStatus MapAndResolveLegacyIds(Tuple<BBT_WflLockStatusInst, ContactStatus> src, ContactStatus dest)
		{
			var contactStatus = src.Item1;
			dest.ContactKey = companyLegacyIdResolveService.ResolveLegacyId(contactStatus.Owning_Obj);

			return base.MapAndResolveLegacyIds(src, dest);
		}
		//public override ContactStatus MapAfterResolve(Tuple<BBT_WflLockStatusInst, ContactStatus> src, ContactStatus dest)
		//{
		//	var contactStatus = src.Item1;

		//	MapContactStatusCompany(contactStatus, dest);

		//	return base.MapAfterResolve(src, dest);
		//}
		//public virtual ContactStatus MapContactStatusCompany(BBT_WflLockStatusInst src, ContactStatus dest)
		//{
		//	var ContactStatusCompany = companyIntegrationService.GetPersistentEntityByQuery(
		//		companyIntegrationService.GetQueryable()
		//			.Where(x => x.ModelExtension<CompanyExtension, string>(e => e.CustomerObjectId) == src.Owning_Obj));

		//	dest.ContactKey = ContactStatusCompany?.Id;
		//	return dest;
		//}

		public ContactStatusesTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger,
			ILookupResolveService<Language, string> languageLookupResolveService,
			Func<ContactStatus> contactStatusFactory,
			ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService)
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
			this.companyLegacyIdResolveService = companyLegacyIdResolveService;
		}
	}
}