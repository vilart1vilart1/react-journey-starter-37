using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using LMobile.MiniForms;
using LMobile.Gen3LicenseManagement.Dao.Contracts;
using LMobile.Gen3LicenseManagement.Portal.BusinessObjects;
using LMobile.Gen3LicenseManagement.Dao.BusinessObjects;
using LMobile.Gen3LicenseManagement.Portal.Applications.QuestionDialog;
using LMobile.Gen3LicenseManagement.Dao.Mapping;

namespace LMobile.Gen3LicenseManagement.Portal.Applications.Modules {
	[AllowRole("Gen3Modules")]
	[AllowAdministratorRoles]
	class ModulesApplication : BaseApplication {
		protected ILicenseDao LicenseDao { get { return this.Session.GetService<ILicenseDao>(); } }
		protected IModuleDao ModuleDao { get { return this.Session.GetService<IModuleDao>(); } }
		public List<TreeWrapper<Module, ModuleProperty>> Modules;
		public List<StoredProjectType> ProjectTypes;
		public List<ModuleProperty> AllModuleProperties;
		public List<ModuleProperty> AllModulePropertiesExceptCurrentModule(Module module) {
			return
				this.AllModuleProperties.Where(prop => !Modules.First(m => m.Node.ID == module.ID).Children.Contains(prop))
					.ToList();
		}
		public Module CurrentModule;
		public ModuleProperty CurrentModuleProperty;
		public ModuleProperty CurrentSelectedModuleProperty;

		public void Start() {
			this.ProjectTypes = LicenseDao.GetProjectTypes();
			LoadModules();
			this.DisplayView<ModulesView>();
		}

		public void NavigateEditModule(int moduleID) {
			if (moduleID == 0) {
				this.CurrentModule = new Module() {
					ModuleGuid = System.Guid.NewGuid(),
					IsActive = true
				};
			} else {
				this.CurrentModule = this.ModuleDao.GetModule(moduleID);
				if (this.CurrentModule == null) {
					this.LoadModules();
					throw new Error(Resources.SomebodyElseDeletedTheRecord());
				}
			}
			DisplayView<ModulesView>();
		}
		public bool CanUserEditModule {
			get { return this.Client.CurrentPrincipal.IsInRole("Gen3EditModule"); }
		}
		public void ResetCurrentModule() {
			this.CurrentModule = null;
			this.LoadModules();
		}
		public void SaveCurrentModule() {
			if (CurrentModule.ID == 0) {
				if (string.IsNullOrEmpty(this.CurrentModule.ProjectType)) { throw new Error(Resources.ProjectTypeEmpty()); }
				if (string.IsNullOrEmpty(this.CurrentModule.Description)) { throw new Error(Resources.DescriptionEmpty()); }

				// First check if a module with the same ModuleName (PropertyName) exists and is inactive
				Module existingModuleByName = null;
				if (!string.IsNullOrEmpty(this.CurrentModule.ModuleName)) {
					existingModuleByName = this.ModuleDao.GetModuleByName(this.CurrentModule.ModuleName, true);

					if (existingModuleByName != null && !existingModuleByName.IsActive) {
						// Reactivate the existing module by ModuleName
						existingModuleByName.IsActive = true;
						existingModuleByName.Description = this.CurrentModule.Description;
						existingModuleByName.ProjectType = this.CurrentModule.ProjectType;
						if (!Session.Update(existingModuleByName)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

						string logMessage = string.Format("Module '{0}' reactivated by '{1}'",
							existingModuleByName.Description,
							Client.CurrentPrincipal.Identity.Name);
						string longMessage = string.Format("Module Details:\nName: {0}\nDescription: {1}\nProject Type: {2}\nReactivated by: {3}",
							!string.IsNullOrEmpty(existingModuleByName.ModuleName) ? existingModuleByName.ModuleName : "N/A",
							existingModuleByName.Description,
							existingModuleByName.ProjectType,
							Client.CurrentPrincipal.Identity.Name);

						LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);

						this.CurrentModule = null;
						this.LoadModules();
						return;
					} else if (existingModuleByName != null && existingModuleByName.IsActive) {
						throw new Error("A module with this name already exists and is active.");
					}
				}

				// If no existing module by name, check by description and project type (existing logic)
				var allModules = this.ModuleDao.GetModules().Concat(
					Session.Query<Module, ModuleMapping>()
						.Where(s => s.Main.IsActive == false)
						.ReadList()
				);

				var existingModule = allModules.FirstOrDefault(m =>
					m.Description == this.CurrentModule.Description &&
					m.ProjectType == this.CurrentModule.ProjectType
				);

				if (existingModule != null && !existingModule.IsActive) {
					// Reactivate the existing module instead of creating a new one
					existingModule.IsActive = true;
					existingModule.Description = this.CurrentModule.Description;
					existingModule.ProjectType = this.CurrentModule.ProjectType;
					existingModule.ModuleName = this.CurrentModule.ModuleName;
					if (!Session.Update(existingModule)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

					string logMessage = string.Format("Module '{0}' reactivated by '{1}'",
						existingModule.Description,
						Client.CurrentPrincipal.Identity.Name);
					string longMessage = string.Format("Module Details:\nName: {0}\nDescription: {1}\nProject Type: {2}\nReactivated by: {3}",
						!string.IsNullOrEmpty(existingModule.ModuleName) ? existingModule.ModuleName : "N/A",
						existingModule.Description,
						existingModule.ProjectType,
						Client.CurrentPrincipal.Identity.Name);

					LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);
				} else if (existingModule != null && existingModule.IsActive) {
					throw new Error("A module with this description and project type already exists and is active.");
				} else {
					// Create new module if no existing one found
					CurrentModule.IsActive = true;
					Session.Insert(CurrentModule);

					string logMessage = string.Format("Module '{0}' created by '{1}'",
						CurrentModule.Description,
						Client.CurrentPrincipal.Identity.Name);
					string longMessage = string.Format("Module Details:\nName: {0}\nDescription: {1}\nProject Type: {2}\nCreated by: {3}",
						!string.IsNullOrEmpty(CurrentModule.ModuleName) ? CurrentModule.ModuleName : "N/A",
						CurrentModule.Description,
						CurrentModule.ProjectType,
						Client.CurrentPrincipal.Identity.Name);

					LicenseDao.LogEntry(null, null, MessageTypes.ModuleCreated, logMessage, longMessage);
				}
			} else {
				if (!Session.Update(CurrentModule)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

				string logMessage = string.Format("Module '{0}' modified by '{1}'",
					CurrentModule.Description,
					Client.CurrentPrincipal.Identity.Name);
				string longMessage = string.Format("Module Details:\nName: {0}\nDescription: {1}\nProject Type: {2}\nModified by: {3}",
					!string.IsNullOrEmpty(CurrentModule.ModuleName) ? CurrentModule.ModuleName : "N/A",
					CurrentModule.Description,
					CurrentModule.ProjectType,
					Client.CurrentPrincipal.Identity.Name);

				LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);
			}
			this.CurrentModule = null;
			this.LoadModules();
		}

		public void NavigateEditModuleProperty(int moduleID, int modulePropertyID) {
			if (modulePropertyID == 0) {
				this.CurrentModuleProperty = new ModuleProperty() {
					IsActive = true
				};
			} else {
				this.CurrentModuleProperty = this.ModuleDao.GetModuleProperty(modulePropertyID);
				if (this.CurrentModuleProperty == null) {
					this.LoadModules();
					throw new Error(Resources.SomebodyElseDeletedTheRecord());
				}
			}
			DisplayView<ModulesView>();
		}
		public void ResetCurrentModuleProperty() {
			CurrentModuleProperty = null;
		}
		public void SaveCurrentModuleProperty() {
			if (CurrentModuleProperty.ID == 0) {
				if (string.IsNullOrEmpty(this.CurrentModuleProperty.PropertyName)) { throw new Error("Property name cannot be empty."); }
				if (string.IsNullOrEmpty(this.CurrentModuleProperty.Description)) { throw new Error("Property description cannot be empty."); }

				// First check if a module property with the same PropertyName exists
				ModuleProperty existingPropertyByName = null;
				if (!string.IsNullOrEmpty(this.CurrentModuleProperty.PropertyName)) {
					existingPropertyByName = this.ModuleDao.GetModulePropertyByName(this.CurrentModuleProperty.PropertyName, true);

					if (existingPropertyByName != null && !existingPropertyByName.IsActive) {
						// Reactivate the existing module property by PropertyName
						existingPropertyByName.IsActive = true;
						existingPropertyByName.Description = this.CurrentModuleProperty.Description;
						if (!Session.Update(existingPropertyByName)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

						string logMessage = string.Format("Module-Property '{0}' reactivated", existingPropertyByName.Description);
						string longMessage = string.Format("Module Property Details:\nProperty Name: {0}\nDescription: {1}\nReactivated by: {2}",
							existingPropertyByName.PropertyName,
							existingPropertyByName.Description,
							Client.CurrentPrincipal.Identity.Name);

						LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, logMessage, longMessage);

						this.CurrentModuleProperty = null;
						this.AllModuleProperties = this.ModuleDao.GetModuleProperties();
						return;
					} else if (existingPropertyByName != null && existingPropertyByName.IsActive) {
						throw new Error("A module property with this name already exists and is active.");
					}
				}

				// If no existing property by name, check by description (fallback logic)
				var allModuleProperties = this.ModuleDao.GetModuleProperties().Concat(
					Session.Query<ModuleProperty, ModulePropertyMapping>()
						.Where(s => s.Main.IsActive == false)
						.ReadList()
				);

				var existingProperty = allModuleProperties.FirstOrDefault(p =>
					p.Description == this.CurrentModuleProperty.Description
				);

				if (existingProperty != null && !existingProperty.IsActive) {
					// Reactivate the existing module property instead of creating a new one
					existingProperty.IsActive = true;
					existingProperty.Description = this.CurrentModuleProperty.Description;
					existingProperty.PropertyName = this.CurrentModuleProperty.PropertyName;
					if (!Session.Update(existingProperty)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

					string logMessage = string.Format("Module-Property '{0}' reactivated", existingProperty.Description);
					string longMessage = string.Format("Module Property Details:\nProperty Name: {0}\nDescription: {1}\nReactivated by: {2}",
						existingProperty.PropertyName,
						existingProperty.Description,
						Client.CurrentPrincipal.Identity.Name);

					LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, logMessage, longMessage);
				} else if (existingProperty != null && existingProperty.IsActive) {
					throw new Error("A module property with this description already exists and is active.");
				} else {
					// Create new module property if no existing one found
					CurrentModuleProperty.IsActive = true;
					Session.Insert(CurrentModuleProperty);
					CurrentModuleProperty = ModuleDao.GetModuleProperty(CurrentModuleProperty.ID);

					string logMessage = string.Format("Module-Property '{0}' created", CurrentModuleProperty.Description);
					string longMessage = string.Format("Module Property Details:\nProperty Name: {0}\nDescription: {1}\nCreated by: {2}",
						!string.IsNullOrEmpty(CurrentModuleProperty.PropertyName) ? CurrentModuleProperty.PropertyName : "N/A",
						CurrentModuleProperty.Description,
						Client.CurrentPrincipal.Identity.Name);

					LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyCreated, logMessage, longMessage);
				}
			} else {
				if (!Session.Update(CurrentModuleProperty)) throw new Error(Resources.SomebodyElseModifiedTheRecord());

				string logMessage = string.Format("Module-Property '{0}' modified", CurrentModuleProperty.Description);
				string longMessage = string.Format("Module Property Details:\nProperty Name: {0}\nDescription: {1}\nModified by: {2}",
					!string.IsNullOrEmpty(CurrentModuleProperty.PropertyName) ? CurrentModuleProperty.PropertyName : "N/A",
					CurrentModuleProperty.Description,
					Client.CurrentPrincipal.Identity.Name);

				LicenseDao.LogEntry(null, null, MessageTypes.ModulePropertyModified, logMessage, longMessage);
			}
			this.CurrentModuleProperty = null;
			this.AllModuleProperties = this.ModuleDao.GetModuleProperties();
		}

		public void AddExistingModulePropertyToModule(Module module, ModuleProperty prop) {
			var mpInM = new ModulePropertiesInModules {
				ModuleID = module.ID,
				ModulePropertyID = prop.ID,
			};
			Session.Insert(mpInM);

			// Enhanced logging with detailed module and property information
			string logMessage = string.Format("Module-Property '{0}' added", prop.Description);
			string longMessage = string.Format("Module Property Addition Details:\nProperty Name: {0}\nProperty Description: {1}\nAdded to Module: {2}\nModule Description: {3}\nPerformed by: {4}",
				!string.IsNullOrEmpty(prop.PropertyName) ? prop.PropertyName : "N/A",
				prop.Description,
				!string.IsNullOrEmpty(module.ModuleName) ? module.ModuleName : "N/A",
				module.Description,
				Client.CurrentPrincipal.Identity.Name);

			LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);

			Modules.First(m => m.Node.ID == module.ID).Children.Add(prop);
			CurrentSelectedModuleProperty = null;
		}
		public void RemoveExistingModulePropertyFromModule(Module module, ModuleProperty prop) {
			var mpInM =
				ModuleDao.GetModulePropertiesInModules()
					.FirstOrDefault(x => x.ModuleID == module.ID && x.ModulePropertyID == prop.ID);
			if (mpInM != null) {
				Session.Delete(mpInM);

				// Enhanced logging with detailed module and property information
				string logMessage = string.Format("Module-Property '{0}' removed", prop.Description);
				string longMessage = string.Format("Module Property Removal Details:\nProperty Name: {0}\nProperty Description: {1}\nRemoved from Module: {2}\nModule Description: {3}\nPerformed by: {4}",
					!string.IsNullOrEmpty(prop.PropertyName) ? prop.PropertyName : "N/A",
					prop.Description,
					!string.IsNullOrEmpty(module.ModuleName) ? module.ModuleName : "N/A",
					module.Description,
					Client.CurrentPrincipal.Identity.Name);

				LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);
			}
			Modules.First(m => m.Node.ID == module.ID).Children.Remove(prop);
		}

		public bool CanUserDeleteModule {
			get { return this.Client.CurrentPrincipal.IsInRole("Gen3EditModule"); }
		}

		public void ConfirmDeleteModule(int moduleID) {
			if (!CanUserDeleteModule)
				return;

			var moduleToDelete = this.ModuleDao.GetModule(moduleID);
			if (moduleToDelete == null) {
				throw new Error(Resources.SomebodyElseDeletedTheRecord());
			}

			string confirmationMessage = "Wirklich löschen: " + moduleToDelete.Description + "?";

			Responses response = ShowQuestionNotification(this, confirmationMessage);
			if (response == Responses.YES) {
				DeleteModule(moduleID);
			}
		}

		private bool DeleteModule(int moduleID) {
			if (!CanUserDeleteModule)
				return false;

			var moduleToDelete = this.ModuleDao.GetModule(moduleID);
			if (moduleToDelete == null) {
				throw new Error(Resources.SomebodyElseDeletedTheRecord());
			}

			string moduleName = moduleToDelete.Description;
			string moduleNameField = moduleToDelete.ModuleName;
			string projectType = moduleToDelete.ProjectType;

			if (this.ModuleDao.DeleteModule(moduleID)) {
				// Enhanced logging with complete module details
				string logMessage = string.Format("Module '{0}' deleted by '{1}'", moduleName, Client.CurrentPrincipal.Identity.Name);
				string longMessage = string.Format("Deleted Module Details:\nName: {0}\nDescription: {1}\nProject Type: {2}\nDeleted by: {3}",
					!string.IsNullOrEmpty(moduleNameField) ? moduleNameField : "N/A",
					moduleName,
					!string.IsNullOrEmpty(projectType) ? projectType : "N/A",
					Client.CurrentPrincipal.Identity.Name);

				LicenseDao.LogEntry(null, null, MessageTypes.ModuleModified, logMessage, longMessage);

				// Clear current module and reload data to show only active modules
				this.CurrentModule = null;
				this.LoadModules();
				// Refresh the view to show updated data
				this.DisplayView<ModulesView>();
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

		public void NavigateToDirectModules() {
			this.RunApplication(new ModulesDirectApplication(), app => app.Start());
		}

		private void LoadModules() {
			var modules = this.ModuleDao.GetModules();
			this.AllModuleProperties = this.ModuleDao.GetModuleProperties();
			var allModulePropertiesInModules = this.ModuleDao.GetModulePropertiesInModules();
			this.Modules = modules.Select(module => new TreeWrapper<Module, ModuleProperty> {
				Node = module,
				Expanded = false,
				Children = this.AllModuleProperties.Where(prop => allModulePropertiesInModules.Any(x => x.ModuleID == module.ID && x.ModulePropertyID == prop.ID)).ToList()
			}).ToList();
		}
	}
}