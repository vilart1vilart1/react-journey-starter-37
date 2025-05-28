using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Services.LegacyIdResolveServices.Contact
{
    using Crm.Article.Model;
    using Crm.ErpIntegration.ProAlphaBase.Model;
    using Crm.ErpIntegration.ProAlphaBase.Services.LegacyIdResolveServices.Contact;
    using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Model;
    using Crm.Project.Model;

    public class CustomerContactLegacyIdResolveService : ContactLegacyIdResolveService , IReplaceRegistration<ContactLegacyIdResolveService>
    {
        protected readonly ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService;
        public CustomerContactLegacyIdResolveService(IRepositoryWithTypedId<Contact, Guid> repository, ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService, ILegacyIdResolveService<Person, Guid> personLegacyIdResolveService, ILegacyIdResolveService<Project, Guid> projectLegacyIdResolveService, ILegacyIdResolveService<SalesAgent, Guid> salesAgentLegacyIdResolveService, ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService)
            : base(repository, companyLegacyIdResolveService, personLegacyIdResolveService, projectLegacyIdResolveService, salesAgentLegacyIdResolveService)
        {
            this.articleLegacyIdResolveService = articleLegacyIdResolveService;
        }

        protected override Contact LoadEntity(string legacyId)
        {
            return (Contact)companyLegacyIdResolveService.ResolveEntityOrDefault(legacyId) ??
                   (Contact)personLegacyIdResolveService.ResolveEntityOrDefault(legacyId) ??
                   (Contact)projectLegacyIdResolveService.ResolveEntityOrDefault(legacyId) ??
                   (Contact)salesAgentLegacyIdResolveService.ResolveEntityOrDefault(legacyId) ??
                   (Contact)articleLegacyIdResolveService.ResolveEntityOrDefault(legacyId);
        }

    }
}