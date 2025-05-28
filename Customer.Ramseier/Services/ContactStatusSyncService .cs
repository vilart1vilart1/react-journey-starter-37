namespace Customer.Ramseier.Services
{
	using AutoMapper;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Model;
	using Crm.Library.Rest;
	using Crm.Library.Services;
	using Customer.Ramseier.Model;
	using System;
	using System.Linq;

	public class ContactStatusSyncService : DefaultSyncService<ContactStatus, Guid>
	{
		public ContactStatusSyncService(IRepositoryWithTypedId<ContactStatus, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
		}
		public override IQueryable<ContactStatus> GetAll(User user)
		{
			return repository.GetAll();
		}
		public override ContactStatus Save(ContactStatus entity)
		{
			entity.IsExported = false;
			return repository.SaveOrUpdate(entity);
		}
	}
}