namespace Customer.Ramseier.Services.TransformServices.Import.ProspectAgentLink
{
	using System;

	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;
	using LMobile.Unicore.NHibernate;
	using log4net;
	using Sms.ErpIntegration.ProAlphaBase;

	public class SalesAgentCompanyRelationshipTransformService : DefaultTransformService<Tuple<SalesAgentCompanyRelationship, VC_InterVertreter>, VC_InterVertreter>
	{
		protected readonly Func<SalesAgentCompanyRelationship> salesAgentCompanyRelationshipFactory;
		protected readonly ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService;
		protected readonly ILegacyIdResolveService<SalesAgent, Guid> salesAgentLegacyIdResolveService;
		private readonly IAppSettingsProvider appSettingsProvider;

		public override void ValidateInput(Tuple<SalesAgentCompanyRelationship, VC_InterVertreter> input)
		{
			if (input.Item1 == null)
			{
				throw new ArgumentNullException(nameof(SalesAgentCompanyRelationship), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
			}
		}

		public override VC_InterVertreter MapInput(Tuple<SalesAgentCompanyRelationship, VC_InterVertreter> input)
		{
			var SalesAgentCompanyRelationship = input.Item1;
			var output = input.Item2 ?? new VC_InterVertreter();
			output.TransferData.Deleted = !SalesAgentCompanyRelationship.IsActive;

			Map(SalesAgentCompanyRelationship, output);

			return output;
		}

		public override VC_InterVertreter MapAndResolveLegacyIds(Tuple<SalesAgentCompanyRelationship, VC_InterVertreter> src, VC_InterVertreter dest)
		{
			var SalesAgentCompanyRelationship = src.Item1;
			dest.Interessent = Int32.Parse(SalesAgentCompanyRelationship.Company.GetExtension<CompanyExtension>().ProAlphaLegacyId.Split('_')[1]);
			dest.Vertreter = Int32.Parse(SalesAgentCompanyRelationship.SalesAgent.ProAlphaLegacyId.Split('_')[2] );
			dest.Firma = SalesAgentCompanyRelationship.ProAlphaLegacyId !=null ? SalesAgentCompanyRelationship.ProAlphaLegacyId.Split('_')[0] : appSettingsProvider.GetValue(ErpIntegrationProAlphaBasePlugin.Firma);

			return base.MapAndResolveLegacyIds(src, dest);
		}

		//public override SalesAgentCompanyRelationship MapDomain(Tuple<SalesAgentCompanyRelationship, VC_InterVertreter> src, VC_InterVertreter dest)
		//{
		//	if (domainService.IsMultitenantPluginActive())
		//	{
		//		var domain = domainService.GetDomainByLegacyId(src.Item1.Firma);
		//		dest.AuthData = dest.AuthData ?? new LMobile.Unicore.EntityAuthData { DomainId = domain.UId };
		//	}
		//	return dest;
		//}

		public SalesAgentCompanyRelationshipTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService,
			ILegacyIdResolveService<SalesAgent, Guid> salesAgentLegacyIdResolveService,
			Func<SalesAgentCompanyRelationship> salesAgentCompanyRelationshipFactory,
			IAppSettingsProvider appSettingsProvider,
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
			this.companyLegacyIdResolveService = companyLegacyIdResolveService;
			this.salesAgentLegacyIdResolveService = salesAgentLegacyIdResolveService;
			this.salesAgentCompanyRelationshipFactory = salesAgentCompanyRelationshipFactory;
			this.appSettingsProvider = appSettingsProvider;
		}
	}
}