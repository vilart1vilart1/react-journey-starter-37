namespace Customer.Ramseier.Model.Extensions
{
    using Crm.Library.BaseModel;
    using Crm.VisitReport.Model;
    public class VisitReportExtension:  EntityExtension<VisitReport>
    {
        public virtual bool VisitReportSent { get; set; }
        public virtual int VisitReportSendingRetries { get; set; }
    }
}