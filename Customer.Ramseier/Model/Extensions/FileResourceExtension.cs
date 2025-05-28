namespace Customer.Ramseier.Model.Extensions
{
    using Crm.Model;
    using Crm.Library.BaseModel;
    public class FileResourceExtension : EntityExtension<FileResource>
    {
        public virtual int? FileId { get; set; }
	}
}