namespace Customer.Ramseier.Controllers.OData
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Net;
	using System.Web.Http.Description;
    using Crm.ErpExtension.Controllers.OData;
    using Crm.ErpExtension.Rest.Model;
    using Crm.Library.Api.Documentation;
	using Crm.Library.Api.Model;
	using Crm.Library.Api.Versioning;

	using Microsoft.AspNet.OData.Builder;
	using Microsoft.Web.Http;

	using Swashbuckle.Swagger;

	using ODataConventionModelBuilder = Crm.Library.Api.Model.ODataConventionModelBuilder;

	public class CustomTurnoverFunctionConfigurator : IModelConfigurator
	{
		private readonly DocHelper helper;
        private FunctionConfiguration customTurnoverPerArticleGroup01AndYear;

        public CustomTurnoverFunctionConfigurator(DocHelper helper)
		{
			this.helper = helper;
		}
		public void Configure(ApiVersion apiVersion, ODataConventionModelBuilder builder)
		{
			if (apiVersion < ApiVersions.V1_0)
			{
				return;
			}

            customTurnoverPerArticleGroup01AndYear = builder
                    .Function(nameof(CustomTurnoverODataController.CustomTurnoverPerArticleGroup01AndYear))
                    .ReturnsCollection<TurnoverChartData>();
            customTurnoverPerArticleGroup01AndYear.Parameter<Guid>("ContactKey");
            customTurnoverPerArticleGroup01AndYear.Parameter<bool>("IsVolume");
            customTurnoverPerArticleGroup01AndYear.Parameter<string>("CurrencyKey");
            customTurnoverPerArticleGroup01AndYear.Parameter<string>("QuantityUnitKey");
            customTurnoverPerArticleGroup01AndYear.Title = "gets the total turnover per ArticleGroup01 and year ready to display in a chart";


        }
		//public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
		//{
		//	if (apiDescription.ActionDescriptor.ControllerDescriptor.ControllerType == typeof(CustomTurnoverODataController))
		//	{
		//		operation.parameters = operation.parameters.Where(x => x.name != "$expand").ToList();
  //              if (operation.operationId.EndsWith(nameof(CustomTurnoverODataController.CustomTurnoverPerArticleGroup01AndYear)))
  //              {
  //                  operation.description = customTurnoverPerArticleGroup01AndYear.Title;
  //                  var schema = new Schema
  //                  {
  //                      type = "array",
  //                      items = new Schema
  //                      {
  //                          title = nameof(TurnoverChartData),
  //                          type = "object",
  //                          properties = new Dictionary<string, Schema>
  //                          {
  //                              { nameof(TurnoverChartData.d), new Schema { type = "string" }},
  //                              { nameof(TurnoverChartData.x), new Schema { type = "integer", format = "int32" }},
  //                              { nameof(TurnoverChartData.y), new Schema { type = "number", format = "float" }},
  //                          }
  //                      },
  //                      title = $"Array[{nameof(TurnoverChartData)}]"
  //                  };
  //                  var turnoverChartDataInfo = helper.GetTypeInfo(typeof(TurnoverChartData));
  //                  helper.HandlePropertiesAndSetExample(schema.items, turnoverChartDataInfo);
  //                  schema.required = turnoverChartDataInfo.Required;
  //                  operation.responses[((int)HttpStatusCode.OK).ToString()].schema = schema;
  //              }
		//	}
		//}
	}
}
