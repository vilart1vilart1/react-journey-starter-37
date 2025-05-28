namespace Customer.Ramseier.Controllers
{
    using Crm.DynamicForms.Model;
    using Crm.Library.AutoFac;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Model.Authorization.Interfaces;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Crm.Services;
    using Crm.Services.Interfaces;
    using Crm.VisitReport.Controllers;
    using Crm.VisitReport.Model;
    using Crm.VisitReport.Model.Notes;
    using Crm.VisitReport.Model.Relationships;
    using Crm.VisitReport.Services.Interfaces;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class CustomVisitReportController : VisitReportController, IReplaceRegistration<VisitReportController>
    {
        public CustomVisitReportController(IVisitReportService visitReportService, IVisitService visitService, IUserService userService, IEnumerable<IVisitableAddressesFilter> visitableAddressesFilters, IEnumerable<IVisitReportFilter> visitReportFilters, IRepositoryWithTypedId<VisitReport, Guid> visitReportRepository, IRepositoryWithTypedId<Address, Guid> addressRepository, IRepositoryWithTypedId<ContactPersonRelationship, Guid> relationshipRepository, IRepositoryWithTypedId<Person, Guid> personRepository, IRepositoryWithTypedId<Company, Guid> companyRepository, IRepositoryWithTypedId<Contact, Guid> contactRepository, IRepositoryWithTypedId<VisitReportTopicNote, Guid> noteRepository, IRepositoryWithTypedId<VisitTopic, Guid> visitTopicRepository, IRepositoryWithTypedId<Task, Guid> taskRepository, IRuleValidationService ruleValidationService, IContactService contactService, IResourceManager resourceManager, ILookupManager lookupManager, IRepositoryWithTypedId<DynamicForm, Guid> dynamicFormRepository, IRepositoryWithTypedId<LinkResource, Guid> linkRepository, IRepositoryWithTypedId<FileResource, Guid> fileRepository, IPdfService pdfService, IAppSettingsProvider appSettingsProvider, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, IAuthorizationManager authorizationManager, Func<VisitTopic> visitTopicFactory, Func<ContactPersonRelationship> contactPersonRelationshipFactory, Func<VisitReport> visitReportFactory, Func<Address> addressFactory, Func<Visit> visitFactory, Func<VisitReportTopicNote> visitReportTopicNoteFactory, Func<UserNote> userNoteFactory) : base(visitReportService, visitService, userService, visitableAddressesFilters, visitReportFilters, visitReportRepository, addressRepository, relationshipRepository, personRepository, companyRepository, contactRepository, noteRepository, visitTopicRepository, taskRepository, ruleValidationService, contactService, resourceManager, lookupManager, dynamicFormRepository, linkRepository, fileRepository, pdfService, appSettingsProvider, restTypeProvider, renderViewToStringService, routeCollection, authorizationManager, visitTopicFactory, contactPersonRelationshipFactory, visitReportFactory, addressFactory, visitFactory, visitReportTopicNoteFactory, userNoteFactory)
        {
        }
        public virtual ActionResult VisitReportContent()
        {
            return View();
        }
        public new virtual ActionResult Response()
        {
            return View();
        }
    }
}