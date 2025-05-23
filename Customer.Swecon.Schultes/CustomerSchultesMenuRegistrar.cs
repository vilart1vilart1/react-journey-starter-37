namespace Customer.Swecon.Schultes
{
	using Crm.Library.Modularization.Menu;

	public class CustomerSchultesMenuRegistrar : IMenuRegistrar<MainMenu>, IMenuRegistrar<MobileMainMenu>, IMenuRegistrar<MaterialMainMenu>
	{
		public void Initialize(MenuProvider<MainMenu> menuProvider)
		{
			//menuProvider.Register("Main", "Navision Export", "NavisionExportIndex");
		}
		public void Initialize(MenuProvider<MobileMainMenu> menuProvider)
		{

        }
		public void Initialize(MenuProvider<MaterialMainMenu> menuProvider)
		{

        }
	}
}