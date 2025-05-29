using System;
using System.Collections.Generic;
using System.Linq;
using LMobile.MiniForms;
using LMobile.Gen3LicenseManagement.Dao.Contracts;
using LMobile.Gen3LicenseManagement.Dao.BusinessObjects;
using LMobile.Gen3LicenseManagement.Portal.BusinessObjects;
using LMobile.Gen3LicenseManagement.Portal.Applications.QuestionDialog;
using LMobile.Gen3LicenseManagement.Dao.Mapping;

namespace LMobile.Gen3LicenseManagement.Portal.Applications.Modules {
	[AllowRole("Gen3Modules")]
	[AllowAdministratorRoles]
	class ModulesDirectApplication : BaseApplication {
		protected ILicenseDao LicenseDao { get { return this.Session.GetService<ILicenseDao>(); } }
		protected IModuleDao ModuleDao { get { return this.Session.GetService<IModuleDao>(); } }

		public List<ModuleProperty> AllPackages;
		public ModuleProperty CurrentPackage;

		public void Start() {
			LoadPackages();
			this.DisplayView<ModulesDirectView>();
		}

		public void NavigateEditPackage(int packageID) {
			if (packageID == 0) {
				this.CurrentPackage = new ModuleProperty() {
					IsActive = true
				};
			} else {
				this.CurrentPackage = this.ModuleDao.GetModuleProperty(packageID);
				if (this.CurrentPackage == null) {
					this.LoadPackages();
					throw new Error(Resources.SomebodyElseDeletedTheRecord());
				}
			}
			DisplayView<ModulesDirectView>();
		}

		public bool CanUserEditPackage {
			get { return this.Client.CurrentPrincipal.IsInRole("Gen3EditModule"); }
		}

		public void ResetCurrentPackage() {
			this.CurrentPackage = null;
			this.LoadPackages();
		}

		public void SaveCurrentPackage() {
			if (CurrentPackage.ID == 0) {
				if (string.IsNullOrEmpty(this.CurrentPackage.PropertyName)) { throw new Error("Package name cannot be empty."); }
				if (string.IsNullOrEmpty(this.CurrentPackage.Description)) { throw new Error("Package description cannot be empty."); }

				// First check if a module property with the same PropertyName exists
				ModuleProperty existingPropertyByName = null;
				if (!string.IsNullOrEmpty(this.CurrentPackage.PropertyName)) {
					existingPropertyByName = this.ModuleDao.GetModulePropertyByName(this.CurrentPackage.PropertyName, true);

					if (existingPropertyByName != null && !existingPropertyByName.IsActive) {
						// Reactivate the existing module property by PropertyName
						existingPropertyByName.IsActive = true;
						existingPropertyByName.Description = this.CurrentPackage.Description;
						if (!Session.Update(existingPropertyByName)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

						LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, "Package '" + existingPropertyByName.PropertyName + "' reactivated by '" + Client.CurrentPrincipal.Identity.Name + "'.");

						this.CurrentPackage = null;
						this.LoadPackages();
						return;
					} else if (existingPropertyByName != null && existingPropertyByName.IsActive) {
						throw new Error("A package with this name already exists and is active.");
					}
				}

				// If no existing property by name, check by name and description combination (existing logic enhanced)
				var allPackages = this.ModuleDao.GetModuleProperties().Concat(
					Session.Query<ModuleProperty, ModulePropertyMapping>()
						.Where(s => s.Main.IsActive == false)
						.ReadList()
				);

				var existingPackage = allPackages.FirstOrDefault(p =>
					p.PropertyName == this.CurrentPackage.PropertyName &&
					p.Description == this.CurrentPackage.Description
				);

				if (existingPackage != null && !existingPackage.IsActive) {
					// Reactivate the existing package instead of creating a new one
					existingPackage.IsActive = true;
					existingPackage.Description = this.CurrentPackage.Description;
					existingPackage.PropertyName = this.CurrentPackage.PropertyName;
					if (!Session.Update(existingPackage)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

					LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, "Package '" + existingPackage.PropertyName + "' reactivated by '" + Client.CurrentPrincipal.Identity.Name + "'.");
				} else if (existingPackage != null && existingPackage.IsActive) {
					throw new Error("A package with this name and description already exists and is active.");
				} else {
					// Create new package if no existing one found
					CurrentPackage.IsActive = true;
					Session.Insert(CurrentPackage);
					LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyCreated, "Package '" + CurrentPackage.PropertyName + "' created by '" + Client.CurrentPrincipal.Identity.Name + "'.");
				}
			} else {
				if (!Session.Update(CurrentPackage)) throw new Error(Resources.SomebodyElseModifiedTheRecord());
				LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, "Package '" + CurrentPackage.PropertyName + "' modified by '" + Client.CurrentPrincipal.Identity.Name + "'.");
			}
			this.CurrentPackage = null;
			this.LoadPackages();
		}

		public bool CanUserDeletePackage {
			get { return this.Client.CurrentPrincipal.IsInRole("Gen3EditModule"); }
		}

		public void ConfirmDeletePackage(int packageID) {
			if (!CanUserDeletePackage)
				return;

			var packageToDelete = this.ModuleDao.GetModuleProperty(packageID);
			if (packageToDelete == null) {
				throw new Error(Resources.SomebodyElseDeletedTheRecord());
			}

			string confirmationMessage = "Wirklich löschen: " + packageToDelete.PropertyName + "?";

			Responses response = ShowQuestionNotification(this, confirmationMessage);
			if (response == Responses.YES) {
				DeletePackage(packageID);
			}
		}

		private bool DeletePackage(int packageID) {
			var packageToDelete = this.ModuleDao.GetModuleProperty(packageID);
			if (packageToDelete == null) {
				throw new Error(Resources.SomebodyElseDeletedTheRecord());
			}

			string packageName = packageToDelete.PropertyName;
			if (this.ModuleDao.DeleteModuleProperty(packageID)) {
				LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, "Package '" + packageName + "' deleted by '" + Client.CurrentPrincipal.Identity.Name + "'.");
				this.CurrentPackage = null;
				this.LoadPackages();
				this.DisplayView<ModulesDirectView>();
				return true;
			}
			return false;
		}

		public Responses ShowQuestionNotification(MiniFormsApplication p_App
			, string p_Question
			, QButtons p_Button = QButtons.YES_NO
			, ViewSizes p_ViewSizes = ViewSizes.VS_0240x0320) {
			Responses response = Responses.NONE;
			p_App.RunApplication(new QuestionApplication(p_Question, (r) => {
				response = r;
			}, p_Button, p_ViewSizes), app => {
				app.ShowDialog();
			});

			return response;
		}

		private void LoadPackages() {
			this.AllPackages = this.ModuleDao.GetModuleProperties();
		}
	}
}