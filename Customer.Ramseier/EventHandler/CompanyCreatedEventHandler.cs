namespace Customer.Ramseier.EventHandler
{
	using System;
	using System.Linq;

	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.Lookups;
	using Crm.Library.BaseModel;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Modularization.Events;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;

	public class CompanyCreatedEventHandler : IEventHandler<EntityCreatedEvent<Company>>
	{
		private readonly IRepositoryWithTypedId<Company, Guid> companyRepository;
		private readonly IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository;
		private readonly IRepositoryWithTypedId<SalesAgentCompanyRelationship, Guid> salesAgentCompanyRelationshipRepository;
		private readonly IUserService userService;
		public CompanyCreatedEventHandler(IRepositoryWithTypedId<Company, Guid> companyRepository, IUserService userService, IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository, IRepositoryWithTypedId<SalesAgentCompanyRelationship, Guid> salesAgentCompanyRelationshipRepository)
		{
			this.companyRepository = companyRepository;
			this.userService = userService;
			this.salesAgentRepository = salesAgentRepository;
			this.salesAgentCompanyRelationshipRepository = salesAgentCompanyRelationshipRepository;
		}

		public void Handle(EntityCreatedEvent<Company> e)
		{
			var createUserString = e.Entity.CreateUser;
			var createUser = userService.GetUser(createUserString);

			if (createUser == null)
			{
				return;
			}

			var salesAgent = salesAgentRepository.GetAll().FirstOrDefault(x => x.UserId == createUserString);
			if (salesAgent != null)
			{
				var salesAgentCompanyRelationship = new SalesAgentCompanyRelationship
				{
					CreateUser = createUserString,
					CompanyId = e.Entity.Id,
					SalesAgentId = salesAgent.Id,
					IsMainAgent = true,
					IsExported = false,
					SalesAgentCompanyRelationshipType = SalesAgentCompanyRelationshipType.Prospect.Key
				};
				salesAgentCompanyRelationshipRepository.SaveOrUpdate(salesAgentCompanyRelationship);
			}

			if (createUser.Usergroups.Any())
			{
				e.Entity.Visibility = Visibility.UserGroups;
				foreach (var userUsergroup in createUser.Usergroups)
				{
					e.Entity.VisibleToUsergroupIds.Add(userUsergroup.Id);
				}

				companyRepository.SaveOrUpdate(e.Entity);
			}
		}
	}
}