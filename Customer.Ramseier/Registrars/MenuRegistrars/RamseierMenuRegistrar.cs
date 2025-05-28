namespace Customer.Ramseier.Registrars.MenuRegistrars
{
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization.Menu;

	public class RamseierMenuRegistrar : IMenuRegistrar<MaterialMainMenu>
	{
		public void Initialize(MenuProvider<MaterialMainMenu> menuProvider)
		{
			menuProvider.Register("Sales", "Statistics", url: "~/Customer.Ramseier/TurnoverList/IndexTemplate", priority: 90);
			menuProvider.AddPermission("Sales", "Statistics", RamseierPlugin.PermissionGroup.Turnover, PermissionName.View);
            menuProvider.Register("Sales", "StatisticsByArticleGroup", url: "~/Customer.Ramseier/TurnoverArticleGroupList/IndexTemplate", priority: 80);
            menuProvider.AddPermission("Sales", "StatisticsByArticleGroup", RamseierPlugin.PermissionGroup.Turnover, PermissionName.View);
            menuProvider.Register("ErpDocuments", "All", priority: 600, url: "~/Customer.Ramseier/CustomErpDocumentList/IndexTemplate");
			menuProvider.AddPermission("ErpDocuments", "All", RamseierPlugin.PermissionGroup.CustomErpDocument, PermissionName.View);
		}
	}
}