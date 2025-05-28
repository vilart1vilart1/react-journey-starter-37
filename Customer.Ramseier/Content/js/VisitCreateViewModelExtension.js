(function () {
	var baseViewModel = window.Crm.VisitReport.ViewModels.VisitCreateViewModel;
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel = function () {
		baseViewModel.apply(this, arguments);
		var viewModel = this;
		viewModel.visits = window.ko.observableArray([]);
		viewModel.calendar = new window.Main.ViewModels.DashboardCalendarWidgetViewModel();

		var getTimelineEvents = viewModel.calendar.getTimelineEvents;
		viewModel.calendar.getTimelineEvents = function () {
			return getTimelineEvents.apply(this, arguments).then(function (results) {
				return viewModel.visits();
			});
		};

		var getTimelineEvent = viewModel.calendar.getTimelineEvent;
		viewModel.calendar.getTimelineEvent = function (it) {
			if (window.database.CrmVisitReport_Visit &&
				it.innerInstance instanceof
				window.database.CrmVisitReport_Visit.CrmVisitReport_Visit) {
				return window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.getTimelineEvent.call(this, it);
			}
			return getTimelineEvent.apply(this, arguments);
		};

		var selectCompanyEvent = viewModel.onSelectCompany;
		viewModel.onSelectCompany = function (company) {
			selectCompanyEvent.apply(this, arguments);
			viewModel.visit().Name(viewModel.companyName());
		};

		viewModel.visit.subscribe(function () {
			//Planned date changed
			viewModel.visit().PlannedDate.subscribe(function () {
				setTimeout(function () {
					viewModel.UpdateTimesDate();
				});
			});
			//Planned start time changed
			viewModel.visit().PlannedTime.subscribe(function () {
				setTimeout(function () {
					viewModel.UpdateTimesDate();
				});
			});
			//Planned end time changed
			viewModel.visit().PlannedEndDate.subscribe(function () {
				setTimeout(function () {
					viewModel.UpdateTimesDate();
				});
			});
			viewModel.visit().Parent.subscribe()
		});
	};

	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype = baseViewModel.prototype;
	var baseInit = baseViewModel.prototype.init;
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.init = function () {
		var viewModel = this;
		baseInit.apply(this, arguments).then(function () {
			return window.database.CrmVisitReport_Visit
				.include("Parent")
				.filter(function (it) {
					return it.ResponsibleUser === this.currentUser &&
						it.PlannedDate >= this.start &&
						it.PlannedDate <= this.end;
				},
					{
						currentUser: viewModel.calendar.currentUser(),
						start: viewModel.calendar.timelineStart(),
						end: viewModel.calendar.timelineEnd()
					})
				.take(viewModel.calendar.maxResults())
				.forEach(function (result) {
					viewModel.visits().push(result.asKoObservable());
				});
		}).then(function () {
			viewModel.visits().push(viewModel.visit());
			viewModel.calendar.filter();
		});
	};
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.getTimelineProperties = function () {
		return {
			Start: "PlannedTime",
			End: "PlannedEndDate",
			Caption: window.Helper.String.getTranslatedString("PlannedTime"),
			AllDayProperty: "PlannedTime"
		};
	};
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.getTimelineEvent = function (entity) {
		var viewModel = this;
		var timelineProperties = window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.getTimelineProperties();
		return {
			title: entity.Parent() ? entity.Parent().Name() : entity.Name(),
			start: entity[timelineProperties.Start](),
			end: entity[timelineProperties.End]() || entity[timelineProperties.Start](),
			visit: entity,
			allDay: !entity[timelineProperties.AllDayProperty](),
			url: "#/Crm.VisitReport/Visit/DetailsTemplate/" + entity.Id(),
			backgroundColor: window.Helper.Visit.getVisitAimColor(entity, viewModel.lookups.visitAim)
		};
	};
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.getEventClick = function (event) {
		if (!!event.url) {
			window.location.hash = event.url;
		}
		return false;
	};
	//Function updates date to planned date if exist
	window.Crm.VisitReport.ViewModels.VisitCreateViewModel.prototype.UpdateTimesDate = function () {
		var viewModel = this;
		if (viewModel.visit().PlannedDate()) {
			var plannedDate = viewModel.visit().PlannedDate();
			if (viewModel.visit().PlannedTime()) {
				var oldTime = viewModel.visit().PlannedTime();
				//Condition to stop infine loop
				if (plannedDate.getFullYear() != oldTime.getFullYear() || plannedDate.getMonth() != oldTime.getMonth() || plannedDate.getDate() != oldTime.getDate() ) {
					var newPlannedTime = new Date(plannedDate.getFullYear(), plannedDate.getMonth(), plannedDate.getDate(), oldTime.getHours(), oldTime.getMinutes())
					viewModel.visit().PlannedTime(newPlannedTime);
				}
			}
			if (viewModel.visit().PlannedEndDate()) {
				var oldEndTime = viewModel.visit().PlannedEndDate();
				//Condition to stop infine loop
				if (plannedDate.getFullYear() != oldEndTime.getFullYear() || plannedDate.getMonth() != oldEndTime.getMonth() || plannedDate.getDate() != oldEndTime.getDate() ) {
					var newPlannedEndTime = new Date(plannedDate.getFullYear(), plannedDate.getMonth(), plannedDate.getDate(), oldEndTime.getHours(), oldEndTime.getMinutes())
					viewModel.visit().PlannedEndDate(newPlannedEndTime);
				}
			}
		}
	};
})();
