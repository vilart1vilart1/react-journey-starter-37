namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;

	using AutoMapper;

	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Model;
	using Crm.Library.Rest;
	using Crm.Library.Services;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Customer.Ramseier.Model;

	public class TurnoverArticleGroupSyncService : DefaultSyncService<TurnoverArticleGroup, Guid>
	{
        private readonly ISyncService<Company> companySyncService;
        public TurnoverArticleGroupSyncService(IRepositoryWithTypedId<TurnoverArticleGroup, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, ISyncService<Company> companySyncService) : base(repository, restTypeProvider, restSerializer, mapper)
		{
            this.companySyncService = companySyncService;
        }
        public override Type[] SyncDependencies => new[] { typeof(Company) };

        public override IQueryable<TurnoverArticleGroup> GetAll(User user)
        {
            var companies = companySyncService.GetAll(user);
            return repository.GetAll()
                .Where(x => x.ContactKey == null || companies.Any(y => y.Id == x.ContactKey));
        }
    }
}