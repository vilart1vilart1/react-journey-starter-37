namespace Customer.Ramseier.Services
{
    using AutoMapper;
    using Crm.ErpIntegration.ProAlphaBase.Model.ErpDocument;
    using Crm.Library.AutoFac;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Crm.Library.Model;
    using Crm.Library.Rest;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using System;
    using System.Linq;

    public class BlanketOrderSyncService : Crm.ErpIntegration.ProAlphaBase.Services.SyncServices.BlanketOrderSyncService, IReplaceRegistration<Crm.ErpIntegration.ProAlphaBase.Services.SyncServices.BlanketOrderSyncService>
    {
        private readonly ISyncService<Company> companySyncService;
        public BlanketOrderSyncService(IRepositoryWithTypedId<BlanketOrder, Guid> repository, RestTypeProvider restTypeProvider, IRestSerializer restSerializer, IMapper mapper, ISyncService<Company> companySyncService) : base(repository, restTypeProvider, restSerializer, mapper)
        {
            this.companySyncService = companySyncService;
        }
        public override IQueryable<BlanketOrder> GetAll(User user)
        {
            var companies = companySyncService.GetAll(user);
            return repository.GetAll()
                .Where(x => x.ContactKey == null || companies.Any(y => y.Id == x.ContactKey));
        }
    }
}