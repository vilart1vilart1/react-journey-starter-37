namespace Customer.Ramseier.Controllers.OData
{
	using Crm.Library.Api.Versioning;

	using Microsoft.Web.Http;

	[ApiVersion(ApiVersions.S1_0)]
	public class TurnoverGroupedTotalData
	{
		public string articleGroupKey { get; set; }
		public int year { get; set; }
		public float total { get; set; }
	}
}