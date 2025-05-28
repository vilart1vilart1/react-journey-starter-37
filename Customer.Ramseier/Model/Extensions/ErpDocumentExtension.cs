namespace Customer.Ramseier.Model.Extensions
{
    using Crm.ErpExtension.Model;
    using Crm.Library.BaseModel;

    public class ErpDocumentExtension : EntityExtension<ErpDocument>
    {
        public bool IsComplained { get; set; }
    }
}