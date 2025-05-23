namespace Customer.Swecon.Schultes.Services
{
  using System.Collections.Generic;
  using System.Linq;
  using System.Security;
  using System.Security.Permissions;
  using System.Web.Mvc;

  using Crm.Library.AutoFac;
  using Crm.Library.BaseModel;
  using Crm.Library.BaseModel.Extensions;
  using Crm.Library.BaseModel.Interfaces;
  using Crm.Library.Data.Domain.DataInterfaces;
  using Crm.Library.Environment.FileSystems.Plugin;
  using Crm.Library.Extensions;
  using Crm.Library.Model.Site;
  using Crm.Library.Modularization.Events;
  using Crm.Library.Services.Interfaces;
  using Crm.Service.Model;
  using Crm.Services.Interfaces;

  using Customer.Swecon.Controllers;
  using Customer.Swecon.Model;

  using Microsoft.Reporting.WinForms;
  using System;

  using Crm.Library.Globalization.Lookup;
  using Crm.Service.Model.Lookup;
  using Crm.Service.ViewModels;
  using Crm.Services;

  using Customer.Swecon.ViewModels;
  public class ServiceOrderService : Swecon.Services.ServiceOrderService, IReplaceRegistration<Swecon.Services.ServiceOrderService>
  {
    private readonly IPluginFolder pluginFolder;
    private readonly IPdfService pdfService;
    private readonly Site site;
    private readonly ILookupManager lookupManager;
    private readonly IRepositoryWithTypedId<ServiceOrderTime, Guid> serviceOrderTimeRepository;
    public ServiceOrderService(IRepositoryWithTypedId<ServiceCase, Guid> serviceCaseRepository, IRepositoryWithTypedId<Installation, Guid> installationRepository, INumberingService numberingService, ICompanyService companyService, IRepositoryWithTypedId<ServiceOrderHead, Guid> serviceOrderRepository, IRepositoryWithTypedId<ServiceOrderDispatch, Guid> dispatchRepository, Site site, IPluginFolder pluginFolder, IEntityExtensionsProvider entityExtensionProvider, IRenderViewToStringService renderViewToStringService, IPdfService pdfService, Func<ServiceOrderDispatch, IDispatchReportViewModel> dispatchReportViewModelFactory, IRepositoryWithTypedId<ServiceOrderTime, Guid> serviceOrderTimeRepository, ILookupManager lookupManager)
      : base(serviceCaseRepository, installationRepository, numberingService, companyService, serviceOrderRepository, dispatchRepository, site, pluginFolder, entityExtensionProvider, renderViewToStringService, pdfService, dispatchReportViewModelFactory, serviceOrderTimeRepository)
    {
      this.pdfService = pdfService;
      this.pluginFolder = pluginFolder;
      this.site = site;
      this.lookupManager = lookupManager;
      this.serviceOrderTimeRepository = serviceOrderTimeRepository;
    }

    private byte[] AppendRepairingConditions(byte[] report, string language)
    {
      //byte[] repairingConditionsBytes;
      //using (var repairingConditionsReport = new LocalReport
      //{
      //  ReportPath = pluginFolder.MapPath(String.Format("~/Customer.Swecon/Reports/Reperaturbedingungen.pdf", language))
      //})
      //{
      //  repairingConditionsBytes = repairingConditionsReport.Render("PDF");
      //}

      //string pdfFilePath = pluginFolder.MapPath(String.Format("~/Customer.Swecon.Schultes/Reports/Reperaturbedingungen.pdf", language));
      //byte[] repairingConditionsBytes = System.IO.File.ReadAllBytes(pdfFilePath);

      return report;
    }

    public override byte[] CreateServiceOrderReportAsPdf(ServiceOrderHead order)
    {
      var serviceOrderExtensions = order.GetExtensionValues().ToList();
      var serviceCase = order.ServiceCase;
      var installationHead = order.AffectedInstallation;
      var installationExtensions = installationHead != null ? installationHead.GetExtensionValues().ToList() : new List<EntityExtension>();
      var company = order.CustomerContact;
      var companyExtensions = company != null ? company.GetExtensionValues().ToList() : new List<EntityExtension>();
      var materials = order.ServiceOrderMaterials.Where(x => x.ActualQty > 0).ToList();
      var timePostings = GetPatchedTimePostings(order.ServiceOrderTimePostings.ToList())
        .OrderBy(p => p.Date.Date)
        .ThenBy(p => p.From.GetValueOrDefault().TimeOfDay)
        .ThenBy(p => p.To.GetValueOrDefault().TimeOfDay)
        .ToList();
      var dispatches = order.Dispatches.ToList().OrderBy(x => x.Date.Date).ThenBy(x => x.Time.TimeOfDay).ToList();
      var dispatchesExtensions = dispatches.SelectMany(x => x.GetExtensionValues().ToList()).ToList();
      var dispatchesExtensionsLastOperatingHours = dispatchesExtensions.OfType<ServiceOrderDispatchExtension>()
        .OrderBy(x => x.OperatingHoursDate)
        .LastOrDefault(x => x.OperatingHoursChecked && x.OperatingHours != null);
      var usageCode = installationHead.GetExtension<InstallationExtension>().UsageCode;
      var address = installationHead != null && installationHead.LocationAddress != null ? installationHead.LocationAddress : company != null && company.StandardAddress != null ? company.StandardAddress : null;
      var language = site.DefaultLanguageKey;
      var serviceOrderType = lookupManager.Get<ServiceOrderType>(order.TypeKey);


	  if (dispatches.Any())
      {
        language = dispatches.First().DispatchedUser.DefaultLanguageKey;
      }
      else if (company != null)
      {
        language = company.LanguageKey;
      }

      var reportPath = pluginFolder.MapPath(String.Format("~/Customer.Swecon.Schultes/Reports/ServiceOrder.{0}.rdlc", language));
      var report = new LocalReport
      {
        ReportPath = reportPath
      };

      report.DataSources.Add(new ReportDataSource("ServiceCase", serviceCase.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("ServiceOrder", order.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("ServiceOrderExtensions", serviceOrderExtensions));
      report.DataSources.Add(new ReportDataSource("Installation", installationHead.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("InstallationExtensions", installationExtensions));
      report.DataSources.Add(new ReportDataSource("Address", address.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Company", company.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("CompanyExtensions", companyExtensions));
      report.DataSources.Add(new ReportDataSource("Materials", materials));
      report.DataSources.Add(new ReportDataSource("TimePostings", timePostings));
      report.DataSources.Add(new ReportDataSource("Dispatches", dispatches));
      report.DataSources.Add(new ReportDataSource("DispatchesExtensions", dispatchesExtensions));
      report.DataSources.Add(new ReportDataSource("DispatchesExtensionsLastOperatingHours", dispatchesExtensionsLastOperatingHours.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Site", site.AsEnumerable()));
      //report.DataSources.Add(new ReportDataSource("serviceOrderType", serviceOrderType.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("UsageCodeDataSet", usageCode.AsEnumerable()));

      report.SetBasePermissionsForSandboxAppDomain(new PermissionSet(PermissionState.Unrestricted));

      var bytes = report.Render("PDF");

      return bytes;
    }
    public override byte[] CreateDispatchReportAsPdf(ServiceOrderDispatch dispatch)
    {
      var dispatchedUser = dispatch.DispatchedUser;
      var language = dispatchedUser.DefaultLanguageKey ?? site.DefaultLanguageKey; var serviceOrder = dispatch.OrderHead;
      var installationHead = serviceOrder.AffectedInstallation;
      var installationExtensions = installationHead != null ? installationHead.GetExtensionValues().ToList() : new List<EntityExtension>();
      var company = serviceOrder.CustomerContact;
      var dispatchExtensions = dispatch.GetExtensionValues().ToList();
      var dispatchExtensionsLastOperatingHours = dispatchExtensions.OfType<ServiceOrderDispatchExtension>()
        .OrderBy(x => x.OperatingHoursDate)
        .LastOrDefault(x => x.OperatingHoursChecked && x.OperatingHours != null);
      var usageCode = installationHead.GetExtension<InstallationExtension>().UsageCode;
      var address = installationHead != null && installationHead.LocationAddress != null ? installationHead.LocationAddress : company != null && company.StandardAddress != null ? company.StandardAddress : null;
      var causingItemReportViewModels = dispatch.OrderHead.ServiceOrderTimes.Where(x => x.CausingItemNo != null).Select(x => new CausingItemReportViewModel(x, language));
      var serviceOrderMaterialViewModel = dispatch.ServiceOrderMaterial.Where(x => x.ActualQty > 0).Select(x => new ServiceOrderMaterialReportViewModel(x, language));
      var reportPath = pluginFolder.MapPath(String.Format("~/Customer.Swecon.Schultes/Reports/ServiceDispatch.{0}.rdlc", language));
			//hier 

			if (dispatch.OrderHead.StationKey == 7)
			{
				reportPath = pluginFolder.MapPath(String.Format("~/Customer.Swecon.Schultes/Reports/ServiceDispatchSaarMoselStation0.{0}.rdlc", language));
			}
			if (dispatch.OrderHead.StationKey == 8)
			{
				reportPath = pluginFolder.MapPath(String.Format("~/Customer.Swecon.Schultes/Reports/ServiceDispatchSaarMoselStation1.{0}.rdlc", language));
			}

			var report = new LocalReport
      {
        ReportPath = reportPath
      };
      var strings = new
      {
        serviceOrderTypeReport = lookupManager.Get<ServiceOrderType>(dispatch.OrderHead.TypeKey).ToString()
      };

   



			report.DataSources.Add(new ReportDataSource("ServiceOrder", serviceOrder.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Dispatch", dispatch.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("CausingItemReportViewModel", causingItemReportViewModels));
      report.DataSources.Add(new ReportDataSource("ServiceOrderMaterialViewModel", serviceOrderMaterialViewModel));
      report.DataSources.Add(new ReportDataSource("TimePostings", GetPatchedTimePostings(dispatch.TimePostings.ToList())));
      report.DataSources.Add(new ReportDataSource("Address", address.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Company", company.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Site", site.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("DispatchedUser", dispatchedUser.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Installation", installationHead.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("InstallationExtensions", installationExtensions));
      report.DataSources.Add(new ReportDataSource("DispatchExtensions", dispatchExtensions));
      report.DataSources.Add(new ReportDataSource("DispatchExtensionsLastOperatingHours", dispatchExtensionsLastOperatingHours.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("Strings", strings.AsEnumerable()));
      report.DataSources.Add(new ReportDataSource("UsageCodeDataSet", usageCode.AsEnumerable()));
      report.SetBasePermissionsForSandboxAppDomain(new PermissionSet(PermissionState.Unrestricted));
      var bytes = report.Render("PDF");
      return AppendRepairingConditions(bytes, language);
    }
    private IEnumerable<ServiceOrderTimePosting> GetPatchedTimePostings(IList<ServiceOrderTimePosting> timePostings)
    {
      var timePostingsWithOrderTimes = timePostings.Where(p => p.ItemNo == "0300" && p.OrderTimesId.HasValue).ToList();
      var serviceOrderTimeIds = timePostingsWithOrderTimes.Select(p => p.OrderTimesId.Value).Distinct();
      var diagnoses = serviceOrderTimeRepository.GetAll()
        .Where(x => serviceOrderTimeIds.Contains(x.Id) && x.Diagnosis != null && x.Diagnosis.Trim().Length > 0)
        .ToDictionary(k => k.Id, v => v.Diagnosis);
      foreach (var tp in timePostings)
      {
        if(tp.ItemNo != "8011" && tp.ItemNo != "8012" && tp.ItemNo != "8013" && tp.ItemNo != "8021" && tp.ItemNo != "8022" && tp.ItemNo != "8023") { 
        string diagnosis;
        if (tp.ItemNo == "0300" && tp.OrderTimesId.HasValue && diagnoses.TryGetValue(tp.OrderTimesId.Value, out diagnosis))
        {
          var description = "Diagnosis".GetTranslation() + ": " + diagnosis;
          if (string.IsNullOrWhiteSpace(tp.Description) == false)
          {
            description += Environment.NewLine + "ExecutedWork".GetTranslation() + ": " + tp.Description;
          }
          yield return new ServiceOrderTimePosting()
          {
            ItemNo = tp.ItemNo,
            ArticleDescription = tp.ArticleDescription,
            From = tp.From,
            To = tp.To,
            Date = tp.Date,
            BreakInMinutes = tp.BreakInMinutes,
            DurationInMinutes = tp.DurationInMinutes,
            Kilometers = tp.Kilometers,
            User = tp.User,
            UserUsername = tp.UserUsername,
            Description = description
          };
        }
        else
        {
          yield return tp;
        }
        }
      }
    }
    private string GetEloString(ServiceOrderDispatch serviceOrderDispatch)
    {
      var serviceOrder = serviceOrderDispatch.OrderHead;
      var installation = serviceOrder.AffectedInstallation;
      var installationExtension = installation.GetExtension<InstallationExtension>();
      var technicians = serviceOrderDispatch.TimePostings.Select(x => x.User).Distinct().OrderBy(x => x.Id);
      var technicianResourceNos = technicians.Select(x => x.PersonnelId).ToArray();
      var technicianNames = technicians.Select(x => x.DisplayName).ToArray();
      return String.Format("¶@@OM@@Profile=SWECON@@identify={0}¶@@BLP@@ARCHIVE=SWECON@@STORAGERULE=AS_Reparaturauftrag@@IDX={1};{2};{3};{4};{5};{6};{7};{8}; ¶ ¶ {9}; ¶ ¶ {10};{11}¶",
        serviceOrder.LegacyId
        , installation.InstallationNo
        , installationExtension.ManufacturerWarrantyCode
        , installation.InstallationTypeKey
        , installationExtension.CustomInstallationType
        , installation.LocationContact.LegacyId
        , serviceOrder.LegacyId
        , serviceOrder.TypeKey
        , serviceOrder.PriorityKey
        , String.Join("¶", technicianResourceNos)
        , String.Join("¶", technicianNames)
        , serviceOrderDispatch.ModifyDate.ToShortDateString());
    }

    public byte[] CreateTakeoverReportAsPdf(Guid dispatchId)
    {
      var dispatchController = IoC.GetInstance<DispatchController>();
      var result = (FileContentResult)dispatchController.TakeoverReport(dispatchId);
      return result.FileContents;
    }
  }
}