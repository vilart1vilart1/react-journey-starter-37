namespace Customer.Ramseier.ViewModels
{
    using Crm.VisitReport.Model;
    using Crm.Model;
    using Crm.Library.Model;
    using System.Collections.Generic;
    using System.Linq;
    using Crm.VisitReport.ViewModels;
    using Crm.Library.Globalization.Lookup;
    using Crm.VisitReport.Lookups;
    using Crm.Model.Lookups;
    using Turnover = Model.Turnover;
    using Crm.VisitReport.Model.Relationships;
    using Crm.Model.Relationships;
 

    public class VisitReportViewModel : VisitReportPrintViewModel
    {

        public VisitReportViewModel(VisitReport visitReport, ILookupManager lookupManager)
        {
            this.formReference = visitReport;
            lookups = new Dictionary<string, object>
            {
                { "visitAims", lookupManager.List<VisitAim>().ToDictionary(x => x.Key) },
                { "companyGroupFlags1", lookupManager.List<CompanyGroupFlag1>().ToDictionary(x => x.Key) },
                { "companyGroupFlags2", lookupManager.List<CompanyGroupFlag2>().ToDictionary(x => x.Key) },
                { "companyGroupFlags3", lookupManager.List<CompanyGroupFlag3>().ToDictionary(x => x.Key) },
                { "contactPersonRelationshipTypes", lookupManager.List<ContactPersonRelationshipType>().ToDictionary(x => x.Key) },

            };
        }

        public virtual VisitReport formReference { get; set; }
        
        public Company Company => formReference?.Company;
        public virtual Visit visit => formReference?.Visit;
        public virtual User ResponsibleUserUser => visit?.ResponsibleUserObject;
        public virtual Address VisitAddress => visit?.Address;
        public virtual Address[] CompanyAddresses => Company?.Addresses.ToArray();
        public virtual Dictionary<string, object> lookups { get; }
        public Dictionary<string, string> Languages { get; set; }
        public Turnover[] statistics { get; set; }
        public ContactPersonRelationship[] participants { get; set; }
        public BusinessRelationship[] relationships { get; set; }
        public Company[] relationshipsChild => relationships?.Select(x => x.Child).ToArray();

    }
}