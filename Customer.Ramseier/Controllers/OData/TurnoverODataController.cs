namespace Customer.Ramseier.Controllers.OData
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Web.Http;
	using Crm.ErpExtension.Model;
	using Crm.ErpExtension.Rest.Model;
	using Crm.Library.Api;
	using Crm.Library.Api.Controller;
	using Crm.Library.Api.Extensions;
	using Crm.Library.Api.Versioning;
	using Crm.Library.Data.Domain.DataInterfaces;

	using Microsoft.AspNet.OData;
	using Microsoft.AspNet.OData.Query;
	using Microsoft.AspNet.OData.Routing;
	using Microsoft.Web.Http;

	[ApiVersion(ApiVersions.S1_0)]
	public class TurnoverODataController : ODataControllerEx, IEntityApiController
	{
		private readonly IRepositoryWithTypedId<ErpTurnover, Guid> erpTurnoverRepository;
		public Type EntityType => typeof(ErpTurnover);
		public TurnoverODataController(IRepositoryWithTypedId<ErpTurnover, Guid> erpTurnoverRepository)
		{
			this.erpTurnoverRepository = erpTurnoverRepository;
		}
		[HttpGet]
		[ODataRoute(nameof(GroupedTurnoverByArticleGroup01) + "(CompanyKey={companyKey}, ShowVolume={showVolume}, CurrencyKey={currencyKey}, QuantityUnitKey={quantityUnitKey}, Year={year})")]
		public virtual IHttpActionResult GroupedTurnoverByArticleGroup01(Guid companyKey, bool showVolume, string currencyKey, string quantityUnitKey, int year)
		{
			var groupedData = erpTurnoverRepository.GetAll()
				.Where(x => x.ContactKey == companyKey)
				.Where(x => x.IsVolume == showVolume)
				.Where(x => x.CurrencyKey == currencyKey)
				.Where(x => x.QuantityUnitKey == quantityUnitKey)
				.Where(x => x.Year >= year)
				.GroupBy(k => new { k.ArticleGroup01Key, k.Year }, e => e.Total.Value, (key, elements) => new { key.ArticleGroup01Key, key.Year, TotalSum = elements.Sum() })
				.AsEnumerable()
				.Select(x => new TurnoverGroupedTotalData { articleGroupKey = x.ArticleGroup01Key, year = x.Year, total = x.TotalSum });
			return Ok(groupedData);
		}
	}
}