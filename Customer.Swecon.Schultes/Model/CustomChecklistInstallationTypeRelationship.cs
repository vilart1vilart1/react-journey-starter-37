namespace Customer.Swecon.Schultes.Model
{


	using Crm.DynamicForms.Model;
	using Crm.Library.BaseModel;
	using Crm.Library.BaseModel.Interfaces;


	using Customer.Swecon.Schultes.Model.Extensions;

	using Newtonsoft.Json;


	public class CustomChecklistInstallationTypeRelationship : EntityBase<int>, ISoftDelete
	{

		public virtual int ChecklistId { get; set; }
		[JsonIgnore]
		public virtual DynamicForm DynamicForm { get; set; }

		public virtual string InstallationTypeKey { get; set; }

		public virtual bool RequiredForServiceOrderCompletion { get; set; }

		public virtual bool SendToCustomer { get; set; }
		public virtual CustomInstallationType CustomInstallationType { get; set; }

		public virtual string Description { get; set; }


	}
}