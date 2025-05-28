using Crm.Library.BaseModel;
using Crm.Library.Model;

namespace Customer.Ramseier.Model.Extensions
{
    public class UserGroupExtension : EntityExtension<Usergroup>
    {
        public virtual string Email { get; set; }
    }
}