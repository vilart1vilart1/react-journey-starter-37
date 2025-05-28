namespace Customer.Ramseier.Services
{
	using System;
	using System.Linq;
	using Crm.ErpExtension.Model;
	using Crm.ErpIntegration.ProAlphaBase;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.ErpDocuments;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Import;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetImportServices;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;
	using Crm.Model;

	using Customer.Ramseier.Model;
	using LMobile.Unicore.NHibernate;
	using log4net;

	public class CustomerDocumentHeaderDataSetImportService : DocumentHeaderDataSetImportService, IReplaceRegistration<DocumentHeaderDataSetImportService>

	{
		private readonly IIntegrationService<ErpDocumentArticleRelationship, Guid> erpDocumentArticleRelationshipIntegrationService;
		private readonly ITransformService<Tuple<V_BelegPos, ErpDocumentArticleRelationship>, ErpDocumentArticleRelationship> erpDocumentArticleRelationshipTransformService;

		public CustomerDocumentHeaderDataSetImportService(ISessionProvider sessionProvider, IAppSettingsProvider appSettingsProvider, ILog logger, IUncHelper uncHelper, IProAlphaXmlHelper proAlphaXmlHelper, IProAlphaIntegrationDataService proAlphaIntegrationDataService, IProAlphaResponseService responseService, IProAlphaDataSetImportHelper proAlphaDataSetImportHelper, IIntegrationService<ErpDocument, Guid> erpDocumentIntegrationService, IIntegrationService<FileResource, Guid> fileResourceIntegrationService, IIntegrationService<DocumentAttribute, Guid> documentAttributeIntegrationService, ITransformService<Tuple<V_BelegKopf, FileResource, ErpDocument>, ErpDocument> erpDocumentTransformService, ITransformService<Tuple<OD_Dokumente, OD_Archive>, FileResource> fileResourceTransformService, IIntegrationService<ErpDocumentArticleRelationship, Guid> erpDocumentArticleRelationshipIntegrationService, ITransformService<Tuple<V_BelegPos, ErpDocumentArticleRelationship>, ErpDocumentArticleRelationship> erpDocumentArticleRelationshipTransformService) : base(sessionProvider, appSettingsProvider, logger, uncHelper, proAlphaXmlHelper, proAlphaIntegrationDataService, responseService, proAlphaDataSetImportHelper, erpDocumentIntegrationService, fileResourceIntegrationService, documentAttributeIntegrationService, erpDocumentTransformService, fileResourceTransformService)
		{
			this.erpDocumentArticleRelationshipIntegrationService = erpDocumentArticleRelationshipIntegrationService;
			this.erpDocumentArticleRelationshipTransformService = erpDocumentArticleRelationshipTransformService;
		}

		public override int Priority => 1010;
		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.MessageType.DocumentHeaderDataSet);
		public override ImportResult ImportHeadEntity(V_BelegKopf headEntity)
		{
			var existingErpDocument = erpDocumentIntegrationService.GetPersistentEntityByLegacyId(headEntity.V_BelegKopf_Obj);
			if (existingErpDocument == null && !string.IsNullOrEmpty(headEntity.LmobileId))
			{
				existingErpDocument = erpDocumentIntegrationService.GetPersistentEntityById(Guid.Parse(headEntity.LmobileId));
			}

			if (headEntity.TransferData.Deleted)
			{
				if (existingErpDocument == null)
				{
					return new ImportResult(ImportAction.Nothing);
				}

				DeleteDocumentHeader(existingErpDocument);
				return new ImportResult(ImportAction.Delete, existingErpDocument.Id);
			}

      var existingFileResource = headEntity.OD_Dokumente != null ?
      fileResourceIntegrationService.GetQueryable().OrderByDescending(x => x.CreateDate).FirstOrDefault(
          x => x.ModelExtension<FileResourceExtension, string>(e => e.ProAlphaObjectId) == headEntity.OD_Dokumente.OD_Dokumente_Obj)
      : null;

      var importedDocument = CreateOrUpdateDocument(headEntity, existingFileResource);
      var existingDocumentId = existingErpDocument?.GetExtension<ErpDocumentExtension>().FileResourceKey;

      var importedDocumentHeader = CreateOrUpdateDocumentHeader(existingErpDocument, importedDocument, headEntity, existingFileResource);
      UpdateDocumentAttribute(importedDocument, existingFileResource);
      CreateOrUpdateOrderItem(headEntity);
			return new ImportResult(existingErpDocument == null ? ImportAction.Insert : ImportAction.Update, importedDocumentHeader.Id);
		}
		protected virtual void CreateOrUpdateOrderItem(V_BelegKopf headEntity)
		{
			foreach (var position in headEntity.V_BelegPos)
			{
				var existingPositions = erpDocumentArticleRelationshipIntegrationService.GetPersistentEntityByLegacyId(position.V_BelegPos_Obj);


        var erpDocumentArticleRelationshipIntegration = erpDocumentArticleRelationshipTransformService.Transform(
            new Tuple<V_BelegPos, ErpDocumentArticleRelationship>(
                position,
                existingPositions));
				erpDocumentArticleRelationshipIntegrationService.SaveOrUpdate(erpDocumentArticleRelationshipIntegration);
				
			}
		}

		//protected override ErpDocumentArticleRelationship CreateOrUpdateErpDocumentArticleRelationship(
		//	ErpDocumentArticleRelationship existingErpDocumentArticleRelationship,
		//	V_BelegKopf headEntity)
		//{
		//	var erpDocumentArticleRelationship = erpDocumentArticleRelationshipTransformService.Transform(
		//		new Tuple<V_BelegKopf, ErpDocumentArticleRelationship>(
		//			headEntity,
		//			existingErpDocumentArticleRelationship));


		//	return salesAgentCompanyRelationshipIntegrationService.SaveOrUpdate(salesAgentCompanyRelationship);
		//}
	}
}