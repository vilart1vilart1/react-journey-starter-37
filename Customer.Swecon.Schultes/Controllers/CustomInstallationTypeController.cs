using System.Linq;

namespace Customer.Swecon.Schultes.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Web.Mvc;

	using Crm.Controllers;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Extensions;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Model;
	using Crm.Library.Paging;
	using Crm.Library.Paging.Extensions;
	using Crm.Library.Services.Interfaces;
	using Crm.Service;

	using Customer.Swecon.Schultes.Model;
	using Customer.Swecon.Schultes.Model.Extensions;

	public class CustomInstallationTypeController : CrmController
	{
		private readonly IUserService userService;
		private readonly IResourceManager resourceManager;
		private readonly IRepository<CustomInstallationType> CustomInstallationTypeRepository;

		public CustomInstallationTypeController(IUserService userService,
			IResourceManager resourceManager, IRepository<CustomInstallationType> CustomInstallationTypeRepository)
		{
			this.userService = userService;
			this.resourceManager = resourceManager;
			this.CustomInstallationTypeRepository = CustomInstallationTypeRepository;
		}
		public ActionResult CustomInstallationTypeCompleter(string q, string preferredUserId, int page, int pageSize)
		{
			var info = new PagingInfo(page - 1, pageSize);
			q = q.EmptyStringIfNull();
			//var usersQuery = GetTechnicians().Where(x => x.FirstName.Contains(q) || x.LastName.Contains(q) || x.Id.Contains(q));
			//var users = usersQuery.OrderBy(x => x.LastName).GetPage(info).ToList();
			var CustomInstallationTypeQuery = CustomInstallationTypeRepository.GetAll().Where(x => x.Description.Contains(q));
			var CustomInstallationTypes = CustomInstallationTypeRepository.GetAll().ToList();

			Select2PagedResult jsonusers = new Select2PagedResult();
			jsonusers.Results = new List<Select2Result>();
			foreach (var CustomInstallationType in CustomInstallationTypeQuery)
			{
				jsonusers.Results.Add(new Select2Result { id = CustomInstallationType.Id.ToString(), text = CustomInstallationType.Description });
			}
			jsonusers.Total = CustomInstallationTypeQuery.Count();
			//if (preferredUserId != null && page == 1)
			//{
			//	var preferredUser = GetTechnicians().FirstOrDefault(x => x.Id == preferredUserId);
			//	if (preferredUser != null)
			//	{
			//		jsonusers.Results.RemoveAll(x => x.id == preferredUserId);
			//		jsonusers.Results.Add(new Select2Result { id = preferredUser.Id,
			//		text = resourceManager.GetTranslation("PreferredUser") + " - " +preferredUser.DisplayName });
			//	}
			//}
			return new JsonResult
			{
				Data = jsonusers,
				JsonRequestBehavior = JsonRequestBehavior.AllowGet
			};
		}
		//protected virtual IQueryable<User> GetTechnicians()
		//{
		//	return userService.GetActiveUsersQuery()
		//		.Where(x => x.Roles.Any(r => r.Name == ServicePlugin.Roles.FieldService));
		//}
	}
}
