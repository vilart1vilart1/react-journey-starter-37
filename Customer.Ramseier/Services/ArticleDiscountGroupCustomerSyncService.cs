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

	public class ArticleDiscountGroupCustomerSyncService : DefaultSyncService<ArticleDiscountGroupCustomer, Guid>
	{
		public ArticleDiscountGroupCustomerSyncService(IRepositoryWithTypedId<ArticleDiscountGroupCustomer, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper)
			: base(repository, restTypeProvider, restSerializer, mapper)
		{
		}
		public override IQueryable<ArticleDiscountGroupCustomer> GetAll(User user)
		{
			return repository.GetAll();
		}
	}
}