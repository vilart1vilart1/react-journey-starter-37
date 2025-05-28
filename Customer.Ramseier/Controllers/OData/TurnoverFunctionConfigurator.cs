namespace Customer.Ramseier.Controllers.OData
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Net;
	using System.Web.Http.Description;
	using Crm.ErpExtension.Rest.Model;
	using Crm.Library.Api.Documentation;
	using Crm.Library.Api.Model;
	using Crm.Library.Api.Versioning;

	using Microsoft.AspNet.OData.Builder;
	using Microsoft.Web.Http;

	using Swashbuckle.Swagger;

	using ODataConventionModelBuilder = Crm.Library.Api.Model.ODataConventionModelBuilder;

	public class TurnoverFunctionConfigurator : IModelConfigurator, IOperationFilter
	{
		private readonly DocHelper helper;
		private FunctionConfiguration turnoverTotalPerArticlegroup01AndYear;
		public TurnoverFunctionConfigurator(DocHelper helper)
		{
			this.helper = helper;
		}
		public void Configure(ApiVersion apiVersion, ODataConventionModelBuilder builder)
		{
			if (apiVersion < ApiVersions.V1_0)
			{
				return;
			}
			turnoverTotalPerArticlegroup01AndYear = builder
				.Function(nameof(TurnoverODataController.GroupedTurnoverByArticleGroup01))
				.ReturnsCollection<TurnoverGroupedTotalData>();
			turnoverTotalPerArticlegroup01AndYear.Parameter<Guid>("companyKey");
			turnoverTotalPerArticlegroup01AndYear.Parameter<bool>("showVolume");
			turnoverTotalPerArticlegroup01AndYear.Parameter<string>("currencyKey").Optional();
			turnoverTotalPerArticlegroup01AndYear.Parameter<string>("quantityUnitKey").Optional();
			turnoverTotalPerArticlegroup01AndYear.Parameter<int>("year");
			turnoverTotalPerArticlegroup01AndYear.Title = "gets the total per articlegroup01 and year";
		}
		public void Apply(Operation operation, SchemaRegistry schemaRegistry, ApiDescription apiDescription)
		{
			if (apiDescription.ActionDescriptor.ControllerDescriptor.ControllerType == typeof(TurnoverODataController))
			{
				operation.parameters = operation.parameters.Where(x => x.name != "$expand").ToList();
				if (operation.operationId.EndsWith(nameof(TurnoverODataController.GroupedTurnoverByArticleGroup01)))
				{
					operation.description = turnoverTotalPerArticlegroup01AndYear.Title;
					var schema = new Schema
					{
						type = "array",
						items = new Schema
						{
							title = nameof(TurnoverGroupedTotalData),
							type = "object",
							properties = new Dictionary<string, Schema>
							{
								{ nameof(TurnoverGroupedTotalData.articleGroupKey), new Schema { type = "string" }},
								{ nameof(TurnoverGroupedTotalData.year), new Schema { type = "integer", format = "int32" }},
								{ nameof(TurnoverGroupedTotalData.total), new Schema { type = "number", format = "float" }},
							}
						},
						title = $"Array[{nameof(TurnoverGroupedTotalData)}]"
					};
					var turnoverGroupedDataInfo = helper.GetTypeInfo(typeof(TurnoverGroupedTotalData));
					helper.HandlePropertiesAndSetExample(schema.items, turnoverGroupedDataInfo);
					schema.required = turnoverGroupedDataInfo.Required;
					operation.responses[((int)HttpStatusCode.OK).ToString()].schema = schema;
				}
			}
		}
	}
}
