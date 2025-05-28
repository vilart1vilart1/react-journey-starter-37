namespace Customer.Ramseier.Services.TransformServices.Import
{
	using System;

	using AutoMapper;

	using Crm.Article.Model;
	using Crm.ErpExtension.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.Statistic;
	using Crm.ErpIntegration.Services.Integration.Interfaces;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Helper;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;

	using log4net;

	public class CustomerErpTurnoverTransformService : ErpTurnoverTransformService, IReplaceRegistration<ErpTurnoverTransformService>
	{
		public CustomerErpTurnoverTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger, Func<ErpTurnover> erpTurnoverFactory, ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService, IIntegrationService<Article, Guid> articleIntegrationService, ILegacyIdResolveService<Article, Guid> articleLegacyIdResolveService, IAppSettingsProvider appSettingsProvider)
			: base(mapper, domainService, extensionMappingService, resourceManager, ruleValidationService, logger, erpTurnoverFactory, companyLegacyIdResolveService, articleIntegrationService, articleLegacyIdResolveService, appSettingsProvider)
		{
		}
		public override ErpTurnover MapMoneyMonthValue(IA_Statistik src, ErpTurnover dest)
		{
			var vkGes = src.VKKo + src.VKLa + src.VKSt;

			return CalculateLine(src, dest, vkGes);
		}
		public override ErpTurnover MapQuantityMonthValue(IA_Statistik src, ErpTurnover dest)
		{
			var vkGes = src.VKMKO + src.VKMLa + src.VKMSt;

			return CalculateLine(src, dest, vkGes);
		}
		private ErpTurnover CalculateLine(IA_Statistik src, ErpTurnover dest, decimal? vkGes)
		{
			switch (src.Periode)
			{
				case 1:
					dest.Month1 = (float?)vkGes.GetValueOrDefault();
					break;
				case 2:
					dest.Month2 = (float?)vkGes.GetValueOrDefault();
					break;
				case 3:
					dest.Month3 = (float?)vkGes.GetValueOrDefault();
					break;
				case 4:
					dest.Month4 = (float?)vkGes.GetValueOrDefault();
					break;
				case 5:
					dest.Month5 = (float?)vkGes.GetValueOrDefault();
					break;
				case 6:
					dest.Month6 = (float?)vkGes.GetValueOrDefault();
					break;
				case 7:
					dest.Month7 = (float?)vkGes.GetValueOrDefault();
					break;
				case 8:
					dest.Month8 = (float?)vkGes.GetValueOrDefault();
					break;
				case 9:
					dest.Month9 = (float?)vkGes.GetValueOrDefault();
					break;
				case 10:
					dest.Month10 = (float?)vkGes.GetValueOrDefault();
					break;
				case 11:
					dest.Month11 = (float?)vkGes.GetValueOrDefault();
					break;
				case 12:
					dest.Month12 = (float?)vkGes.GetValueOrDefault();
					break;
			}

			var calculatedTotal = dest.Month1.GetValueOrDefault()
			                      + dest.Month2.GetValueOrDefault()
			                      + dest.Month3.GetValueOrDefault()
			                      + dest.Month4.GetValueOrDefault()
			                      + dest.Month5.GetValueOrDefault()
			                      + dest.Month6.GetValueOrDefault()
			                      + dest.Month7.GetValueOrDefault()
			                      + dest.Month8.GetValueOrDefault()
			                      + dest.Month9.GetValueOrDefault()
			                      + dest.Month10.GetValueOrDefault()
			                      + dest.Month11.GetValueOrDefault()
			                      + dest.Month12.GetValueOrDefault();
			dest.Total = calculatedTotal;

			return dest;
		}
	}
}