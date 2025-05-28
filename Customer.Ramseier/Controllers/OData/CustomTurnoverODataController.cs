namespace Customer.Ramseier.Controllers.OData
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Web.Http;
    using Crm.ErpExtension.Controllers.OData;
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
	public class CustomTurnoverODataController : ODataControllerEx
	{
		private readonly IRepositoryWithTypedId<ErpTurnover, Guid> erpTurnoverRepository;
		public Type EntityType => typeof(ErpTurnover);
		public CustomTurnoverODataController(IRepositoryWithTypedId<ErpTurnover, Guid> erpTurnoverRepository)
		{
			this.erpTurnoverRepository = erpTurnoverRepository;
		}

        [HttpGet]
        [ODataRoute("CustomTurnoverPerArticleGroup01AndYear(ContactKey={contactKey},IsVolume={isVolume},CurrencyKey={currencyKey},QuantityUnitKey={quantityUnitKey})")]
        public virtual IHttpActionResult CustomTurnoverPerArticleGroup01AndYear(ODataQueryOptions<ErpTurnoverRest> options, Guid contactKey, bool isVolume, string currencyKey, string quantityUnitKey)
        {
            var year = DateTime.Now.Year - 4;
            var chartData = erpTurnoverRepository.GetAll()
                .Where(x => x.ContactKey == contactKey && x.IsVolume == isVolume && x.CurrencyKey == currencyKey && x.QuantityUnitKey == quantityUnitKey && x.Year > year)
                .GroupBy(k => new { k.ArticleGroup01Key, k.Year }, e => e.Total, (key, elements) => new { key.ArticleGroup01Key, key.Year, Total = elements.Sum() })
                .AsEnumerable()
                .Select(x => new TurnoverChartData { d = x.ArticleGroup01Key, x = x.Year, y = x.Total });
            return Ok(chartData);
        }
    }
}