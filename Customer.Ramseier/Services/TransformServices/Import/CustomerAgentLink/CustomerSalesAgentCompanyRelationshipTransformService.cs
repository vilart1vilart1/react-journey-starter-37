namespace Customer.Ramseier.Services.Import.CustomerAgentLink
{
	using System;
	using System.Linq;

	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.CustomerAgentLink;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.BaseModel;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Extensions;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Model;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;

	using log4net;

	public class CustomerSalesAgentCompanyRelationshipTransformService : SalesAgentCompanyRelationshipTransformService,IReplaceRegistration<SalesAgentCompanyRelationshipTransformService>
	{
		private readonly IRepositoryWithTypedId<Company, Guid> companyRepository;
		private readonly IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository;
        private readonly IRepositoryWithTypedId<Usergroup, Guid> userGroupRepository;
        public CustomerSalesAgentCompanyRelationshipTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService, ILegacyIdResolveService<SalesAgent, Guid> salesAgentLegacyIdResolveService, Func<SalesAgentCompanyRelationship> salesAgentCompanyRelationshipFactory, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, IRepositoryWithTypedId<Company, Guid> companyRepository, IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository, IRepositoryWithTypedId<Usergroup, Guid> userGroupRepository)
			: base(mapper, domainService, extensionMappingService, companyLegacyIdResolveService, salesAgentLegacyIdResolveService, salesAgentCompanyRelationshipFactory, resourceManager, ruleValidationService, logger)
		{
			this.companyRepository = companyRepository;
			this.salesAgentRepository = salesAgentRepository;
			this.userGroupRepository = userGroupRepository;
		}
		public override SalesAgentCompanyRelationship MapAfterResolve(Tuple<S_KundeVertreter, SalesAgentCompanyRelationship> src, SalesAgentCompanyRelationship dest)
		{
			var customerAgentLink = src.Item1;

			var salesAgentId = salesAgentLegacyIdResolveService.ResolveLegacyId($"SalesAgent_{customerAgentLink.Firma}_{customerAgentLink.Vertreter}");
			var companyId = companyLegacyIdResolveService.ResolveLegacyId($"{customerAgentLink.Firma}_{customerAgentLink.Kunde}");

			var salesAgent = salesAgentRepository.GetAll().FirstOrDefault(x => x.Id == salesAgentId);
			var company = companyRepository.GetAll().FirstOrDefault(x => x.Id == companyId);
			var userGroups = userGroupRepository.GetAll().Where(x => x.Name == salesAgent.UserId);
            PersonVisibilityUpdater personVisibility = new PersonVisibilityUpdater();
            

            if (userGroups.Any())
			{
                if (company != null)
                {
                    company.Visibility = Visibility.UserGroups;
					
                    foreach (var userUserGroup in userGroups)
                    {
                        company.VisibleToUsergroupIds.Add(userUserGroup.Id);
                    
                    }
                    
                }
				if (company.Staff.Count() > 0)
				{
					foreach (var person in company.Staff)
					{
                        personVisibility.UpdatePersonVisibility(person, userGroups);
                    }
				}
			}
				
			return base.MapAfterResolve(src, dest);
		}
	}
}