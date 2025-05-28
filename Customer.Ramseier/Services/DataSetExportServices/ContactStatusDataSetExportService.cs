namespace Customer.Ramseier.Services.DataSetExportServices
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetExportServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;
	using Customer.Ramseier.Model;
	using Customer.Ramseier.Model.ProAlpha.DataSet;
	using Customer.Ramseier.Model.ProAlpha.Entity;

	using log4net;

	public class ContactStatusDataSetExportService : DefaultDataSetExportService<ContactStatus, ContactStatusDataSet, BBT_WflLockStatusInst>
	{

		protected readonly ITransformService<Tuple<ContactStatus, BBT_WflLockStatusInst>, BBT_WflLockStatusInst> contactStatusTransformService;
		public override int Priority => 800;
		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(RamseierPlugin.Settings.ProAlpha.MessageType.ContactStatusDataSet);

		public override IQueryable<ContactStatus> GetUnexportedEntitiesQuery(IQueryable<ContactStatus> query)
		{
			return query.Where(x =>  (x.IsActive ||x.ProAlphaObjectId != null) && !x.IsExported);
		}

		public override ContactStatusDataSet CreateDataSet(ContactStatus entity, ContactStatusDataSet model)
		{
			var oldContactStatus = model != null ? GetHeadEntities(model).FirstOrDefault(x => x.BBT_WflLockStatusInst_Obj == entity.ProAlphaObjectId) : null;

			var contactStatus = contactStatusTransformService.Transform(
				new Tuple<ContactStatus, BBT_WflLockStatusInst>(
					entity,
					oldContactStatus));
			return new ContactStatusDataSet { ContactStatuses = new List<BBT_WflLockStatusInst> { contactStatus } };
		}

		public override IEnumerable<BBT_WflLockStatusInst> GetHeadEntities(ContactStatusDataSet dataSet)
		{
			return dataSet.ContactStatuses;
		}

		protected override void SetExportInformation(ContactStatus entity, bool isExported, string exportDetailMessage)
		{
			entity.IsExported = isExported;
			repository.SaveOrUpdate(entity);
		}

		public ContactStatusDataSetExportService(
			ISessionProvider sessionProvider,
			IAppSettingsProvider appSettingsProvider,
			IProAlphaXmlHelper xmlHelper,
			ILog logger,
			IUncHelper uncHelper,
			IProAlphaIntegrationDataService proAlphaIntegrationDataService,
			IProAlphaTransactionService proAlphaTransactionService,
			IRepository<ContactStatus> repository,
			ITransformService<Tuple<ContactStatus, BBT_WflLockStatusInst>, BBT_WflLockStatusInst> contactStatusTransformService)
			: base(
				sessionProvider,
				appSettingsProvider,
				xmlHelper,
				logger,
				uncHelper,
				proAlphaIntegrationDataService,
				proAlphaTransactionService,
				repository)
		{
			this.contactStatusTransformService = contactStatusTransformService;
		}
	}
}