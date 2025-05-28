namespace Customer.Ramseier.Services.LegacyIdResolveServices
{
	using System;
	using System.Linq;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices;
	using Crm.Library.Data.Domain.DataInterfaces;

	using Customer.Ramseier.Model;

	public class CompanyArticleDiscountIdResolveService : DefaultLegacyIdResolveService<ArticleDiscountGroupCustomer, Guid>
	{
		protected override ArticleDiscountGroupCustomer LoadEntity(string legacyId)
		{
			return repository.GetAll().SingleOrDefault(
				x => x.ProAlphaObjectId == legacyId
						 || x.ProAlphaLegacyId == legacyId);
		}

		public CompanyArticleDiscountIdResolveService(IRepositoryWithTypedId<ArticleDiscountGroupCustomer, Guid> repository)
			: base(repository)
		{
		}
	}
}