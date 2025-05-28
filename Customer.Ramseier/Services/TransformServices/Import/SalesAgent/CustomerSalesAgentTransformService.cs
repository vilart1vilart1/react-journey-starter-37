namespace Customer.Ramseier.Services.TransformServices.Import.SalesAgent
{
    using AutoMapper;
    using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
    using Crm.ErpIntegration.ProAlphaBase.Model;
    using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
    using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.SalesAgent;
    using Crm.ErpIntegration.Services.Interfaces;
    using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
    using Crm.Library.AutoFac;
    using Crm.Library.Globalization.Resource;
    using Crm.Library.Helper;
    using Crm.Library.Services.Interfaces;
    using log4net;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Crm.Library.Model;
    using Usergroup = Crm.Library.Model.Usergroup;
    using Customer.Ramseier.Model.Extensions;

    public class CustomerSalesAgentTransformService : SalesAgentTransformService, IReplaceRegistration<SalesAgentTransformService>
    {
        private readonly IUsergroupService usergroupService;
        private readonly Func<Usergroup> usergroupFactory;
        private readonly IUserService userService;

        public CustomerSalesAgentTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService,
            ILegacyIdResolveService<User, string> userLegacyIdResolveService, IAppSettingsProvider appSettingsProvider,
            Func<SalesAgent> salesAgentFactory, IResourceManager resourceManager, IRuleValidationService ruleValidationService
            , ILog logger, IUsergroupService usergroupService, Func<Usergroup> usergroupFactory, IUserService userService) : base(mapper, domainService, extensionMappingService, userLegacyIdResolveService, appSettingsProvider, salesAgentFactory,
                resourceManager, ruleValidationService, logger)
        {
            this.usergroupService = usergroupService;
            this.usergroupFactory = usergroupFactory;
            this.userService = userService;
        }

        public override SalesAgent MapAfterResolve(Tuple<S_Vertreter, S_Adresse, SalesAgent> src, SalesAgent dest)
        {
            var userId = dest.UserId;
      			var userGroup = usergroupFactory();

            userGroup.Members= new List<User>();
            userGroup.Name = src.Item2.Name1;
            userGroup.CreateUser = "_Undefined";
            userGroup.ModifyUser = "_Undefined";
            userGroup.GetExtension<UserGroupExtension>().Email = src.Item2.EMail;

    			  if (userId != null)
		    	  {
				      var user = userService.GetUser(userId);
              userGroup.Name = src.Item1.Benutzer;
				      userGroup.Members.Add(user);
			      }

      			if (usergroupService.GetUsergroupsQuery().FirstOrDefault(u => u.Name == userGroup.Name) == null)
            {
                usergroupService.SaveUsergroup(userGroup);
            }
            return base.MapAfterResolve(src, dest);
        }
    }
}