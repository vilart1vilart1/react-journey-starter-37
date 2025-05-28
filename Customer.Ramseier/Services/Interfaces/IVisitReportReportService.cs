namespace Customer.Ramseier.Services.Interfaces
{
    using System.Collections.Generic;

    using Crm.Library.AutoFac;
    using Crm.VisitReport.Model;

    public interface IVisitReportGeneratorService : IDependency
    {
        byte[] CreateReportAsPdf(VisitReport visitReport);
        bool SendReportAsPdf(VisitReport visitReport);
        bool SendReportAsPdf(VisitReport visitReport, string recipientEmails);
        string GetReportName(VisitReport visitReport);
        string GetDefaultReportRecipientEmails(string responsibleUser);
    }
}