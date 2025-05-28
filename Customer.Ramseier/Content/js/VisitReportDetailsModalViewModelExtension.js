(function () {
    var baseViewModel = namespace("Crm.VisitReport.ViewModels").VisitReportDetailsModalViewModel;
    namespace("Crm.VisitReport.ViewModels").VisitReportDetailsModalViewModel = function (parentViewModel) {
        var viewModel = this;
        baseViewModel.apply(this, arguments);
        viewModel.tasks = window.ko.observableArray([]);
        viewModel.contactId = parentViewModel.contactId();
        viewModel.participants = window.ko.observableArray([]);
        viewModel.statistics = window.ko.observableArray([]);
        viewModel.relationships = window.ko.observableArray([]);
        viewModel.visitId = window.ko.observable(null);
        viewModel.visitReport= window.ko.observable(null);
        viewModel.lookups = {
            contactPersonRelationshipTypes: { $tableName: "CrmVisitReport_ContactPersonRelationshipType" },
            visitAims: { $tableName: "CrmVisitReport_VisitAim" }
        };
        if (window.Main.Settings.CompanyGroupFlags.AreSearchable) {
            var companyGroupFlags = {
                companyGroupFlags1: { $tableName: "Main_CompanyGroupFlag1" },
                companyGroupFlags2: { $tableName: "Main_CompanyGroupFlag2" },
                companyGroupFlags3: { $tableName: "Main_CompanyGroupFlag3" }
            };
            window.ko.utils.extend(viewModel.lookups, companyGroupFlags);
        }
    };
    namespace("Crm.VisitReport.ViewModels").VisitReportDetailsModalViewModel.prototype = Object.create(window.Crm.DynamicForms.ViewModels.DynamicFormDetailsViewModel.prototype);
    namespace("Crm.VisitReport.ViewModels").VisitReportDetailsModalViewModel.prototype.init = function (id) {
        var viewModel = this;
      return window.Helper.User.getCurrentUser().then(function (user) {
        viewModel.user = user;
        viewModel.selectedLanguage(user.DefaultLanguageKey);
        return window.Helper.Lookup.getLocalizedArrayMaps(viewModel.lookups, user.DefaultLanguageKey);
      }).then(function () {
        return window.database.CrmVisitReport_VisitReport
          .include("DynamicForm.Languages")
          .include("Responses")
          .include("ResponsibleUserUser")
          .include("Company")
          .include("Company.Addresses")
          .include("Company.Addresses.Phones")
          .include("Visit")
          .include("Visit.Address")
          .find(id)
            .then(function (visitReport) {
              viewModel.visitReport(visitReport.asKoObservable());
                viewModel.visitId(viewModel.visitReport().VisitId());
            
          })
            .then(function () {
              return window.database.CrmVisitReport_ContactPersonRelationship
                  .include("Child")
                  .filter(function(x) { return x.ParentId === this.visitId }, { visitId: viewModel.visitId() })
                  .toArray(viewModel.participants)
                  .then(function() {
                      return window.database.Main_Task
                          .include("ResponsibleUserUser")
                          .filter(function(task) {
                                  return (task.IsCompleted === false) &&
                                      task.ContactId === this.contactId;
                              },
                              { contactId: viewModel.contactId })
                          .orderBy("it.IsCompleted")
                          .orderBy("it.DueDate")
                          .orderBy("it.DueTime")
                          .toArray(viewModel.tasks);
                  })
                  .then(function() {
                      return window.database.CustomerRamseier_Turnover
                          .filter(function(x) { return x.ContactKey === this.companyId && !x.IsVolume },
                              { companyId: viewModel.visitReport().Company().Id() })
                          .toArray(viewModel.statistics);
                  })
                  .then(function () {
                      
                          return window.database.Main_BusinessRelationship
                              .include("Child")
                              .filter(
                                  "it.ParentId === this.contactId  && it.RelationshipTypeKey === this.relationshipTypeKey",
                                  { contactId: viewModel.visitReport().Company().Id(), relationshipTypeKey: '101' })
                              .toArray(viewModel.relationships);

                  })
                  .then(function() {

                      return window.Crm.DynamicForms.ViewModels.DynamicFormDetailsViewModel.prototype.init.call(
                          viewModel,
                          { formReference: viewModel.visitReport().asKoObservable() });
                  });
          });
      });
    };
})();

