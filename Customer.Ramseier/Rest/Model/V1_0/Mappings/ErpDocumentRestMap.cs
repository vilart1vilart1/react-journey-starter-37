namespace Customer.Ramseier.Rest.Model.V1_0.Mappings
{
	using AutoMapper;
    using Crm.ErpExtension.Model;
    using Crm.ErpExtension.Rest.Model;
    using Crm.Library.AutoMapper;
    public class ErpDocumentRestMap : IAutoMap
	{
		public void CreateMap(IProfileExpression mapper)
		{
			mapper.CreateMap<ErpDocument, ErpDocumentRest>();
		}
	}
}