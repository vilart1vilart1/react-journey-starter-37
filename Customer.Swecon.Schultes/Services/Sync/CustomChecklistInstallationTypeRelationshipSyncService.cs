namespace Customer.Swecon.Schultes.Services.Sync
{
	using System;
	using System.Linq;

	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Model;
	using Crm.Library.Rest;
	using Crm.Library.Services;

	using Customer.Swecon.Schultes.Model;

	public class ChecklistBranchRelationshipSyncService : DefaultSyncService<CustomChecklistInstallationTypeRelationship, long>
	{
		public ChecklistBranchRelationshipSyncService(IRepositoryWithTypedId<CustomChecklistInstallationTypeRelationship, long> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer)
			: base(repository, restTypeProvider, restSerializer)
		{
		}
		public override CustomChecklistInstallationTypeRelationship Save(CustomChecklistInstallationTypeRelationship entity)
		{
			throw new NotImplementedException();
		}
		public override IQueryable<CustomChecklistInstallationTypeRelationship> GetAll(User user, DateTime? lastSync)
		{
			if (lastSync.HasValue)
			{
				return repository.GetAll(InactiveEntities.Include).Since(lastSync);
			}
			return repository.GetAll();
		}
	}
}