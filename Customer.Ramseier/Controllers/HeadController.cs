namespace Customer.Ramseier.Controllers
{
    using System.Web.Mvc;
    using System.Web.Routing;
    using Crm.Controllers;
    using Crm.Library.Globalization.Lookup;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
	using Crm.Library.Modularization;
	using Crm.Library.Rest;
	using Crm.Library.Services.Interfaces;
	using Crm.Services;
    using pAIMobileInterface;
    using Progress.Open4GL.Exceptions;
    using Progress.Open4GL;
    using Sms.ErpIntegration.ProAlphaBase.Model.ProAlpha;
    using Customer.Ramseier.Services.Interfaces;
    using System.Data;
    using System.IO;
    using System.Web;
    using System;
    using Crm.Model;
    using log4net;
    using Crm.Library.Data.Domain.DataInterfaces;
    using Customer.Ramseier.Model.Extensions;
	using Crm.Results;

	public class HeadController : CrmController
	{
        private readonly IProAlphaConnector proAlphaConnector; 
        private readonly ILog Logger;
        private readonly IAppSettingsProvider appSettingsProvider;
        protected readonly IRepositoryWithTypedId<FileResource, Guid> fileResourceRepository;
        [RenderAction("MaterialHeadResource", Priority = 1)]
		public ActionResult MaterialHeadResource()
		{
			return Content(WebExtensions.JsResource("Customer.Ramseier", "ramseierMaterial"));
		}

        [AllowAnonymous]
        [RenderAction("HeadResource")]
        public ActionResult HeadResource()
        {
            return Content(WebExtensions.JsResource("Customer.Ramseier", "ramseierJs"));
        }
        public ActionResult GetDocument(Guid id)
        {
						FileResource fileResource = null; 
            var file = fileResourceRepository.Get(id);
            var documentId = file.GetExtension<FileResourceExtension>().FileId ;
            var User = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.User);
            var contentType = "";
            var Passw = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.Password);
            var COMPANY = appSettingsProvider.GetValue(RamseierPlugin.Settings.Firma);
            string sessionId = null;
            try
            {
                if (!proAlphaConnector.TryGetSession(out LMobileService service, out sessionId))
                {
                    throw new ApplicationException("Invalid Session Id");
                }
                Logger.DebugFormat(
                "service.GetDocument-Parameter: {0}: {1}, {2}: {3},  {4}: {5}, {6}: {7}",
                "Firma",
                COMPANY,
                "DokumentId",
                documentId,
                "User",
                User,
                "Password",
                "Password");
                string result;
                var response = service.GetDocument(COMPANY, new IntHolder((int)documentId), User, Passw, out result, sessionId);
                Logger.DebugFormat($"GetDocument method is called from LMobile service successfully {result}");
                var document = DeserializeDocumentFromXml(result);
                var content = Convert.FromBase64String(document.ttQL_DMSDocument[0].Content);
                var filename = document.ttQL_DMSDocument[0].Filename;
                using (var memoryStream = new MemoryStream(content))
                {
                    fileResource = proAlphaConnector.UploadFile(memoryStream, filename, content.Length, MimeType.GetMimeType(filename), "undefined");
                    memoryStream.Close();
                }
                if (!String.IsNullOrWhiteSpace(response))
                {
                    Logger.Warn($"ProAlpha returned a response fetching a DMS Document: {response}");
                }
            }
            catch (RunTime4GLException ex)
            {
                Logger.Error($"proALPHA returned a 4GL Exceptionwhen reading document {documentId}: {ex.ProcReturnString}", ex);
            }
            catch (Exception ex)
            {
                Logger.Error($"Exception when reading document {documentId} from proALPHA", ex);
            }
            finally
            {
                proAlphaConnector.CloseSession(sessionId);
            }
            if (fileResource != null)
            {
                contentType = String.IsNullOrWhiteSpace(fileResource.ContentType) ? MimeMapping.GetMimeMapping(fileResource.Filename) : fileResource.ContentType;
				        Response.AddHeader("Content-Disposition", "inline;filename=" + fileResource.Filename.Replace(' ', '_')); // This is required to deliver filename in utf8
      				  return new FileContentResult(fileResource?.Content, contentType);
        		}
            return new NotFoundResult();
        }
        public virtual dsQL_DMSDocument DeserializeDocumentFromXml(string xmlContent)
        {
            var dsQL_DMSDocument = new dsQL_DMSDocument();
            using (var stringReader = new StringReader(proAlphaConnector.RemoveInvalidXmlChars(xmlContent)))
            {
                dsQL_DMSDocument.ReadXml(stringReader, XmlReadMode.InferSchema);
            }

            return dsQL_DMSDocument;
        }
        public HeadController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService, IProAlphaConnector proAlphaConnector, ILog Logger, IAppSettingsProvider appSettingsProvider, IRepositoryWithTypedId<FileResource, Guid> fileResourceRepository)
			: base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService)
		{
            this.proAlphaConnector = proAlphaConnector;
            this.Logger = Logger;
            this.appSettingsProvider = appSettingsProvider;
            this.fileResourceRepository = fileResourceRepository;
        }
       
    }
}