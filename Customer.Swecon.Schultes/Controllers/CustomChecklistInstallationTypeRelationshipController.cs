namespace Customer.Swecon.Schultes.Controllers
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using System.Web.Mvc;
	using Crm.Controllers;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Globalization.Lookup;
	using Crm.Library.Modularization;
	using Crm.Library.Services.Interfaces;
	using Crm.Service.Model;
	using Customer.Swecon.Schultes.Model;
	using Customer.Swecon.Schultes.Model.Extensions;
	using Customer.Swecon.Schultes.ViewModels;



	public class CustomChecklistInstallationTypeRelationshipController : CrmController
	{

		private readonly IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderRepository;
		private readonly IRepository<CustomInstallationType> CustomInstallationTypeRepository;
		private readonly IUserService userService;
		public CustomChecklistInstallationTypeRelationshipController(IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderRepository, IUserService userService, IRepository<CustomInstallationType> CustomInstallationTypeRepository)
		{

			this.serviceOrderRepository = serviceOrderRepository;
			this.userService = userService;
			this.CustomInstallationTypeRepository = CustomInstallationTypeRepository;
		}
		[RenderAction("FormDesignerTabHeader")]
		public ActionResult FormDesignerTabHeader()
		{
			return PartialView();
		}
		[RenderAction("FormDesignerTab")]
		public ActionResult FormDesignerTab()
		{
			var model = GetModel();
			return PartialView(model);
		}

		[RenderAction("RelationshipEditor")]
		public ActionResult RelationshipEditor()
		{
			var model = GetModel();
			return PartialView(model);
		}


		private CustomChecklistInstallationTypeRelationshipViewModel GetModel()
		{
			var model = new CustomChecklistInstallationTypeRelationshipViewModel
			{
				Item = new CustomChecklistInstallationTypeRelationship(),
				List = new List<CustomChecklistInstallationTypeRelationship>(),
				CustomInstallationTypes = CustomInstallationTypeRepository.GetAll().ToList()
			};
			return model;
		}
	}
}