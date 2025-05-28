namespace Customer.Ramseier.BackgroundServices
{
    using Crm.DynamicForms.Model;
    using Crm.ErpIntegration.ProAlphaBase.Services.LegacyIdResolveServices.Communication;
    using Crm.Library.BackgroundServices;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Data.NHibernateProvider;
    using Crm.VisitReport.Model;
    using Customer.Ramseier.Model.Extensions;
    using Customer.Ramseier.Services.Interfaces;
    using LMobile.Unicore.NHibernate;
    using log4net;
    using Quartz;
    using System;
    using System.Linq;

    [DisallowConcurrentExecution]
    public class VisitReportSenderAgent : JobBase
    {
        private readonly IVisitReportGeneratorService visitReportGeneratorService;
        private readonly IRepositoryWithTypedId<VisitReport, Guid> visitReportRepository;
        private readonly ILog logger;
        private const int MaxSendingRetries = 3;
         private DateTime date= new DateTime(2022, 09, 30);

        public VisitReportSenderAgent(ISessionProvider sessionProvider, ILog logger, IVisitReportGeneratorService visitReportGeneratorService,IRepositoryWithTypedId<VisitReport, Guid> visitReportRepository)
            : base(sessionProvider, logger)
        {
            this.visitReportGeneratorService = visitReportGeneratorService;
            this.visitReportRepository = visitReportRepository;
            this.logger = logger;
        }

        protected override void Run(IJobExecutionContext context)
        {
            var visitReports = visitReportRepository.GetAll()
                .Where(x=> x.Completed && !x.ModelExtension<VisitReportExtension, bool>(e => e.VisitReportSent) && x.ModelExtension<VisitReportExtension, int>(e => e.VisitReportSendingRetries) < MaxSendingRetries && x.Date > date)
                .Where(x=>x.ModelExtension<Crm.ErpIntegration.ProAlphaBase.Model.Extensions.VisitReportExtension, bool>(e => e.IsExported));

            foreach (var visitReport in visitReports)
            {
                if (visitReportGeneratorService.SendReportAsPdf(visitReport))
                {
                    logger.Info($"Visit Report {visitReport.Id} Has been Sent successfully");
                }
                else logger.Info($"Visit Report {visitReport.Id} Has not been Sent because no responsible user has been defined !");
            }
        }
    }
}