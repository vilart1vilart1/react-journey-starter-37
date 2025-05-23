namespace Customer.Swecon.Schultes.BusinessRules.ServiceOrder
{
    using Crm.Library.Validation.BaseRules;
    using Crm.Service.Model;
    using Crm.Service.Rest.Model;

    public class ErrorMessageMaxLength : MaxLengthRule<ServiceOrderHeadRest>
    {
        public ErrorMessageMaxLength()
        {
            Init(d => d.ErrorMessage, 100);
        }
    }
}