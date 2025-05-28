namespace Customer.Ramseier.Services.TransformServices.Export.Prospect
{
    using AutoMapper;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Export.Prospect;
    using Crm.ErpIntegration.Services.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Services.Interfaces;
    using Crm.Model;
    using log4net;
    using System;

    public class CustomerProspectTransformService : ProspectTransformService, IReplaceRegistration<ProspectTransformService>
    {
        public CustomerProspectTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IAppSettingsProvider appSettingsProvider, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger) : base(mapper, domainService, extensionMappingService, appSettingsProvider, resourceManager, ruleValidationService, logger)
        {
        }

        public override VC_Interessent MapAndResolveLegacyIds(Tuple<Company, VC_Interessent> src, VC_Interessent dest)
        {
            return dest;
        }

    }
}