namespace Customer.Ramseier.Services.TransformServices.Import
{
    using AutoMapper;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Contact;
    using Crm.ErpIntegration.Services.Integration.Interfaces;
    using Crm.ErpIntegration.Services.Interfaces;
    using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.BaseModel;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Model;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using log4net;
    using System;
    using System.Linq;
    public class CustomerPersonTransformService : PersonTransformService, IReplaceRegistration<PersonTransformService>
    {
        private readonly IRepositoryWithTypedId<Company, Guid> companyRepository;
        private readonly IRepositoryWithTypedId<Usergroup, Guid> userGroupRepository;
        private readonly IRepositoryWithTypedId<ContactUserGroup, Guid> contactUserGroupRepository;
        
        public CustomerPersonTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IAppSettingsProvider appSettingsProvider, ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService, IIntegrationService<Address, Guid> addressIntegrationService, Func<Person> personFactory, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, IRepositoryWithTypedId<Company, Guid> companyRepository, IRepositoryWithTypedId<Usergroup, Guid> userGroupRepository, IRepositoryWithTypedId<ContactUserGroup, Guid> contactUserGroupRepository) : base(mapper, domainService, extensionMappingService, appSettingsProvider, companyLegacyIdResolveService, addressIntegrationService, personFactory, resourceManager, ruleValidationService, logger)
        {
            this.companyRepository = companyRepository;
            this.userGroupRepository = userGroupRepository;
            this.contactUserGroupRepository = contactUserGroupRepository;
        }

        public override Person MapAfterResolve(Tuple<S_Ansprech, Person> src, Person dest)
        {
            var contactPerson = src.Item1;
            var person = src.Item2;
            MapCompanyStandardAddress(contactPerson, dest);
            if (dest.ParentId != null)
            {
                var userGroupIds = contactUserGroupRepository.GetAll().Where(x => x.ContactKey == dest.ParentId).Select(x => x.UsergroupKey);
                var userGroups = userGroupRepository.GetAll().Where(x => userGroupIds.Contains(x.Id));
                var company = companyRepository.GetAll().Where(x => x.Id == dest.ParentId).FirstOrDefault();
                PersonVisibilityUpdater personVisibility = new PersonVisibilityUpdater();
                if (userGroups.Any())
                {
                    personVisibility.UpdatePersonVisibility(dest, userGroups);
                }
                else
                {
                    dest.Visibility = company.Visibility;
                }
                
            }
            
            return base.MapAfterResolve(src, dest);
        }
    }
}