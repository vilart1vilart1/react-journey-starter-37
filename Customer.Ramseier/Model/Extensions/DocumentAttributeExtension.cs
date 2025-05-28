namespace Customer.Ramseier.Model.Extensions
{
    using Crm.Model;
    using Crm.Library.BaseModel;
    public class DocumentAttributeExtension : EntityExtension<DocumentAttribute>
    {
        public virtual string ErpDocumentKey { get; set; }
	}
}