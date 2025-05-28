namespace Customer.Ramseier
{
	using System.Web.Mvc;
	using System.Web.Routing;

	using Crm.Library.Modularization.Registrars;
	using Crm.Library.Rest;
	using Crm.Library.Routing.Constraints;

	public class Routes : IRouteRegistrar
	{
		public RoutePriority Priority => RoutePriority.Normal;
		public void RegisterRoutes(RouteCollection routes)
		{
			routes.IgnoreRoute("Plugins/Customer.Ramseier/Content/{*restOfUrl}");

			// Add additional routes here
			routes.MapRoute(
			 null,
			 "{plugin}/{controller}/{action}.{format}",
			 null,
			 new { format = new IsJsonOrXml(), plugin = new IsCurrentPluginName(new RamseierPlugin()), controller = new RestControllerName() },
			 new[] { "Customer.Ramseier.Rest.Controllers" }
			 );

			routes.MapRoute(
				null,
				"{plugin}/{controller}/{action}/{id}",
				new { action = "Index", id = 0 },
				new { plugin = new IsCurrentPluginName(new RamseierPlugin()) },
				new[] { "Customer.Ramseier.Controllers" }
			);
		}
	}
}