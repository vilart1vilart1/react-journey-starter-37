namespace Customer.Ramseier.Controllers.ActionRoleProvider
{
	using Crm;
    using Crm.Library.Model.Authorization;
	using Crm.Library.Model.Authorization.PermissionIntegration;
	using Crm.Library.Modularization.Interfaces;
	using Crm.Offline.Extensions;
	using Crm.VisitReport;
	using Customer.Ramseier.Model;
	using Customer.Ramseier.Model.Lookups;

    public class RamseierActionRoleProvider : RoleCollectorBase
	{
		public RamseierActionRoleProvider(IPluginProvider pluginProvider)
			: base(pluginProvider)
		{
			Add(RamseierPlugin.PermissionGroup.Turnover, PermissionName.View, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.FieldSales);
			Add(RamseierPlugin.PermissionGroup.Turnover, PermissionName.Index, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.FieldSales);
			Add(VisitReportPlugin.PermissionGroup.Visit, MainPlugin.PermissionName.Ics, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.FieldSales);
			
			Add(PermissionGroup.WebApi, nameof(Turnover), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(Turnover), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(RamseierPlugin.PermissionGroup.CustomErpDocument, PermissionName.View, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.FieldSales);
			Add(RamseierPlugin.PermissionGroup.CustomErpDocument, PermissionName.Index, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.FieldSales);

			Add(PermissionGroup.WebApi, typeof(CustomErpDocument).Name, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, "HeadOfService", "ServiceBackOffice", "InternalService", Roles.APIUser);
			this.AddSyncPermission(nameof(CustomErpDocument), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);

			Add(PermissionGroup.WebApi, nameof(ErpDocumentArticleRelationship), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(ErpDocumentArticleRelationship), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(PermissionGroup.WebApi, nameof(ContactStatus), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(ContactStatus), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(PermissionGroup.WebApi, nameof(ContactStatusType), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(ContactStatusType), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(PermissionGroup.WebApi, nameof(ArticleDiscountGroupCustomer), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(ArticleDiscountGroupCustomer), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(PermissionGroup.WebApi, nameof(PartDiscountGroups), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(PartDiscountGroups), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
			Add(PermissionGroup.WebApi, nameof(CustomerDiscountGroup), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
			this.AddSyncPermission(nameof(CustomerDiscountGroup), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);

            Add(PermissionGroup.WebApi, nameof(TurnoverArticleGroup), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales, Roles.APIUser);
            this.AddSyncPermission(nameof(TurnoverArticleGroup), MainPlugin.Roles.SalesBackOffice, MainPlugin.Roles.HeadOfSales, MainPlugin.Roles.InternalSales, MainPlugin.Roles.FieldSales);
        }
	}
}