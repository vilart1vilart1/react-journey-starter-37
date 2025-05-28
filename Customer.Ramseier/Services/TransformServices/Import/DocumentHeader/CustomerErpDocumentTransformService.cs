using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Customer.Ramseier.Services.TransformServices.Import.DocumentHeader
{
	using AutoMapper;

	using Crm.ErpExtension.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.ErpDocument;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Import.DocumentHeader;
	using Crm.ErpIntegration.Services.Interfaces;
	using Crm.ErpIntegration.Services.LegacyIdResolveServices.Interfaces;
	using Crm.Library.AutoFac;
	using Crm.Library.Globalization.Resource;
	using Crm.Library.Services.Interfaces;
	using Crm.Model;
	using Crm.Model.Lookups;

	using Customer.Ramseier.Model.Extensions;

	using log4net;

	public class CustomerErpDocumentTransformService : ErpDocumentTransformService, IReplaceRegistration<ErpDocumentTransformService>
	{
		public CustomerErpDocumentTransformService(IMapper mapper, IDomainService domainService, IProAlphaExtensionMappingService extensionMappingService, Func<MasterContract> masterContractFactory, Func<CreditNote> creditNoteFactory, Func<DeliveryNote> deliveryNoteFactory, Func<Invoice> invoiceFactory, Func<SalesOrder> salesOrderFactory, Func<Quote> quoteFactory, Func<BlanketOrder> blanketOrderFactory, Func<DemoDeliveryNote> demoDeliveryNoteFactory, ILegacyIdResolveService<Company, Guid> companyLegacyIdResolveService, ILookupResolveService<Currency, string> currencyLookupResolveService, ILegacyIdResolveService<PmProject, Guid> pmProjectLegacyIdResolveService, IResourceManager resourceManager, IRuleValidationService ruleValidationService, ILog logger)
				: base(mapper, domainService, extensionMappingService, masterContractFactory, creditNoteFactory, deliveryNoteFactory, invoiceFactory, salesOrderFactory, quoteFactory, blanketOrderFactory, demoDeliveryNoteFactory, companyLegacyIdResolveService, currencyLookupResolveService, pmProjectLegacyIdResolveService, resourceManager, ruleValidationService, logger)
		{
		}

		public override ErpDocument MapAndResolveLegacyIds(Tuple<V_BelegKopf, FileResource, ErpDocument> src, ErpDocument dest)
		{
			// Document transferred should fall back to customer as base class always tries to map offers to prospects statically
			if (src.Item1.BelegArt == QuoteTypeKey && src.Item1.Interessent == default(int) && src.Item1.Kunde != default(int))
			{
				src.Item1.Interessent = src.Item1.Kunde;
			}
			return base.MapAndResolveLegacyIds(src, dest);
		}

		public override ErpDocument MapAfterResolve(Tuple<V_BelegKopf, FileResource, ErpDocument> src, ErpDocument dest)
		{
			if (src.Item1.BelegInfo != null && src.Item1.BelegInfo.StartsWith("R-"))
			{
				dest.GetExtension<ErpDocumentExtension>().IsComplained = true;
			}
			else
			{
				dest.GetExtension<ErpDocumentExtension>().IsComplained = false;
			}
			return base.MapAfterResolve(src, dest);
		}
	}
}