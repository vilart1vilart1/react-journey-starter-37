namespace Customer.Swecon.Schultes
{
    using System.Web.Mvc;
    using System.Web.Routing;

    using Crm.Library.Modularization.Registrars;
    using Crm.Library.Routing.Constraints;

    public class Routes : IRouteRegistrar
    {
        public RoutePriority Priority => RoutePriority.Normal;
        public void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("Plugins/Customer.Swecon.Schultes/Content/{*restOfUrl}");

            // Add additional routes here

            routes.MapRoute(
              null,
              "{plugin}/{controller}/{action}/{id}",
              new { action = "Index", id = 0 },
              new { plugin = new IsCurrentPluginName(new SweconSchultesPlugin()) },
              new[] { "Customer.Swecon.Schultes.Controllers" }
            );
        }
    }
}
