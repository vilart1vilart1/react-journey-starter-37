namespace Customer.Swecon.Schultes
{
    using Crm.Library.AutoFac;
    using Crm.Library.Helper;

    public class SweconSchultesSettings : ISingletonDependency
    {
        private readonly IAppSettingsProvider appSettingsProvider;
        public SweconSchultesSettings(IAppSettingsProvider appSettingsProvider)
        {

            this.appSettingsProvider = appSettingsProvider;

        }
    }
}
