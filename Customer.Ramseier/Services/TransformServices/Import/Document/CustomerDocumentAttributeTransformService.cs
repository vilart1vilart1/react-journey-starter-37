using System;

namespace Customer.Ramseier.Services.TransformServices.Import.Document
{
    using AutoMapper;

    using Castle.Core.Internal;

    using Crm.ErpExtension.Model;
    using Crm.ErpIntegration.ProAlphaBase;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Export.Document.FileResource;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Document;
    using Crm.ErpIntegration.Services.Interfaces;
    using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.Extensions;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using Crm.Model.Enums;

    using Customer.Ramseier.Model.Extensions;

    using log4net;
    public class CustomerDocumentAttributeTransformService : DocumentAttributeTransformService, IReplaceRegistration<DocumentAttributeTransformService>
    {
        protected readonly ILegacyIdResolveService<ErpDocument, Guid> erpDocumentLegacyIdResolveService;

        public CustomerDocumentAttributeTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, Func<DocumentAttribute> documentAttributeFactory, ILegacyIdResolveService<Contact, Guid> contactLegacyIdResolveService, IAppSettingsProvider appSettingsProvider, ILegacyIdResolveService<ErpDocument, Guid> erpDocumentLegacyIdResolveService)
            : base(mapper, domainService, extensionMappingService, resourceManager, ruleValidationService, logger, documentAttributeFactory, contactLegacyIdResolveService, appSettingsProvider)
        {
            this.erpDocumentLegacyIdResolveService = erpDocumentLegacyIdResolveService;
        }

        public override DocumentAttribute MapAndResolveLegacyIds(Tuple<OD_Dokumente, FileResource, DocumentAttribute> src, DocumentAttribute dest)
        {
            var document = src.Item1;
            var fileResource = src.Item2;
            dest.ReferenceKey = contactLegacyIdResolveService.ResolveLegacyId(document.Kontext_Obj);
            dest.ReferenceType = ReferenceType.Undefined;
            dest.DocumentCategoryKey = appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.Document.DocumentCategory);
            dest.FileResource = fileResource;
            dest.UseForThumbnail = false;
            dest.Description = document.OD_Archive.Dateiname;
            dest.FileResourceKey = fileResource.Id;
            if (document.UnknownElements[1].InnerXml !="")
            {
                dest.GetExtension<DocumentAttributeExtension>().ErpDocumentKey = erpDocumentLegacyIdResolveService.ResolveLegacyId(document.UnknownElements[1].InnerXml).ToString();
            }
            return base.MapAndResolveLegacyIds(src, dest);
        }

    }
}