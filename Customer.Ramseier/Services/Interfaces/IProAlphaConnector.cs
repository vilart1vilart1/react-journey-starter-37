namespace Customer.Ramseier.Services.Interfaces
{
    using Crm.Library.AutoFac;
    using Crm.Model;
    using pAIMobileInterface;
    using System;
    using System.IO;

    public interface IProAlphaConnector : IDependency, IDisposable
    {
        bool TryGetSession(out LMobileService serviceobj, out string sessionId);
        void CloseSession(string sessionId);
        string RemoveInvalidXmlChars(string text);
        FileResource UploadFile(Stream fileStream, string fileName, int contentLength, string contentType, string userName);
    }

}