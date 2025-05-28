namespace Customer.Ramseier.Services.DataSetImportServices
{
	using System;
	using System.Collections.Generic;

	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Customer.Ramseier.Model.ProAlpha.DataSet;
	using Customer.Ramseier.Model.ProAlpha.Entity;
	using Customer.Ramseier.Model;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;

	using log4net;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Import;

	public class ContactStatusDataSetImportService : DefaultDataSetImportService<ContactStatusDataSet, BBT_WflLockStatusInst, ContactStatus>
	{
		protected readonly IIntegrationService<ContactStatus, Guid> ContactStatusIntegrationService;
		protected readonly ITransformService<Tuple<BBT_WflLockStatusInst, ContactStatus>, ContactStatus> ContactStatusTransformService;

		public override int Priority => 10;
		protected override bool SupportsBidirectionalIntegration => true;
		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(RamseierPlugin.Settings.ProAlpha.MessageType.ContactStatusDataSet);

		protected override string GetProAlphaHeadObjectId(BBT_WflLockStatusInst headEntity)
		{
			return headEntity.BBT_WflLockStatusInst_Obj;
		}

		public override IEnumerable<BBT_WflLockStatusInst> GetHeadEntities(ContactStatusDataSet model)
		{
			return model.ContactStatuses;
		}

		public override ImportResult ImportHeadEntity(BBT_WflLockStatusInst headEntity)
		{
			var existingContactStatus = ContactStatusIntegrationService.GetPersistentEntityByLegacyId(headEntity.BBT_WflLockStatusInst_Obj);
			if (existingContactStatus == null && !string.IsNullOrEmpty(headEntity.LmobileId))
			{
				existingContactStatus = ContactStatusIntegrationService.GetPersistentEntityById(Guid.Parse(headEntity.LmobileId));
			}

			if (headEntity.TransferData.Deleted)
			{
				if (existingContactStatus == null)
				{
					return new ImportResult(ImportAction.Nothing);
				}

				ContactStatusIntegrationService.Remove(existingContactStatus);
				return new ImportResult(ImportAction.Delete, existingContactStatus.Id);
			}

			var contactStatus = ContactStatusTransformService.Transform(
				new Tuple<BBT_WflLockStatusInst, ContactStatus>(
					headEntity,
					existingContactStatus));

			ContactStatusIntegrationService.SaveOrUpdate(contactStatus);

			return new ImportResult(existingContactStatus == null ? ImportAction.Insert : ImportAction.Update, contactStatus.Id);
		}
		public ContactStatusDataSetImportService(
			ISessionProvider sessionProvider,
			IAppSettingsProvider appSettingsProvider,
			ILog logger,
			IUncHelper uncHelper,
			IProAlphaXmlHelper proAlphaXmlHelper,
			IProAlphaIntegrationDataService proAlphaIntegrationDataService,
			IProAlphaResponseService responseService,
			IProAlphaDataSetImportHelper proAlphaDataSetImportHelper,
			IIntegrationService<ContactStatus, Guid> ContactStatusIntegrationService,
			ITransformService<Tuple<BBT_WflLockStatusInst, ContactStatus>, ContactStatus> ContactStatusTransformService)
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
			this.ContactStatusIntegrationService = ContactStatusIntegrationService;
			this.ContactStatusTransformService = ContactStatusTransformService;
		}
	}
}