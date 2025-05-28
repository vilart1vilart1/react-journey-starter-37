;
(function () {

	namespace("Crm.VisitReport.ViewModels").VisitListIndexViewModel.prototype.getIcsLinkAllowed = function () {
		return window.AuthorizationManager.isAuthorizedForAction("Visit", "Ics");
	};

	namespace("Crm.VisitReport.ViewModels").VisitListIndexViewModel.prototype.downloadIcs = function () {
		var viewModel = this;
		var cal = window.ics();
		viewModel.query().include("ResponsibleUserUser").include("Address").toArray(function (result) {
			result.forEach(function (x) {
				var visitAim = x.CustomAim;
				if (x.VisitAimKey && viewModel.lookups.visitAim[x.VisitAimKey]) {
					visitAim = viewModel.lookups.visitAim[x.VisitAimKey].Value;
				}
				const title = visitAim + " (" + window.Helper.User.getDisplayName(x.ResponsibleUserUser) + ")";

				const startDate = x.PlannedDate;
				var endDate = x.PlannedDate;
				if (x.PlannedTime) {
					startDate.setHours(x.PlannedTime.getHours());
					startDate.setMinutes(x.PlannedTime.getMinutes());
				}
				if (x.PlannedEndDate) {
					endDate = x.PlannedEndDate;
				}

				var description = "";
				description += window.Helper.String.getTranslatedString("VisitAim") + ": ";
				description += visitAim + "\\n";
				if (x.ParentName) {
					description += window.Helper.String.getTranslatedString("ContactName") + ": ";
					description += x.ParentName + "\\n";
				}
				if (x.ResponsibleUser) {
					description += window.Helper.String.getTranslatedString("ResponsibleUser") + ": ";
					description += window.Helper.User.getDisplayName(x.ResponsibleUserUser);
				}
				var address = "";
				if (x.Address) {
					address = window.Helper.Address.getAddressLine(x.Address);
				}
				cal.addEvent(title, description, address, startDate, endDate);
			});
		}).then(function () {
			cal.download(viewModel.entityType + "_" + viewModel.currentUserName);
		});
	};

})();