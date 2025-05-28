(function () {
	var baseViewModel = window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel;

	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel = function () {
		baseViewModel.apply(this, arguments);
		var viewModel = this;

		viewModel.turnoverAdditionalYears = window.ko.pureComputed(function () {
			var turnoverYears = new Array(window.moment().year() - 2, window.moment().year() - 3);
			return turnoverYears;
		});
		viewModel.totalSummary = window.ko.observable(null);
		viewModel.groupedTotalByArticleGroup01 = window.ko.observableArray([]);

		var currentMonth = new Date().getMonth() + 1;
		var currentYear = new Date();
		var previousYear = window.moment().add(-1, "year").toDate();
		viewModel.groupedTurnoverItems = window.ko.pureComputed(function () {
			var id = 0;

			function getGroupedTurnoverItems(articleGroupLevel, key, items, parent) {
				items = window.ko.isObservable(items) ? items : window.ko.observableArray(items);
				var articleGroup = viewModel.lookups["articleGroups" + ("00" + articleGroupLevel).slice(-2)];
				var articleGroupKeyProperty = "ArticleGroup" + ("00" + articleGroupLevel).slice(-2) + "Key";
				var articleGroupKeys = items.distinct(articleGroupKeyProperty).indexKeys[articleGroupKeyProperty]()
					.sort(function (a, b) {
						if (!a) {
							return 1;
						}
						if (!b) {
							return -1;
						}
						return articleGroup.$array.indexOf(articleGroup[a]) - articleGroup.$array.indexOf(articleGroup[b]);
					});
				var parentArticleGroup = articleGroupLevel > 1
					? viewModel.lookups["articleGroups" + ("00" + (articleGroupLevel - 1)).slice(-2)][key]
					: null;
				var groupedTurnoverItems = {};
				groupedTurnoverItems.Id = id++;
				groupedTurnoverItems.Level = articleGroupLevel;
				groupedTurnoverItems.Key = parentArticleGroup ? parentArticleGroup.Value : key;
				groupedTurnoverItems.Items = window.ko.pureComputed(function () {
					var itemsWithoutArticleGroup = window.ko.observableArray(items.index[articleGroupKeyProperty]()[""] || [])
						.distinct("ItemNo");
					var itemNos = itemsWithoutArticleGroup.indexKeys.ItemNo().sort();
					return window.ko.utils.arrayMap(itemNos,
						function (itemNo) {
							var item = window.ko.observableArray(itemsWithoutArticleGroup.index.ItemNo()[itemNo]).distinct("Year");

							function getTotal(year) {
								year = year ? year.toString() : year;
								if (item.index.Year()[year]) {
									return item.index.Year()[year][0].Total();
								}
								return 0;
							};

							var previousYearCurrentMonth = 0;
							var previousYearItem = item.index.Year()[previousYear.getFullYear().toString()];
							if (previousYearItem) {
								for (var i = 1; i < currentMonth; i++) {
									previousYearCurrentMonth += previousYearItem[0]["Month" + i.toString()]() || 0;
								}
							}
							var currentYearTotal = getTotal(currentYear.getFullYear());
							var trend = "flat";
							if (currentYearTotal * 1.05 > previousYearCurrentMonth) {
								trend = "up";
							} else if (currentYearTotal * 0.95 < previousYearCurrentMonth) {
								trend = "down";
							}
							var unit = viewModel.showVolume() ? viewModel.quantityUnit() : viewModel.currency();
							return {
								Item: item()[0],
								Trend: trend,
								CurrentYear: currentYear,
								CurrentYearValue: currentYearTotal,
								PreviousYearCurrentMonth: previousYearCurrentMonth,
								PreviousYear: previousYear,
								PreviousYearValue: getTotal(previousYear.getFullYear()),
								AdditionalYears: viewModel.turnoverAdditionalYears().map(function (year) {
									return {
										Year: year,
										Value: getTotal(year)
									};
								}),
								Unit: unit ? unit.Value : null
							};
						});
				});
				groupedTurnoverItems.HasArticleGroups = window._.without(articleGroupKeys, "").length > 0;
				groupedTurnoverItems.Visible = window.ko.observable(parent && parent.Id === 0 && !parent.HasArticleGroups);

				groupedTurnoverItems.CurrentYearValue = window.ko.computed(function () {
					return viewModel.groupedTotalByArticleGroup01().find(
						function (entry) {
							return entry.articleGroupKey === key && entry.year === new Date().getFullYear();
						});
				});
				groupedTurnoverItems.ExtrapolatedCurrentYearValue = window.ko.computed(function () {
					if (groupedTurnoverItems.CurrentYearValue()) {
						// Get the current date and calculate days passed and total days in year
						var now = new Date();
						var startOfYear = new Date(now.getFullYear(), 0, 1);
						var daysPassed = Math.floor((now - startOfYear) / (24 * 60 * 60 * 1000)) + 1;
						var daysInYear = now.getFullYear() % 4 === 0 ? 366 : 365;

						// Calculate extrapolation based on days instead of months
						return groupedTurnoverItems.CurrentYearValue().total / daysPassed * daysInYear;
					}
					return 0;
				});
				groupedTurnoverItems.PreviousYearValue = window.ko.computed(function () {
					return viewModel.groupedTotalByArticleGroup01().find(
						function (entry) {
							return entry.articleGroupKey === key && entry.year === new Date().getFullYear() - 1;
						});
				});
				groupedTurnoverItems.PrePreviousYearValue = window.ko.computed(function () {
					return viewModel.groupedTotalByArticleGroup01().find(
						function (entry) {
							return entry.articleGroupKey === key && entry.year === new Date().getFullYear() - 2;
						});
				});
				groupedTurnoverItems.ThreeYearsAgoValue = window.ko.computed(function () {
					return viewModel.groupedTotalByArticleGroup01().find(
						function (entry) {
							return entry.articleGroupKey === key && entry.year === new Date().getFullYear() - 3;
						});
				});

				groupedTurnoverItems.ArticleGroups = window.ko.pureComputed(function () {
					return window.ko.utils.arrayMap(articleGroupKeys,
						function (articleGroupKey) {
							return getGroupedTurnoverItems(articleGroupLevel + 1, articleGroupKey, items.index[articleGroupKeyProperty]()[articleGroupKey], groupedTurnoverItems);
						});
				});
				return groupedTurnoverItems;
			};

			return getGroupedTurnoverItems(1, null, viewModel.turnoverItems, null);
		});
	};

	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel.prototype = baseViewModel.prototype;

	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel.prototype.initTotalSummary = function () {
		var viewModel = this;
		return window.database.CustomerRamseier_Turnover
			.filter(function(x) { return x.ContactKey === this.contactKey && x.IsVolume === this.isVolume; },
				{
					contactKey: viewModel.companyId(),
					isVolume: viewModel.showVolume()
				})
			.map(function(m) {
				return {
					TotalCurrentYear: m.TotalCurrentYear,
					ExtrapolatedTotalCurrentYear: m.ExtrapolatedTotalCurrentYear,
					TotalPreviousYear: m.TotalPreviousYear,
					TotalPrePreviousYear: m.TotalPrePreviousYear,
					TotalMinusThreeYears: m.TotalMinusThreeYears,
					Difference: m.Difference
				}
			})
			.single()
			.then(function(result) {
				viewModel.totalSummary(result);
			});
	}

	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel.prototype.loadTurnoverGroupedByArticleGroup01 = function() {
		var viewModel = this;
		var currencyKey = viewModel.showVolume() || !viewModel.currency() ? null : viewModel.currency().Key;
		var quantityUnitKey = viewModel.showVolume() && viewModel.quantityUnit() ? viewModel.quantityUnit().Key : null;
		var companyKey = viewModel.companyId();
		var showVolume = viewModel.showVolume();
		var year = new Date().getFullYear() - 3;
		
		return window.database.GroupedTurnoverByArticleGroup01(companyKey, showVolume, currencyKey, quantityUnitKey, year)
			.toArray()
			.then(function(result) {
				viewModel.groupedTotalByArticleGroup01(result);
			});
	}

	var baseInit = baseViewModel.prototype.init;

	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel.prototype.init = function() {
		var viewModel = this;

		return baseInit.apply(this, arguments).then(function() {
			viewModel.initTotalSummary();
			viewModel.loadTurnoverGroupedByArticleGroup01();
		});
	};
	window.Main.ViewModels.CompanyDetailsTurnoverTabViewModel.prototype.getTurnoverItemsQuery = function (queryForChart) {
		var viewModel = this;
		var currencyKey = viewModel.showVolume() || !viewModel.currency() ? null : viewModel.currency().Key;
		var quantityUnitKey = viewModel.showVolume() && viewModel.quantityUnit() ? viewModel.quantityUnit().Key : null;
		var query = window.database.CrmErpExtension_ErpTurnover
			.filter(function (x) {
				return x.ContactKey === this.contactKey &&
					x.Total > 0 &&
					x.IsVolume === this.isVolume &&
					x.CurrencyKey === this.currencyKey &&
					x.QuantityUnitKey === this.quantityUnitKey;
			},
				{
					contactKey: viewModel.companyId(),
					isVolume: viewModel.showVolume(),
					currencyKey: currencyKey,
					quantityUnitKey: quantityUnitKey
				});
		if (queryForChart) {
			return window.database.CustomTurnoverPerArticleGroup01AndYear(viewModel.companyId(), viewModel.showVolume(), currencyKey, quantityUnitKey, query);
		}
		return query;
	};
})();