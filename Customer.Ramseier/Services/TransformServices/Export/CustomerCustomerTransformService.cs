namespace Customer.Ramseier.Services.Export
{
	using System;

	using AutoMapper;

	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Export.Prospect;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Extensions;
	using Crm.Library.Globalization.Lookup;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;

	using log4net;

	public class CustomerCustomerTransformService : CustomerTransformService, IReplaceRegistration<CustomerTransformService>
	{
		public CustomerCustomerTransformService(
			IMapper mapper,
			IDomainService domainService,
			IProAlphaExtensionMappingService extensionMappingService,
			IAppSettingsProvider appSettingsProvider,
			ILookupManager lookupManager,
			IResourceManager resourceManager,
			IRuleValidationService ruleValidationService,
			ILog logger)
			: base(
				mapper,
				domainService,
				extensionMappingService,
				appSettingsProvider,
				lookupManager,
				resourceManager,
				ruleValidationService,
				logger)
		{
		}
		public override S_Kunde MapInput(Tuple<Company, S_Kunde> input)
		{
			var output = base.MapInput(input);
			var company = input.Item1;
			if (company.CompanyGroupFlag1Key.IsNotNullOrEmpty())
			{
				output.ABC_Klasse = company.CompanyGroupFlag1Key;
			}

			return output;
		}
        public override S_Kunde MapAndResolveLegacyIds(Tuple<Company, S_Kunde> src, S_Kunde dest)
        {
			return dest;
        }

    }
}