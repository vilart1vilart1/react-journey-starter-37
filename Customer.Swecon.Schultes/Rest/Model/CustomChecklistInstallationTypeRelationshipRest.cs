

namespace Customer.Swecon.Schultes.Rest.Model
{
	using Crm.DynamicForms.Model;
	using Crm.Library.Rest;

	using Customer.Swecon.Schultes.Model;

	using Customer.Swecon.Schultes.Model.Extensions;

	using Newtonsoft.Json;

	[RestTypeFor(DomainType = typeof(CustomChecklistInstallationTypeRelationship))]
	public class CustomChecklistInstallationTypeRelationshipRest : RestEntity
	{
		public int Id { get; set; }

		public virtual int ChecklistId { get; set; }

		public virtual DynamicForm DynamicForm { get; set; }

		public virtual bool RequiredForServiceOrderCompletion { get; set; }
		public virtual bool SendToCustomer { get; set; }

		public virtual string InstallationTypeKey { get; set; }

		public virtual string Description { get; set; }

		public virtual CustomInstallationType CustomInstallationType { get; set; }

	}
}