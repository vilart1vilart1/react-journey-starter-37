
﻿using System.Collections.Generic;
using LMobile.Gida;
using LMobile.Gen3LicenseManagement.Dao.BusinessObjects;
using LMobile.Gen3LicenseManagement.Dao.Contracts;
using LMobile.Gen3LicenseManagement.Dao.Mapping;
using System;
using System.Linq;
using System.Threading;
using System.Net.Mail;

namespace LMobile.Gen3LicenseManagement.Dao.Services {
	internal class ModuleDao : BaseDao, IModuleDao {
		public ModuleDao(GidaSession session)
		  : base(session) {
		}

		public List<Module> GetModules() {
			var query = Session.Query<Module, ModuleMapping>()
				.Where(s => s.Main.IsActive == true)
				.OrderBy(s => s.Main.Description);
			return query.ReadList();
		}
		public List<Module> GetModules(string projectType) {
			var query = Session.Query<Module, ModuleMapping>()
				.Where(s => s.Main.ProjectType == projectType && s.Main.IsActive == true)
				.OrderBy(s => s.Main.Description);
			return query.ReadList();
		}
		public Module GetModule(int moduleID) {
			if (moduleID == 0) return null;
			var query = Session.Query<Module, ModuleMapping>();
			query.Where(s => s.Main.ID == moduleID && s.Main.IsActive == true);
			return query.ReadFirst();
		}

		public List<ModuleProperty> GetModuleProperties() {
			var query = Session.Query<ModuleProperty, ModulePropertyMapping>()
				.Where(s => s.Main.IsActive == true)
				.OrderBy(s => s.Main.ID);
			return query.ReadList();
		}
		public List<ModuleProperty> GetModuleProperties(int moduleID) {
			if (moduleID == 0) return null;

			var ids = Session.Query<ModulePropertiesInModules, ModulePropertiesInModulesMapping>()
				.Where(x => x.Main.ModuleID == moduleID)
				.ReadList().Select(x => x.ModulePropertyID).ToList();

			var query = Session.Query<ModuleProperty, ModulePropertyMapping>();
			query.Where(s =>
			  s.Main.ID.In(ids.ToArray()) && s.Main.IsActive == true);
			query.OrderBy(s => s.Main.Description);
			return query.ReadList();
		}

		public List<ModuleProperty> GetModulePropertiesByName(string p_Name) {
			if (string.IsNullOrEmpty(p_Name)) return null;

			string name = string.Format("%{0}%", p_Name.ToUpper());

			var query = Session.Query<ModuleProperty, ModulePropertyMapping>();
			query.Where(s =>
			  (s.Main.PropertyName.ToUpper().Like(name)
			  | s.Main.Description.ToUpper().Like(name))
			  && s.Main.IsActive == true);

			query.OrderBy(s => s.Main.Description);
			return query.ReadList();
		}

		public List<ModuleProperty> GetModulePropertiesByName(string p_Name, int p_ProjectID) {
			if (string.IsNullOrEmpty(p_Name)) return null;

			string name = string.Format("%{0}%", p_Name.ToUpper());

			var query = Session.Query<ModuleProperty, ModulePropertyMapping>();
			query.Where(mp => (mp.Main.PropertyName.ToUpper().Like(name) | mp.Main.Description.ToUpper().Like(name))
			 && mp.Main.IsActive == true
			 && Gql.NotExists(Session.Query().From<ProjectModulePropertyMapping>().Where((pmp) => pmp.Main.ProjectID == p_ProjectID && pmp.Main.ModulePropertyID == mp.Main.ID)));

			query.OrderBy(s => s.Main.Description);
			return query.ReadList();
		}

		public List<ModulePropertiesInModules> GetModulePropertiesInModules() {
			var query = Session.Query<ModulePropertiesInModules, ModulePropertiesInModulesMapping>().OrderBy(s => s.Main.ModuleID).OrderBy(s => s.Main.ModulePropertyID);
			return query.ReadList();
		}
		public ModuleProperty GetModuleProperty(int modulePropertyID) {
			if (modulePropertyID == 0) return null;
			var query = Session.Query<ModuleProperty, ModulePropertyMapping>();
			query.Where(s => s.Main.ID == modulePropertyID && s.Main.IsActive == true);
			return query.ReadFirst();
		}

		public bool DeleteModule(int moduleID) {
			if (moduleID == 0) return false;

			// Get the module to ensure it exists and to get its description for the log entry
			var module = Session.Query<Module, ModuleMapping>()
				.Where(s => s.Main.ID == moduleID)
				.ReadFirst();
			
			if (module == null) return false;

			// Soft delete: set IsActive to false instead of physical deletion
			module.IsActive = false;
			return Session.Update(module);
		}

		public bool DeleteModuleProperty(int modulePropertyID) {
			if (modulePropertyID == 0) return false;

			// Get the module property to ensure it exists
			var moduleProperty = Session.Query<ModuleProperty, ModulePropertyMapping>()
				.Where(s => s.Main.ID == modulePropertyID)
				.ReadFirst();
			
			if (moduleProperty == null) return false;

			// Soft delete: set IsActive to false instead of physical deletion
			moduleProperty.IsActive = false;
			return Session.Update(moduleProperty);
		}
	}
}
