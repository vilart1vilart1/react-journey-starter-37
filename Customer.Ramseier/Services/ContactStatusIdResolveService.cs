namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices;
	using Crm.Library.Data.Domain.DataInterfaces;

	using Customer.Ramseier.Model;

	public class ContactStatusIdResolveService : DefaultLegacyIdResolveService<ContactStatus, Guid>
	{
		protected override ContactStatus LoadEntity(string legacyId)
		{
			return repository.GetAll().SingleOrDefault(
				x => x.ProAlphaObjectId == legacyId
						 || x.ProAlphaLegacyId == legacyId);
		}

		public ContactStatusIdResolveService(IRepositoryWithTypedId<ContactStatus, Guid> repository)
			: base(repository)
		{
		}
	}
}