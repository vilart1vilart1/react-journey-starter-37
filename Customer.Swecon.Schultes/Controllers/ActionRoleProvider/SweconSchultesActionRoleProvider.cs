namespace Customer.Swecon.Schultes.Controllers.ActionRoleProvider
{

	using Crm.Library.Model.Authorization;
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization.Interfaces;
	using Crm.Service;

	using Customer.Swecon.Schultes.Model;

	public class SweconSchultesActionRoleProvider : RoleCollectorBase
	{
		private static readonly string[] Roles = {
			ServicePlugin.Roles.FieldService
		};
		public SweconSchultesActionRoleProvider(IPluginProvider pluginProvider)
			: base(pluginProvider)
		{
			Add(PermissionGroup.WebApi, typeof(CustomChecklistInstallationTypeRelationship).Name, Roles);
			
		}
	}
}