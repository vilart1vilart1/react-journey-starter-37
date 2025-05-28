namespace("Customer.Ramseier.ViewModels").TurnoverArticleGroupListIndexViewModel = function () {
	const viewModel = this;
	viewModel.operator = window.ko.observable(null);
	viewModel.lookups = {
		currency: { $tableName: "Main_Currency" },
		quantityUnit: { $tableName: "CrmArticle_QuantityUnit" },
		articleGroups: { $tableName: "CrmArticle_ArticleGroup01" }
	};
	window.Main.ViewModels.GenericListViewModel.call(this, "CustomerRamseier_TurnoverArticleGroup", ["ContactName"], ["ASC", "ASC"], ["Company"]);
	const turnoverValueBookmark = {
		Category: window.Helper.String.getTranslatedString("Bookmark"),
		Name: window.Helper.String.getTranslatedString("TurnoverValue"),
		Key: "TurnoverValue",
		Expression: function (query) {
			return query.filter(function (it) { return !it.IsVolume; });
		}
	};
	viewModel.bookmarks.push(turnoverValueBookmark);
	viewModel.bookmark(turnoverValueBookmark);
	viewModel.bookmarks.push({
		Category: window.Helper.String.getTranslatedString("Bookmark"),
		Name: window.Helper.String.getTranslatedString("QuantityValue"),
		Key: "QuantityValue",
		Expression: function (query) {
			return query.filter(function (it) { return it.IsVolume; });
		}
	});
};

namespace("Customer.Ramseier.ViewModels").TurnoverArticleGroupListIndexViewModel.prototype = Object.create(window.Main.ViewModels.GenericListViewModel.prototype);

namespace("Customer.Ramseier.ViewModels").TurnoverArticleGroupListIndexViewModel.prototype.init = function () {
	var viewModel = this;
	return window.Helper.User.getCurrentUser()
		.pipe(function (user) {
			viewModel.currentUser(user);
		}).then(function () {
			return window.Helper.Lookup.getLocalizedArrayMaps(viewModel.lookups);
		})
		.then(function () {
			return window.Main.ViewModels.GenericListViewModel.prototype.init.apply(viewModel, arguments);
		});
};

namespace("Customer.Ramseier.ViewModels").TurnoverArticleGroupListIndexViewModel.prototype.applyFilters = function (query) {
	var viewModel = this;
	const operators = ['<', '>', '<=', '>=', '='];

	for (var filterName in viewModel.filters) {
		if (filterName == "Difference") {
			if (viewModel.filters["Difference"]() != null) {
				var differenceFilter = viewModel.filters["Difference"]();
				if (operators.includes(differenceFilter.Value.charAt(0) + differenceFilter.Value.charAt(1))) {
					viewModel.operator(differenceFilter.Value.charAt(0) + differenceFilter.Value.charAt(1));
				}
				else if (operators.includes(differenceFilter.Value.charAt(0)) && !(operators.includes(differenceFilter.Value.charAt(1)))) {
					viewModel.operator(differenceFilter.Value.charAt(0));
				}

				if (viewModel.operator() == null && !differenceFilter.Value.includes('<') && !differenceFilter.Value.includes('>') && !differenceFilter.Value.includes('=')) {
					query = query.filter(function (i) {
						return (i.Difference == this.difference)
					}, { difference: parseFloat(differenceFilter) });
				}
				if (viewModel.operator() != null) {
					var valNumber = parseFloat(differenceFilter.Value.substring(viewModel.operator().length));
					switch (viewModel.operator()) {

						case '<':
							query = query.filter(function (i) {
								return (i.Difference < this.val)
							}, { val: valNumber });
							break;
						case '>':
							query = query.filter(function (i) {
								return (i.Difference > this.val)
							}, { val: valNumber });
							break;
						case '>=':
							query = query.filter(function (i) {
								return (i.Difference >= this.val)
							}, { val: valNumber });
							break;
						case '<=':
							query = query.filter(function (i) {
								return (i.Difference <= this.val)
							}, { val: valNumber });
							break;
						case '=':
							query = query.filter(function (i) {
								return (i.Difference == this.val)
							}, { val: valNumber });
							break;
						default:
							return query;
					}
				}
			}
		} else if (filterName == "Company.StandardAddress.ZipCode") {
			if (viewModel.filters["Company.StandardAddress.ZipCode"]() != null) {
				var zipCodeFilter = viewModel.filters["Company.StandardAddress.ZipCode"]();
				query = query.filter("it.Company.StandardAddress.ZipCode.startsWith(this.zipCode)",
					{ zipCode: zipCodeFilter.Value });
			}
		}
		else if (viewModel.filters.hasOwnProperty(filterName)) {
			var filterValues = window.ko.unwrap(viewModel.filters[filterName]);
			filterValues = $.isArray(filterValues) ? filterValues : [filterValues];
			for (var i = 0; i < filterValues.length; i++) {
				var filterValue = filterValues[i];
				if (filterValue === undefined || filterValue === null || filterValue.Operator === null || (filterValue.Operator === null && filterValue.Value === null)) {
					continue;
				}
				query = viewModel.applyFilter(query, filterValue, filterName);
			}
		}
	}
	if (viewModel.timelineProperty() !== null && viewModel.timelineStart() != null && viewModel.timelineEnd() != null && viewModel.viewMode().Key === "Calendar") {
		query = query.filter("it." + viewModel.timelineProperty().Start + " != null && (it." + viewModel.timelineProperty().End + " != null && it." + viewModel.timelineProperty().End + " >= this.dateStart || it." + viewModel.timelineProperty().Start + " >= this.dateStart) && it." + viewModel.timelineProperty().Start + " <= this.dateEnd", { dateStart: viewModel.timelineStart(), dateEnd: viewModel.timelineEnd() });
	}
	return query;
};

