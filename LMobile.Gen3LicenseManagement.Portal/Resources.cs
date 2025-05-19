
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Resources;
using System.Text;
using System.Threading.Tasks;

namespace LMobile.Gen3LicenseManagement.Portal {
    public static partial class Resources {
        public static string EinstellungenFurDenEmail() {
            return GetString("EinstellungenFurDenEmail");
        }
		
		public static string ObInput() {
            return GetString("ObInput");
        }
		
		public static string ProjektManagerInput() {
            return GetString("ProjektManagerInput");
        }
		
		public static string ModulInput() {
            return GetString("ModulInput");
        }
		
		public static string AbsenderInput() {
            return GetString("AbsenderInput");
        }
		
		public static string EmailAuswahlen() {
            return GetString("EmailAuswahlen");
        }
		
		public static string EmailInput() {
            return GetString("EmailInput");
        }

        public static string CopyToClipboard() {
            return CopyToClipboard(global::LMobile.Internationalization.CurrentUICulture);
        }
        
        public static string CopyToClipboard(global::System.Globalization.CultureInfo _language) {
            int _lcid = 0;
            while (_lcid != _language.LCID) {
                _lcid = _language.LCID;
                switch (_lcid) {
                    case 127: return "In die Zwischenablage kopieren";
                }
                _language = _language.Parent;
            }
            return null;
        }
        
        public static string CopySuccessful() {
            return CopySuccessful(global::LMobile.Internationalization.CurrentUICulture);
        }
        
        public static string CopySuccessful(global::System.Globalization.CultureInfo _language) {
            int _lcid = 0;
            while (_lcid != _language.LCID) {
                _lcid = _language.LCID;
                switch (_lcid) {
                    case 127: return "Erfolgreich in die Zwischenablage kopiert";
                }
                _language = _language.Parent;
            }
            return null;
        }
        
        public static string CopyFailed() {
            return CopyFailed(global::LMobile.Internationalization.CurrentUICulture);
        }
        
        public static string CopyFailed(global::System.Globalization.CultureInfo _language) {
            int _lcid = 0;
            while (_lcid != _language.LCID) {
                _lcid = _language.LCID;
                switch (_lcid) {
                    case 127: return "Fehler beim Kopieren in die Zwischenablage";
                }
                _language = _language.Parent;
            }
            return null;
        }

        public static string _(string _resourceKey) {
            return _(global::LMobile.Internationalization.CurrentUICulture, _resourceKey);
        }

        public static string _(global::System.Globalization.CultureInfo _language, string _resourceKey) {
            switch ((_resourceKey ?? "").ToLower(global::System.Globalization.CultureInfo.InvariantCulture)) {
                case "absenderinput": return @AbsenderInput(_language);
                case "activity": return @Activity(_language);
                case "b_back": return @B_Back(_language);
                case "b_cancel": return @B_CANCEL(_language);
                case "b_no": return @B_NO(_language);
                case "b_ok": return @B_OK(_language);
                case "b_yes": return @B_YES(_language);
                case "back": return @Back(_language);
                case "cancel": return @Cancel(_language);
                case "confirmation": return @Confirmation(_language);
                case "contractno": return @ContractNo(_language);
                case "create": return @Create(_language);
                case "createportable": return @CreatePortable(_language);
                case "customer": return @Customer(_language);
                case "customeraddress": return @CustomerAddress(_language);
                case "customercity": return @CustomerCity(_language);
                case "customeremail": return @CustomerEMail(_language);
                case "customeremailismandatory": return @CustomerEMailIsMandatory(_language);
                case "customername1": return @CustomerName1(_language);
                case "customernameismandatory": return @CustomerNameIsMandatory(_language);
                case "customerno": return @CustomerNo(_language);
                case "customernoismandatory": return @CustomerNoIsMandatory(_language);
                case "copytoclipboard": return @CopyToClipboard(_language);
                case "copysuccessful": return @CopySuccessful(_language);
                case "copyfailed": return @CopyFailed(_language);
                case "d_installation": return @D_Installation(_language);
                case "d_module": return @D_Module(_language);
                case "deactivatecustomer": return @DeactivateCustomer(_language);
                case "description": return @Description(_language);
                case "descriptionempty": return @DescriptionEmpty(_language);
                case "developerdeleteconfirmation": return @DeveloperDeleteConfirmation(_language);
                case "developerlicensecantbeimported": return @DeveloperLicenseCantBeImported(_language);
                case "developersmenu": return @DevelopersMenu(_language);
                case "download": return @Download(_language);
                case "e_enddatesmallerstartdate": return @E_EndDateSmallerStartDate(_language);
                case "e_startdatebiggerenddate": return @E_StartDateBiggerEndDate(_language);
                case "edit": return @Edit(_language);
                case "einstellungenfurdenemail": return @EinstellungenFurDenEmail(_language);
                case "emailauswahlen": return @EmailAuswahlen(_language);
                case "emailinput": return @EmailInput(_language);
                case "emailnotfilled": return @EMailNotFilled(_language);
                case "emailsenden": return @EmailSenden(_language);
                case "emailsubject": return @EmailSubject(_language);
                case "exit": return @Exit(_language);
                case "expirationdate": return @ExpirationDate(_language);
                case "expirationinmonth": return @ExpirationInMonth(_language);
                case "export": return @Export(_language);
                case "frau": return @Frau(_language);
                case "fromaddress": return @FromAddress(_language);
                case "gen3customersmenu": return @Gen3CustomersMenu(_language);
                case "gen3licenselisttitle": return @Gen3LicenseListTitle(_language);
                case "gen3licensesmenu": return @Gen3LicensesMenu(_language);
                case "gen3projectsmenu": return @Gen3ProjectsMenu(_language);
                case "guid": return @Guid(_language);
                case "hardwarekey": return @HardwareKey(_language);
                case "hardwarekeyempty": return @HardwareKeyEmpty(_language);
                case "hardwarekeyused": return @HardwareKeyUsed(_language);
                case "herr": return @Herr(_language);
                case "import": return @Import(_language);
                case "importinstallationrequest": return @ImportInstallationRequest(_language);
                case "installationinformationtitle": return @InstallationInformationTitle(_language);
                case "installationkey": return @InstallationKey(_language);
                case "installationtype": return @InstallationType(_language);
                case "installationtypeempty": return @InstallationTypeEmpty(_language);
                case "l_lbladdtemplicenses": return @L_lblAddTempLicenses(_language);
                case "l_lblcountmodule": return @L_lblCountModule(_language);
                case "l_lblfill": return @L_lblFill(_language);
                case "l_lbllicensecountprod": return @L_lblLicenseCountProd(_language);
                case "l_lbllicensecounttest": return @L_lblLicenseCountTest(_language);
                case "l_lblserachmodulebyname": return @L_lblSerachModuleByName(_language);
                case "l_lblserachmodulebynamedescription": return @L_lblSerachModuleByNameDescription(_language);
                case "l_lbltemplicensesexpirationdate": return @L_lblTempLicensesExpirationDate(_language);
                case "l_lbltemplicensesstartdate": return @L_lblTempLicensesStartDate(_language);
                case "l_logout": return @L_Logout(_language);
                case "lblemail": return @lblEMail(_language);
                case "lbllanguage": return @lblLanguage(_language);
                case "lblprintername": return @lblPrinterName(_language);
                case "licensecount": return @LicenseCount(_language);
                case "licensecountshort": return @LicenseCountShort(_language);
                case "licenserequest": return @LicenseRequest(_language);
                case "logentryinformation": return @LogEntryInformation(_language);
                case "logentrymessagetype": return @LogEntryMessageType(_language);
                case "modulesmenu": return @ModulesMenu(_language);
                case "modulinput": return @ModulInput(_language);
                case "name": return @Name(_language);
                case "nameempty": return @NameEmpty(_language);
                case "navigatelogentries": return @NavigateLogEntries(_language);
                case "neuelizenzaddmodul": return @NeueLizenzAddModul(_language);
                case "neuelizenzincreasenumberuser": return @NeueLizenzIncreaseNumberUser(_language);
                case "neuelizenzinventurtemporar": return @NeueLizenzInventurTemporar(_language);
                case "neuelizenzneukunde": return @NeueLizenzNeuKunde(_language);
                case "neuelizenztestinstallation": return @NeueLizenzTestInstallation(_language);
                case "neulizenzneuemodulundbenuzter": return @NeuLizenzNeueModulUndBenuzter(_language);
                case "neulizenztestmodul": return @NeuLizenzTestmodul(_language);
                case "newcustomer": return @NewCustomer(_language);
                case "newdeveloper": return @NewDeveloper(_language);
                case "newlicense": return @NewLicense(_language);
                case "newmodule": return @NewModule(_language);
                case "newmoduleproperty": return @NewModuleProperty(_language);
                case "newproject": return @NewProject(_language);
                case "notifyemail": return @NotifyEMail(_language);
                case "notportableexists": return @NotPortableExists(_language);
                case "obinput": return @ObInput(_language);
                case "pleasesaveprojectfirst": return @PleaseSaveProjectFirst(_language);
                case "portable": return @Portable(_language);
                case "project": return @Project(_language);
                case "projectdescriptionismandatory": return @ProjectDescriptionIsMandatory(_language);
                case "projectemailismandatory": return @ProjectEMailIsMandatory(_language);
                case "projectnotifyemailismandatory": return @ProjectNotifyEMailIsMandatory(_language);
                case "projects": return @Projects(_language);
                case "projecttype": return @ProjectType(_language);
                case "projecttypeempty": return @ProjectTypeEmpty(_language);
                case "projektleiterherr": return @ProjektleiterHerr(_language);
                case "projektleiterinfrau": return @ProjektleiterinFrau(_language);
                case "projektleiterprojektleiterin": return @ProjektleiterProjektleiterin(_language);
                case "projektmanagerinput": return @ProjektManagerInput(_language);
                case "requestcantbeparsed": return @RequestCantBeParsed(_language);
                case "rolesmenu": return @RolesMenu(_language);
                case "save": return @Save(_language);
                case "searchkey": return @SearchKey(_language);
                case "somebodyelsedeletedtherecord": return @SomebodyElseDeletedTheRecord(_language);
                case "somebodyelsemodifiedtherecord": return @SomebodyElseModifiedTheRecord(_language);
                case "testlicensecount": return @TestLicenseCount(_language);
                case "testlicensecountshort": return @TestLicenseCountShort(_language);
                case "version": return @Version(_language);
                default: return _resourceKey;
            }
        }
    }
}
