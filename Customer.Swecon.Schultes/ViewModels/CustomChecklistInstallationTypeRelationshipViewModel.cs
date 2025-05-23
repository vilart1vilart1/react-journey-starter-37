namespace Customer.Swecon.Schultes.ViewModels
{
	using System.Collections.Generic;
	using Crm.ViewModels;
	using Customer.Swecon.Schultes.Model;
	using Customer.Swecon.Schultes.Model.Extensions;

	public class CustomChecklistInstallationTypeRelationshipViewModel : CrmModelList<CustomChecklistInstallationTypeRelationship>
	{
		public CustomChecklistInstallationTypeRelationship Item { get; set; }
		public List<CustomInstallationType> CustomInstallationTypes { get; set; }
	}
}