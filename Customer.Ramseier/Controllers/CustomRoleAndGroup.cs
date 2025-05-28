namespace Customer.Ramseier.Controllers { 
    using Castle.Core.Internal;
    using Crm;
    using Crm.Controllers; 
    using Crm.Library.AutoFac; 
    using Crm.Library.Data.Domain.DataInterfaces; 
    using Crm.Library.Globalization.Lookup; 
    using Crm.Library.Globalization.Resource; 
    using Crm.Library.Model; 
    using Crm.Library.Model.Authorization; 
    using Crm.Library.Model.Authorization.Interfaces;
    using Crm.Library.Rest; 
    using Crm.Library.Services.Interfaces; 
    using Crm.Services; 
    using Crm.ViewModels; 
    using Customer.Ramseier.Model.Extensions;
    using LMobile.Unicore;
    using System; 
    using System.Web.Mvc;
    using System.Web.Routing; 
    public class CustomRoleAndGroupController : RoleAndGroupController, IReplaceRegistration<RoleAndGroupController>
    { 
        private readonly IUsergroupService usergroupService; 
        public CustomRoleAndGroupController(IPdfService pdfService, RestTypeProvider restTypeProvider, IRenderViewToStringService renderViewToStringService, RouteCollection routeCollection, ILookupManager lookupManager, IResourceManager resourceManager, IRuleValidationService ruleValidationService, IPermissionManager permissionManager, IUserService userService, IUsergroupService usergroupService, Func<Usergroup> usergroupFactory, IRepositoryWithTypedId<Station, Guid> stationRepository, Func<Station> stationFactory, IAuthorizationManager authorizationManager, IAccessControlManager accessControlManager, Func<RoleEditViewModel> roleEditViewModelFactory, Lazy<IGrantedRoleStore> grantedRoleStore, Func<PermissionSchemaRole> permissionSchemaRoleFactory) 
            : base(pdfService, restTypeProvider, renderViewToStringService, routeCollection, lookupManager, resourceManager, ruleValidationService, permissionManager, userService, usergroupService, usergroupFactory, stationRepository, stationFactory, authorizationManager, accessControlManager, roleEditViewModelFactory, grantedRoleStore, permissionSchemaRoleFactory)
        { 
            this.usergroupService = usergroupService; } 
        [AcceptVerbs(HttpVerbs.Post)][RequiredPermission(MainPlugin.PermissionName.SaveUserGroup, Group = PermissionGroup.UserAdmin)]
        [RequiredPermission(MainPlugin.PermissionName.EditUserGroup, Group = PermissionGroup.UserAdmin)]
        public ActionResult CustomerUserGroupEdit(Usergroup userGroup, string email) { 
            var model = new CrmModelItem<Usergroup>
            { Item = userGroup };
            if (!email.IsNullOrEmpty())
            { 
             userGroup.GetExtension<UserGroupExtension>().Email = email; 
            } 
            usergroupService.SaveUsergroup(userGroup); 
            return PartialView("UserGroupEntry", model);
        } 
    } 
}