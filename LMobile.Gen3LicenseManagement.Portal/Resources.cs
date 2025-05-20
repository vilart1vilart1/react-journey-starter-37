using System;
using System.Globalization;
using System.Threading;
using LMobile.Internationalization;

namespace LMobile.Gen3LicenseManagement.Portal {
	public static class Resources {
		private static CultureInfo _culture;
		public static CultureInfo Culture {
			get { return _culture ?? CurrentUICulture; }
			set { _culture = value; }
		}
		public static CultureInfo CurrentUICulture {
			get { return Thread.CurrentThread.CurrentUICulture; }
			set { Thread.CurrentThread.CurrentUICulture = value; }
		}
		public static string _(string _resourceKey) {
			return _(Culture, _resourceKey);
		}
		public static string _(CultureInfo _language, string _resourceKey) {
			switch ((_resourceKey ?? "").ToLower(CultureInfo.InvariantCulture)) {
				case "back": return @Back(_language);
				case "cancel": return @Cancel(_language);
				case "description": return @Description(_language);
				case "details": return @Details(_language);
				case "edit": return @Edit(_language);
				case "error": return @Error(_language);
				case "exitapplication": return @ExitApplication(_language);
				case "guid": return @Guid(_language);
				case "licensecount": return @LicenseCount(_language);
				case "licenses": return @Licenses(_language);
				case "loading": return @Loading(_language);
				case "log": return @Log(_language);
				case "logentry": return @LogEntry(_language);
				case "logentrycreated": return @LogEntryCreated(_language);
				case "logentrydeleted": return @LogEntryDeleted(_language);
				case "logentrymodified": return @LogEntryModified(_language);
				case "logentrynotfound": return @LogEntryNotFound(_language);
				case "logentryread": return @LogEntryRead(_language);
				case "logentrytype": return @LogEntryType(_language);
				case "logentryupdated": return @LogEntryUpdated(_language);
				case "module": return @Module(_language);
				case "modules": return @Modules(_language);
				case "name": return @Name(_language);
				case "newmodule": return @NewModule(_language);
				case "newmoduleproperty": return @NewModuleProperty(_language);
				case "no": return @No(_language);
				case "ok": return @Ok(_language);
				case "projecttype": return @ProjectType(_language);
				case "save": return @Save(_language);
				case "somebodyelsedeletedtherecord": return @SomebodyElseDeletedTheRecord(_language);
				case "somebodyelsemodifiedtherecord": return @SomebodyElseModifiedTheRecord(_language);
				case "type": return @Type(_language);
				case "unknown": return @Unknown(_language);
				case "userdata": return @UserData(_language);
				case "yes": return @Yes(_language);
				case "projecttypeempty": return @ProjectTypeEmpty(_language);
				case "descriptionempty": return @DescriptionEmpty(_language);
				case "moduledeleteconfirmation": return @ModuleDeleteConfirmation(_language);
				default: return _resourceKey;
			}
		}
		public static string Back() {
			return Back(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Back(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Zurück";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Cancel() {
			return Cancel(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Cancel(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Abbrechen";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Description() {
			return Description(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Description(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Beschreibung";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Details() {
			return Details(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Details(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Details";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Edit() {
			return Edit(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Edit(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Bearbeiten";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Error() {
			return Error(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Error(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Fehler";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string ExitApplication() {
			return ExitApplication(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string ExitApplication(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Anwendung verlassen";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Guid() {
			return Guid(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Guid(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Guid";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LicenseCount() {
			return LicenseCount(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LicenseCount(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Anzahl Lizenzen";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Licenses() {
			return Licenses(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Licenses(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Lizenzen";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Loading() {
			return Loading(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Loading(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Laden...";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Log() {
			return Log(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Log(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokoll";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntry() {
			return LogEntry(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntry(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryCreated() {
			return LogEntryCreated(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryCreated(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag erstellt";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryDeleted() {
			return LogEntryDeleted(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryDeleted(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag gelöscht";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryModified() {
			return LogEntryModified(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryModified(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag geändert";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryNotFound() {
			return LogEntryNotFound(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryNotFound(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag nicht gefunden";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryRead() {
			return LogEntryRead(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryRead(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag gelesen";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryType() {
			return LogEntryType(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryType(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintragstyp";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string LogEntryUpdated() {
			return LogEntryUpdated(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string LogEntryUpdated(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Protokolleintrag aktualisiert";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Module() {
			return Module(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Module(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Modul";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Modules() {
			return Modules(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Modules(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Module";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Name() {
			return Name(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Name(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Name";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string NewModule() {
			return NewModule(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string NewModule(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Neues Modul";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string NewModuleProperty() {
			return NewModuleProperty(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string NewModuleProperty(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Neue Moduleigenschaft";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string No() {
			return No(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string No(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Nein";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Ok() {
			return Ok(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Ok(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Ok";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string ProjectType() {
			return ProjectType(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string ProjectType(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Projekttyp";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Save() {
			return Save(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Save(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Speichern";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string SomebodyElseDeletedTheRecord() {
			return SomebodyElseDeletedTheRecord(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string SomebodyElseDeletedTheRecord(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Jemand anderes hat den Datensatz gelöscht";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string SomebodyElseModifiedTheRecord() {
			return SomebodyElseModifiedTheRecord(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string SomebodyElseModifiedTheRecord(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Jemand anderes hat den Datensatz geändert";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Type() {
			return Type(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Type(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Typ";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Unknown() {
			return Unknown(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Unknown(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Unbekannt";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string UserData() {
			return UserData(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string UserData(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Benutzerdaten";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string Yes() {
			return Yes(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string Yes(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Ja";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string ProjectTypeEmpty() {
			return ProjectTypeEmpty(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string ProjectTypeEmpty(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Project Type cannot be empty";
				}
				_language = _language.Parent;
			}
			return null;
		}
		public static string DescriptionEmpty() {
			return DescriptionEmpty(global::LMobile.Internationalization.CurrentUICulture);
		}
		public static string DescriptionEmpty(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Description cannot be empty";
				}
				_language = _language.Parent;
			}
			return null;
		}

		public static string ModuleDeleteConfirmation() {
			return ModuleDeleteConfirmation(global::LMobile.Internationalization.CurrentUICulture);
		}

		public static string ModuleDeleteConfirmation(global::System.Globalization.CultureInfo _language) {
			int _lcid = 0;
			while (_lcid != _language.LCID) {
				_lcid = _language.LCID;
				switch (_lcid) {
					case 127: return "Wollen Sie wirklich das Modul '{0}' löschen?";
				}
				_language = _language.Parent;
			}
			return null;
		}
	}

	public static class MessageTypes {
		public const string LicenseCreated = "LicenseCreated";
		public const string LicenseModified = "LicenseModified";
		public const string LicenseDeleted = "LicenseDeleted";
		public const string ModuleCreated = "ModuleCreated";
		public const string ModuleModified = "ModuleModified";
		public const string ModulePropertyCreated = "ModulePropertyCreated";
		public const string ModulePropertyModified = "ModulePropertyModified";
		public const string ModuleDeleted = "ModuleDeleted";
	}
}
