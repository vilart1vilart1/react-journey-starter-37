namespace Customer.Ramseier.Services
{
    using Crm.Library.Extensions;
    using Crm.Library.Services.Interfaces;
    using Crm.Services;
    using Crm.VisitReport.Model;
    using Customer.Ramseier.Services.Interfaces;
    using log4net;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net.Mail;
    using System.Net.Mime;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Model;
    using Crm.DynamicForms.Model;
    using Crm.DynamicForms.ViewModels;
    using Crm.Library.Globalization;
    using Customer.Ramseier.ViewModels;
    using Crm.Model.Relationships;
    using Crm.VisitReport.Model.Relationships;
    using Customer.Ramseier.Model;
    using Autofac;
    using Customer.Ramseier.Model.Extensions;
    using Crm.Library.Extensions.IIdentity;
    using System.Text;
    using Crm.Library.Globalization.Resource;
	  using System.Security.Principal;
	  using System.Threading;

    public class VisitReportService : IVisitReportGeneratorService
    {

        private readonly IPdfService pdfService;
        private readonly ILog logger;
        private readonly IRenderViewToStringService renderViewToStringService;
        private readonly IRepositoryWithTypedId<Task, Guid> taskRepository;
        private readonly ILookupManager lookupManager;
        private readonly IDynamicFormPageConfiguration formPageConfiguration;
        public readonly IRepositoryWithTypedId<VisitReport, Guid> visitReportRepository;
        public readonly IRepositoryWithTypedId<Turnover, Guid> turnoverRepository;
        public readonly IRepositoryWithTypedId<ContactPersonRelationship, Guid> contactPersonRelationshipRepository;
        private readonly IRepositoryWithTypedId<BusinessRelationship, Guid> businessRelationshipRepository;
        private readonly IRepositoryWithTypedId<DynamicFormReference, Guid> dynamicFormReferenceRepository;
        private readonly IEnumerable<Func<DynamicFormReference, IResponseViewModel>> responseViewModelFactories;
        private readonly IUsergroupService usergroupService;
        private readonly IUserService userService;
        private readonly IResourceManager resourceManager;


        public VisitReportService(IRepositoryWithTypedId<VisitReport, Guid> visitReportRepository,IEnumerable<Func<DynamicFormReference, IResponseViewModel>> responseViewModelFactories, IRepositoryWithTypedId<DynamicFormReference, Guid> dynamicFormReferenceRepository, IRepositoryWithTypedId<ContactPersonRelationship, Guid> contactPersonRelationshipRepository, IRepositoryWithTypedId<BusinessRelationship, Guid> businessRelationshipRepository, IRepositoryWithTypedId<Turnover, Guid> turnoverRepository, IDynamicFormPageConfiguration formPageConfiguration, ILookupManager lookupManager, IRepositoryWithTypedId<Task, Guid> taskRepository, IRenderViewToStringService renderViewToStringService, IPdfService pdfService, ILog logger, IUsergroupService usergroupService, IResourceManager resourceManager, IUserService userService)
        {
            this.pdfService = pdfService;
            this.logger = logger;
            this.renderViewToStringService = renderViewToStringService;
            this.taskRepository = taskRepository;
            this.lookupManager = lookupManager;
            this.formPageConfiguration = formPageConfiguration;
            this.turnoverRepository = turnoverRepository;
            this.businessRelationshipRepository = businessRelationshipRepository;
            this.contactPersonRelationshipRepository = contactPersonRelationshipRepository;
            this.dynamicFormReferenceRepository = dynamicFormReferenceRepository;
            this.responseViewModelFactories = responseViewModelFactories;
            this.usergroupService = usergroupService;
            this.userService = userService;
            this.visitReportRepository = visitReportRepository;
            this.resourceManager = resourceManager;

        }
        public virtual string GetEmailText(VisitReport visitReport)
        {
           var sb = new StringBuilder();
            sb.AppendLine();
            sb.AppendLine(resourceManager.GetTranslation("VisitReportCompletedSend").WithArgs(visitReport.Date.ToShortDateString(), visitReport.Company.Name));
            return sb.ToString();
        }

        private IResponseViewModel GetModel(DynamicFormReference dynamicFormReference)
        {
            var targetType = typeof(IResponseViewModel<>).MakeGenericType(dynamicFormReference.GetType());
            var responseViewModelFactory = responseViewModelFactories.FirstOrDefault(x => x.Targets(targetType)) ?? responseViewModelFactories.First();
            var model = responseViewModelFactory(dynamicFormReference);
            return model;
        }
        public byte[] CreateReportAsPdf(VisitReport visitReport)
        {
            var tasks = visitReport.VisitId.HasValue ? taskRepository.GetAll().Where(t => t.ContactId == visitReport.VisitId).ToList() : new List<Task>();
            var statistics = visitReport.Company != null ? turnoverRepository.GetAll().Where(w => w.ContactKey == visitReport.Company.Id && !w.IsVolume).ToArray() : null;
            var participants = visitReport.VisitId.HasValue ? contactPersonRelationshipRepository.GetAll().Where(w => w.ParentId == visitReport.VisitId).ToArray() : null;
            var relationships = visitReport.Company != null ? businessRelationshipRepository.GetAll().Where(x => x.ParentId == visitReport.Company.Id && x.RelationshipTypeKey == "101").ToArray() : null;
            var model = new VisitReportViewModel(visitReport, lookupManager)
            {
                Tasks = tasks,
                Languages = lookupManager.List<Language>(x => x.IsSystemLanguage).ToDictionary(x => x.Key, x => x.Value),
                statistics = statistics,
                participants = participants,
                relationships = relationships,

            };
            var reportHtml = renderViewToStringService.RenderViewToString("Customer.Ramseier", "CustomVisitReport", "VisitReportContent", model);
            var reportPdf = pdfService.Html2Pdf(reportHtml);
            var dynamicFormReference = dynamicFormReferenceRepository.Get(visitReport.Id);
            var modelReference = GetModel(dynamicFormReference);
            var html = renderViewToStringService.RenderViewToString("Customer.Ramseier", "CustomVisitReport", "Response", modelReference);
            var bytes = pdfService.Html2Pdf(html, formPageConfiguration.ResponseHeaderMargin, formPageConfiguration.ResponseFooterMargin);
            var pdf = pdfService.MergeFiles(reportPdf, bytes);
            return pdf;
        }

        public string GetDefaultReportRecipientEmails(string responsibleUser)
        {
            if (responsibleUser.IsNotNullOrEmpty())
            {
                var Recipient = usergroupService.GetUsergroup(responsibleUser);
                if (Recipient != null)
                {
                    return Recipient.GetExtension<UserGroupExtension>().Email;
                }
            }
            return null;
        }

        public string GetReportName(VisitReport visitReport)
        {
            return visitReport.Filename;
        }

        public string GetSubject(VisitReport visitReport)
        {
            return resourceManager.GetTranslation("VisitReportSubject").WithArgs(GetReportName(visitReport), visitReport.ResponsibleUserObject.LastName,visitReport.Company.LegacyId ,visitReport.Company.Name);
        }

        public bool SendReportAsPdf(VisitReport visitReport)
        {
            var recipient = GetDefaultReportRecipientEmails(visitReport.ResponsibleUser);
            if (recipient.IsNotNullOrEmpty())
            {
                return SendReportAsPdf(visitReport, recipient);
            }
            return false;
        }

        public bool SendReportAsPdf(VisitReport visitReport, string recipientEmails)
        {
            SmtpClient smtpClient = null;
            var messages = new List<MailMessage>();
            try
            {  var reportName = GetReportName(visitReport);
               var reportAsPdf = CreateReportAsPdf(visitReport);
               var reportAttachment = reportAsPdf.CreateAttachment(MediaTypeNames.Application.Pdf, reportName.AppendIfMissing(".pdf"));
               smtpClient = new SmtpClient();
                var mail = new MailMessage
                { Subject = GetSubject(visitReport),
                  Body = GetEmailText(visitReport)
                };
                mail.To.AddIfValidEmailAddress(recipientEmails);
                mail.Attachments.Add(reportAttachment);
                messages.Add(mail);
                smtpClient.Send(mail);
                visitReport.GetExtension<VisitReportExtension>().VisitReportSent = true;
                return true;
            }
            catch (Exception ex)
            {
                visitReport.GetExtension<VisitReportExtension>().VisitReportSent = false;
                visitReport.GetExtension<VisitReportExtension>().VisitReportSendingRetries = visitReport.GetExtension<VisitReportExtension>().VisitReportSendingRetries + 1 ;
                logger.Error($"Failed sending per Visit Report {visitReport.Id}", ex);
                return false;
            }
            finally
            {
                smtpClient?.Dispose();
                foreach (var mail in messages)
                {
                    mail.Dispose();
                }
                visitReportRepository.SaveOrUpdate(visitReport);
            }
        }
    }
}