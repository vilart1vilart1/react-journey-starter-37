namespace Customer.Swecon.Schultes.Controllers
{
	using System.Linq;
	using System.Web.Mvc;

	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Rest;

	using Customer.Swecon.Schultes.Model;

	public class CustomChecklistInstallationTypeRelationshipRestController : RestController<CustomChecklistInstallationTypeRelationship>
	{
		private readonly IRepositoryWithTypedId<CustomChecklistInstallationTypeRelationship, int> CustomChecklistInstallationTypeRelationshipRepository;
		public CustomChecklistInstallationTypeRelationshipRestController(IRepositoryWithTypedId<CustomChecklistInstallationTypeRelationship, int> CustomChecklistInstallationTypeRelationshipRepository)
		{
			this.CustomChecklistInstallationTypeRelationshipRepository = CustomChecklistInstallationTypeRelationshipRepository;
		}
		public ActionResult GetRelationships(int id)
		{
			var relationships = CustomChecklistInstallationTypeRelationshipRepository.GetAll().Where(x => x.ChecklistId == id);
			return Rest(relationships.ToArray());
		}
		public ActionResult Delete(int id)
		{
			var relationship = CustomChecklistInstallationTypeRelationshipRepository.Get(id);
			if (relationship != null)
			{
				CustomChecklistInstallationTypeRelationshipRepository.Delete(relationship);
			}

			return Rest(true);
		}
		public ActionResult Save(CustomChecklistInstallationTypeRelationship relationship)
		{
			CustomChecklistInstallationTypeRelationshipRepository.SaveOrUpdate(relationship);
			return Rest(relationship);
		}
	}
}