using AutoMapper;
using Crm.Article.Model;
using Crm.ErpExtension;
using Crm.ErpExtension.Model;
using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Default;
using Crm.ErpIntegration.Services.Integration.Interfaces;
using Crm.ErpIntegration.Services.Interfaces;
using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
using Crm.Library.Globalization.Resource;
using Crm.Library.Helper;
using Crm.Library.Services.Interfaces;
using Crm.Model;
using Customer.Ramseier.Model.ProAlpha.Entity;
using log4net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Services.TransformServices.Import
{
    public class TurnoverTransformService : DefaultTransformService<Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool>, ErpTurnover>
    {
        protected readonly Func<ErpTurnover> erpTurnoverFactory;
        protected readonly ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService;
        protected readonly ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService;
        protected readonly IIntegrationService<Article, Guid> articleIntegrationService;
        private readonly IAppSettingsProvider appSettingsProvider;
        public TurnoverTransformService(IMapper mapper,
            IDomainService domainService,
            IProAlphaExtensionMappingService extensionMappingService,
            IResourceManager resourceManager,
            IRuleValidationService ruleValidationService,
            ILog logger,
            Func<ErpTurnover> erpTurnoverFactory,
            ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService,
            IIntegrationService<Article, Guid> articleIntegrationService,
            ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService,
            IAppSettingsProvider appSettingsProvider)
            : base(
                mapper,
                domainService,
                extensionMappingService,
                resourceManager,
                ruleValidationService,
                logger)
        {
            this.erpTurnoverFactory = erpTurnoverFactory;
            this.companyLegacyIdResolveService = companyLegacyIdResolveService;
            this.articleIntegrationService = articleIntegrationService;
            this.articleLegacyIdResolveService = articleLegacyIdResolveService;
            this.appSettingsProvider = appSettingsProvider;
        }
        public override void ValidateInput(Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool> input)
        {
            if (input.Item1 == null)
            {
                throw new ArgumentNullException(nameof(QL_Turnover), $"{nameof(input)}.{nameof(input.Item1)} cannot be null");
            }
        }

        public override ErpTurnover MapInput(Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool> input)
        {
            var output = input.Item3 ?? erpTurnoverFactory();
            var erpTurnover = input.Item1;
            var turnoverValues = input.Item2;
            Map(erpTurnover, output);
            Map(turnoverValues, output);

            var isVolume = input.Item3?.IsVolume ?? input.Item2?.IsVolume;
            output.GetExtension<ErpTurnoverExtension>().ProAlphaLegacyId = $"{erpTurnover.Company}_{turnoverValues.Year}_{erpTurnover.Key_1}_{erpTurnover.Key_2}_{isVolume}";
            output.GetExtension<ErpTurnoverExtension>().ProAlphaObjectId = $"{erpTurnover.Company}_{turnoverValues.Year}_{erpTurnover.Key_1}_{erpTurnover.Key_2}_{isVolume}";

            return output;
        }
        public override ErpTurnover MapAndResolveLegacyIds(Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool> src, ErpTurnover dest)
        {
            var erpTurnover = src.Item1;
            dest.ContactKey = companyLegacyIdResolveService.ResolveLegacyId($"{erpTurnover.Company}_{erpTurnover.Key_1}");
            dest.ArticleGroup01Key = erpTurnover.Key_2;
            if (src.Item2?.IsVolume == true)
            {
                dest.QuantityUnitKey = erpTurnover?.QuantityUnit.ToString();
                dest.IsVolume = true;
            }
            else
            {
                dest.CurrencyKey = erpTurnover?.Currency.ToString();
                dest.IsVolume = false;
            }

            return base.MapAndResolveLegacyIds(src, dest);
        }

        public override ErpTurnover MapDomain(Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool> src, ErpTurnover dest)
        {
            if (domainService.IsMultitenantPluginActive())
            {
                var domain = domainService.GetDomainByLegacyId(src.Item1.Company);
                dest.AuthData = dest.AuthData ?? new LMobile.Unicore.EntityAuthData { DomainId = domain.UId };
            }
            return dest;
        }

    }
}