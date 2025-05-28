namespace Customer.Ramseier.Services.DataSetImportServices
{
    using Crm.ErpExtension.Model;
    using Crm.ErpIntegration.ProAlphaBase;
    using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Import;
    using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices.Default;
    using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Statistic;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
    using Crm.ErpIntegration.Services.Integration.Interfaces;
    using Crm.Library.Data.NHibernateProvider;
    using Crm.Library.Helper;
    using Customer.Ramseier.Model.ProAlpha.DataSet;
    using Customer.Ramseier.Model.ProAlpha.Entity;
    using log4net;
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class TurnoverDataSetImportService : DefaultDataSetImportService<TurnoverDataSet, QL_Turnover, ErpTurnover>
    {
        public List<QL_Turnover> ErpTurnovers { get; set; }
        protected readonly IIntegrationService<ErpTurnover, Guid> turnoverIntegrationService;
        protected readonly ITransformService<Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool>, ErpTurnover> turnoverTransformService;
        public TurnoverDataSetImportService(ISessionProvider sessionProvider,
            IAppSettingsProvider appSettingsProvider,
            ILog logger,
            IUncHelper uncHelper,
            IProAlphaXmlHelper proAlphaXmlHelper,
            IProAlphaIntegrationDataService proAlphaIntegrationDataService,
            IProAlphaResponseService responseService,
            IProAlphaDataSetImportHelper proAlphaDataSetImportHelper,
            IIntegrationService<ErpTurnover, Guid> turnoverIntegrationService,
            ITransformService<Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool>, ErpTurnover> turnoverTransformService)
            : base(
                sessionProvider,
                appSettingsProvider,
                logger,
                uncHelper,
                proAlphaXmlHelper,
                proAlphaIntegrationDataService,
                responseService,
                proAlphaDataSetImportHelper)
        {
            this.turnoverIntegrationService = turnoverIntegrationService;
            this.turnoverTransformService = turnoverTransformService;
        }

        public override int Priority => 1102;
        protected override string ProAlphaMessageType => appSettingsProvider.GetValue(RamseierPlugin.Settings.ProAlpha.MessageType.TurnoverDataSet);

        protected override string GetProAlphaHeadObjectId(QL_Turnover headEntity)
        {
            return $"{headEntity.Company}_{headEntity.AuswArt}_{headEntity.QL_TurnoverValues.FirstOrDefault().Year}_{headEntity.Key_1}_{headEntity.Key_2}";
        }
        public override IEnumerable<QL_Turnover> GetHeadEntities(TurnoverDataSet model)
        {
          return model.Entities;
        }

        public override ImportResult ImportHeadEntity(QL_Turnover headEntity)
        {
            var turnoverValues = headEntity.QL_TurnoverValues;
            //ImportTurnover(headEntity, turnoverValues, false);
            return ImportTurnover(headEntity, turnoverValues);
        }

        private ImportResult ImportTurnover(QL_Turnover headEntity, List<QL_TurnoverValues> turnoverValues)
        {
            ErpTurnover existingTurnover = null;
            ErpTurnover importedEntity = null;

            foreach (var turnoverValue in turnoverValues)
            {
                var legacyId = $"{headEntity.Company}_{turnoverValue.Year}_{headEntity.Key_1}_{headEntity.Key_2}_{turnoverValue.IsVolume}";
                existingTurnover = turnoverIntegrationService.GetPersistentEntityByLegacyId(legacyId);
                if (existingTurnover == null && !string.IsNullOrEmpty(headEntity.LmobileId))
                {
                    existingTurnover = turnoverIntegrationService.GetPersistentEntityById(Guid.Parse(headEntity.LmobileId));
                }

                importedEntity = CreateOrUpdateErpTurnover(existingTurnover, turnoverValue, headEntity, (bool)turnoverValue.IsVolume);
            }

            return new ImportResult(existingTurnover == null ? ImportAction.Insert : ImportAction.Update, importedEntity.Id);
        }

        protected virtual ErpTurnover CreateOrUpdateErpTurnover(ErpTurnover existingTurnover, QL_TurnoverValues turnoverValues, QL_Turnover headEntity, bool isVolume)
        {
            var erpTurnoverIntegration = turnoverTransformService.Transform(new Tuple<QL_Turnover, QL_TurnoverValues, ErpTurnover, bool>(headEntity, turnoverValues, existingTurnover, isVolume));
            return turnoverIntegrationService.SaveOrUpdate(erpTurnoverIntegration);
        }
    }
}