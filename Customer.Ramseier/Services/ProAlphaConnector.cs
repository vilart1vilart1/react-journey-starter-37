using Crm.Library.Helper;
using Customer.Ramseier.Services.Interfaces;
using System;
using Crm.Library.Extensions;
using pAIMobileInterface;
using Progress.Open4GL.Proxy;
using log4net;
using Progress.Open4GL.Exceptions;
using System.Linq;
using System.Xml;
using Sms.ErpIntegration.ProAlphaBase.Model.Extensions;
using System.IO;
using Crm.Model;

namespace Customer.Ramseier.Services
{
    public class ProAlphaConnector : IProAlphaConnector
    {
        protected string Server { get; set; }
        protected string Port { get; set; }
        protected string Webservice { get; set; }
        protected string User { get; set; }
        protected string Passw { get; set; }
        protected string AppServerKeepalive { get; set; }
        protected bool UseNameServer { get; set; }

        private string currentSessionId = String.Empty;
        private Connection con;
        public readonly ILog Logger;
        private LMobileService service;
        private readonly Func<FileResource> fileResourceFactory;
        public ProAlphaConnector(IAppSettingsProvider appSettingsProvider, ILog Logger, Func<FileResource> fileResourceFactory)
        {
            Server = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.Server);
            Port = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.Port);
            Webservice = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.Webservice);
            User = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.User);
            Passw = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.Password);
            UseNameServer = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.UseNameServer);
            AppServerKeepalive = appSettingsProvider.GetValue(RamseierPlugin.Settings.Connection.AppServerKeepalive);
            this.Logger = Logger;
            this.fileResourceFactory = fileResourceFactory;
        }
        public void CloseSession(string sessionId)
        {
            if (!SessionIsValid(sessionId))
                return;

            try
            {
                Logger.Debug($"Try to close session {sessionId}.");
                if (service != null && service.isSessionAvailable())
                {
                    service.Disconnect(currentSessionId);
                    service.Dispose();
                }

                if (con != null)
                {
                    con.ReleaseConnection();
                    con.Dispose();
                    con = null;
                }
            }
            catch (Exception e)
            {
                Logger.Fatal("A fatal error occured closing the proAlpha Session", e);
            }
            finally
            {
                Logger.Debug("Session was closed successfully.");
                currentSessionId = null;
            }
        }

        public void Dispose()
        {
            CloseSession(currentSessionId);
        }

        public bool TryGetSession(out LMobileService serviceobj, out string sessionId)
        {
            serviceobj = null;
            sessionId = null;
            if (!String.IsNullOrWhiteSpace(currentSessionId))
                return false;

            try
            {
                Logger.DebugFormat(
                    "service.Connect Parameters: {0}:{1}, {2}:{3}, {4}:{5}, {6}:{7}, {8}:{9}, {10}:{11}",
                    "UseNameServer",
                    UseNameServer.ToString(),
                    "Server",
                    Server ?? String.Empty,
                    "Port",
                    Port ?? String.Empty,
                    "Webservice",
                    Webservice ?? String.Empty,
                    "User",
                    User ?? String.Empty,
                    "Password",
                    "Password");
                con = UseNameServer ? new Connection("AppServer://" + Server + ":" + Port + "/" + Webservice, "", "", "") : new Connection("AppServerDC://" + Server + ":" + Port, "", "", "");
                con.SessionModel = 1;
                if (AppServerKeepalive.IsNotNullOrEmpty())
                {
                    con.AppServerKeepalive = AppServerKeepalive;
                    con.Userid = User;
                    con.Password = Passw;
                }
                Logger.DebugFormat("Calling LMobileService.. ");
                service = new LMobileService(con);
                Logger.DebugFormat("LMobileService is called successfully");
                serviceobj = service;
                Logger.DebugFormat("Connecting to QLMOBILE..");
                service.Connect("QLMOBILE", User, Passw, String.Empty, out sessionId);
                Logger.DebugFormat("Connecting to QLMOBILE successfully");
                if (!String.IsNullOrWhiteSpace(sessionId))
                    currentSessionId = sessionId;
            }
            catch (RunTime4GLException ex)
            {
                Logger.Error($"An RunTime4GLException occured when creating a new Connection to proAlpha: {ex.ProcReturnString}", ex);
            }
            catch (Exception ex)
            {
                Logger.Error("An error occured when creating a new Connection to proAlpha", ex);
            }

            return SessionIsValid(currentSessionId);
        }
        public virtual bool SessionIsValid(string sessionId)
        {
            return !String.IsNullOrWhiteSpace(currentSessionId) && string.Equals(currentSessionId, sessionId, StringComparison.Ordinal);
        }

        public string RemoveInvalidXmlChars(string text)
        {
            var validXmlChars = text.Where(XmlConvert.IsXmlChar).ToArray();
            return new string(validXmlChars);
        }

        FileResource IProAlphaConnector.UploadFile(Stream fileStream, string fileName, int contentLength, string contentType, string userName)
        {
            if (fileStream == null) return null;

            if (contentLength == 0) return null;

            var resource = fileResourceFactory();
            resource.ContentType = contentType;
            resource.Length = contentLength;
            resource.Filename = Path.GetFileName(fileName);
            resource.Content = fileStream.ReadAllBytes();
            resource.CreateUser = userName;
            resource.ModifyUser = userName;
            return resource;
        }
    }

}