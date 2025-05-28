namespace Customer.Ramseier.Rest.Mappings
{
    using AutoMapper;
    using Crm.DynamicForms.Model;
    using Crm.DynamicForms.Rest.Model;
    using Crm.Library.AutoMapper;
    using Crm.VisitReport.Model;
    using Crm.VisitReport.Rest.Model;

    public class DynamicFormMap : IAutoMap
    {
        public void CreateMap(IProfileExpression mapper)
        {
            mapper.CreateMap<DynamicForm, DynamicFormRest>()
                .ForMember(x => x.ExtensionValues, m => m.MapFrom(x => x.Extensions));
        }
    }
}