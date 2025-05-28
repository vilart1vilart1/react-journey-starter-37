namespace Customer.Ramseier.Services.DataSetImportServices
{
	using System;
	using Crm.ErpExtension.Model;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;
	using Crm.Model;


	using log4net;

	public class CustomerDocumentDataSetImportService : DocumentDataSetImportService, IReplaceRegistration<DocumentDataSetImportService>
    {
		public CustomerDocumentDataSetImportService(ISessionProvider sessionProvider, IAppSettingsProvider appSettingsProvider, ILog logger, IUncHelper uncHelper, IProAlphaXmlHelper proAlphaXmlHelper, IProAlphaIntegrationDataService proAlphaIntegrationDataService, IProAlphaResponseService responseService, IProAlphaDataSetImportHelper proAlphaDataSetImportHelper, IIntegrationService<FileResource, Guid> fileResourceIntegrationService, IIntegrationService<DocumentAttribute, Guid> documentAttributeIntegrationService, IIntegrationService<ErpDocument, Guid> erpDocumentIntegrationService, ITransformService<Tuple<OD_Dokumente, OD_Archive>, FileResource> fileResourceTransformService, ITransformService<Tuple<OD_Dokumente, FileResource, DocumentAttribute>, DocumentAttribute> documentAttributeTransformService) : base(sessionProvider, appSettingsProvider, logger, uncHelper, proAlphaXmlHelper, proAlphaIntegrationDataService, responseService, proAlphaDataSetImportHelper, fileResourceIntegrationService, documentAttributeIntegrationService, erpDocumentIntegrationService, fileResourceTransformService, documentAttributeTransformService)
		{
		}

		public override int Priority => 20;
		protected override bool SupportsBidirectionalIntegration => false;

	}
}