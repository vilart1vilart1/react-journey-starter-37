namespace Customer.Ramseier.Rest.Model.V1_0.Mappings
{
	using AutoMapper;
	using Crm.Library.AutoMapper;
    using Crm.Model;
    using Crm.Rest.Model.V1_0;
    public class ArticleDiscountGroupCustomerRestMap : IAutoMap
	{
		public void CreateMap(IProfileExpression mapper)
		{
			mapper.CreateMap<Company, CompanyRest>();
		}
	}
}