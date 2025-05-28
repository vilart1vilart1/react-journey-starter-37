namespace Customer.Ramseier.Services.DataSetExportServices
{
	using System;
	using System.Collections.Generic;
	using System.Linq;
	using Crm.ErpIntegration.ProAlphaBase;
	using Crm.ErpIntegration.ProAlphaBase.Helper.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Model;
	using Crm.ErpIntegration.ProAlphaBase.Model.Extensions.Contact;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.DataSet;
	using Crm.ErpIntegration.ProAlphaBase.Model.ProAlpha.Entity;
	using Crm.ErpIntegration.ProAlphaBase.Services.DataSetExportServices.Default;
	using Crm.ErpIntegration.ProAlphaBase.Services.Interfaces;
	using Crm.ErpIntegration.ProAlphaBase.Services.TransformServices.Interfaces;
	using Crm.Library.Data.Domain.DataInterfaces;
	using Crm.Library.Data.NHibernateProvider;
	using Crm.Library.Helper;
	using Crm.Model;
	using Crm.Project.Model;

	using LMobile.Unicore.NHibernate;

	using log4net;

	public class ProspectAgentLinkDataSetExportService : DefaultDataSetExportService<SalesAgentCompanyRelationship, ProspectAgentLinkDataSet, VC_InterVertreter>
	{
		protected readonly IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository;
		protected readonly IRepositoryWithTypedId<Company, Guid> companyRepository;

		protected readonly ITransformService<Tuple<SalesAgentCompanyRelationship, VC_InterVertreter>, VC_InterVertreter> SalesAgentCompanyRelationshipTransformService;
		public override int Priority => 1200;
		protected override string ProAlphaMessageType => appSettingsProvider.GetValue(ProAlphaBasePlugin.Settings.ProAlpha.MessageType.ProspectAgentLinkDataSet);

		public override IQueryable<SalesAgentCompanyRelationship> GetUnexportedEntitiesQuery(IQueryable<SalesAgentCompanyRelationship> query)
		{
			var salesAgentsWithProAlphaObjectId = salesAgentRepository.GetAll()
				.Where(x => x.ProAlphaObjectId != null)
				.Select(x => x.Id);

			var companiesWithProAlphaObjectId = companyRepository.GetAll()
				.Where(x => x.ModelExtension<CompanyExtension, string>(e => e.ProAlphaObjectId) != null)
				.Select(x => x.Id);

			return query.Where(x => !x.IsExported)
				.Where(x => x.CompanyId != null && companiesWithProAlphaObjectId.Contains(x.CompanyId))
				.Where(x => x.IsActive || x.ProAlphaObjectId != null)
				.Where(x => x.SalesAgentId != null && salesAgentsWithProAlphaObjectId.Contains(x.SalesAgentId));
		}

		public override ProspectAgentLinkDataSet CreateDataSet(SalesAgentCompanyRelationship entity, ProspectAgentLinkDataSet model)
		{
			//var projectExtension = entity.GetExtension<ProjectExtension>();
			var oldSalesAgentCompanyRelationship = model != null ? GetHeadEntities(model).FirstOrDefault(x => x.VC_InterVertreter_Obj == entity.ProAlphaObjectId) : null;

			var salesAgentCompanyRelationship = SalesAgentCompanyRelationshipTransformService.Transform(
				new Tuple<SalesAgentCompanyRelationship, VC_InterVertreter>(
					entity,
					oldSalesAgentCompanyRelationship));

			return new ProspectAgentLinkDataSet { SalesAgentCompanyRelationships = new List<VC_InterVertreter> { salesAgentCompanyRelationship } };
		}

		public override IEnumerable<VC_InterVertreter> GetHeadEntities(ProspectAgentLinkDataSet dataSet)
		{
			return dataSet.SalesAgentCompanyRelationships;
		}

		protected override void SetExportInformation(SalesAgentCompanyRelationship entity, bool isExported, string exportDetailMessage)
		{
			entity.IsExported = isExported;
			repository.SaveOrUpdate(entity);
		}

		public ProspectAgentLinkDataSetExportService(
			ISessionProvider sessionProvider,
			IAppSettingsProvider appSettingsProvider,
			IProAlphaXmlHelper xmlHelper,
			ILog logger,
			IUncHelper uncHelper,
			IProAlphaIntegrationDataService proAlphaIntegrationDataService,
			IProAlphaTransactionService proAlphaTransactionService,
			IRepository<SalesAgentCompanyRelationship> repository,
			IRepositoryWithTypedId<SalesAgent, Guid> salesAgentRepository,
			IRepositoryWithTypedId<Company, Guid> companyRepository,
			ITransformService<Tuple<SalesAgentCompanyRelationship, VC_InterVertreter>, VC_InterVertreter> SalesAgentCompanyRelationshipTransformService)
			: base(
				sessionProvider,
				appSettingsProvider,
				xmlHelper,
				logger,
				uncHelper,
				proAlphaIntegrationDataService,
				proAlphaTransactionService,
				repository)
		{
			this.salesAgentRepository = salesAgentRepository;
			this.companyRepository = companyRepository;
			this.SalesAgentCompanyRelationshipTransformService = SalesAgentCompanyRelationshipTransformService;
		}
	}
}