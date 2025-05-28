namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;

	using AutoMapper;

	using Crm.ErpExtension.Model;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Model;
	using Crm.Library.Rest;
	using Crm.Library.Services;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Customer.Ramseier.Model;
    using NHibernate.Linq;

	public class CustomErpDocumentSyncService : DefaultSyncService<CustomErpDocument, Guid>
	{
        private readonly ISyncService<Company> companySyncService;
        public CustomErpDocumentSyncService(IRepositoryWithTypedId<CustomErpDocument, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, ISyncService<Company> companySyncService)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
            this.companySyncService = companySyncService;
        }
		public override IQueryable<CustomErpDocument> GetAll(User user)
		{
            var companies = companySyncService.GetAll(user);
            return repository.GetAll()
                .Where(x => x.ContactKey == null || companies.Any(y => y.Id == x.ContactKey));
        }
		public override CustomErpDocument Save(CustomErpDocument entity)
		{
			throw new NotImplementedException();
		}
		public override void Remove(CustomErpDocument entity)
		{
			throw new NotImplementedException();
		}
		public override IQueryable<CustomErpDocument> Eager(IQueryable<CustomErpDocument> entities)
		{
			return entities.Fetch(x => x.Contact);
		}
	}
}