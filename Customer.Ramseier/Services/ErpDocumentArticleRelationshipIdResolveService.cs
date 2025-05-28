namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices;
	using Crm.Library.Data.Domain.DataInterfaces;

	using Customer.Ramseier.Model;

	public class ErpDocumentArticleRelationshipIdResolveService : DefaultLegacyIdResolveService<ErpDocumentArticleRelationship, Guid>
	{
		protected override ErpDocumentArticleRelationship LoadEntity(string legacyId)
		{
			return repository.GetAll().SingleOrDefault(
				x => x.IsActive == true && (x.ProAlphaObjectId == legacyId
				     || x.ProAlphaLegacyId == legacyId));
		}

		public ErpDocumentArticleRelationshipIdResolveService(IRepositoryWithTypedId<ErpDocumentArticleRelationship, Guid> repository)
			: base(repository)
		{
		}
	}
}