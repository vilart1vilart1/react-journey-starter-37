namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;
	using AutoMapper;
    using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Model;
	using Crm.Library.Rest;
	using Crm.Library.Services;
    using Customer.Ramseier.Model;

    public class ErpDocumentArticleRelationshipSyncService : DefaultSyncService<ErpDocumentArticleRelationship, Guid>
	{
		public ErpDocumentArticleRelationshipSyncService(IRepositoryWithTypedId<ErpDocumentArticleRelationship, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
		}
		public override ErpDocumentArticleRelationship Save(ErpDocumentArticleRelationship entity)
		{
			repository.SaveOrUpdate(entity);
			return entity;
		}
		public override IQueryable<ErpDocumentArticleRelationship> GetAll(User user)
		{
			return repository.GetAll();
		}
	}
}
