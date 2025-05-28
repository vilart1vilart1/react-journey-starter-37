using AutoMapper;
using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Document;
using Crm.ErpIntegration.Services.Interfaces;
using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
using Crm.Library.AutoFac;
using Crm.Library.Data.Domain.DataInterfaces;
using Crm.Library.Globalization.Resource;
using Crm.Library.Services.Interfaces;
using Crm.Model;
using Customer.Ramseier.Model.Extensions;
using log4net;
using System;

namespace Customer.Ramseier.Services.TransformServices.Import.Document
{
    public class CustomerFileResourceTransformService : FileResourceTransformService, IReplaceRegistration<FileResourceTransformService>
    {
        public CustomerFileResourceTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, Func<FileResource> fileResourceFactory, ILegacyIdResolveService<Contact, Guid> contactLegacyIdResolveService) : base(mapper, domainService, extensionMappingService, resourceManager, ruleValidationService, logger, fileResourceFactory, contactLegacyIdResolveService)
        {
        }

        public override FileResource MapAfterResolve(Tuple<OD_Dokumente, OD_Archive> src, FileResource dest) 
        {
            var archive = src.Item2;
            dest.GetExtension<FileResourceExtension>().FileId = archive.ArchivID;
            return base.MapAfterResolve(src, dest);
        }
    }
}