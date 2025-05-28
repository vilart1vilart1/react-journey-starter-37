namespace Customer.Ramseier.BusinessRules.UserGroupRules
{

    using Crm.Library.Validation.BaseRules;
    using Customer.Ramseier.Model.Extensions;

    public class EmailFormat: EmailRule<UserGroupExtension>
    {
        public EmailFormat()
        {
            Init(u => u.Email);
        }
    }
}