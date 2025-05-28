(function (Helper, $) {
	function configureWebSqlGroupedTurnoverByArticleGroup01() {
		if (!window.database.CrmErpExtension_ErpTurnover) {
			return;
		}
		if (window.database.GroupedTurnoverByArticleGroup01) {
			throw "GroupedTurnoverByArticleGroup01 must be undefined at this point";
		}
		window.database.GroupedTurnoverByArticleGroup01 = function (companyKey, showVolume, currencyKey, quantityUnitKey, year) {
			return window.database.CrmErpExtension_ErpTurnover
				.filter(function (it) {
					return it.ContactKey === this.contactKey &&
						it.Total > 0 &&
						it.IsVolume === this.isVolume &&
						it.CurrencyKey === this.currencyKey &&
						it.QuantityUnitKey === this.quantityUnitKey &&
						it.Year >= this.year;
				},
					{
						contactKey: companyKey,
						isVolume: showVolume,
						currencyKey: currencyKey,
						quantityUnitKey: quantityUnitKey,
						year: year
					})
				.map(function (it) {
					return {
						articleGroupKey: it.ArticleGroup01Key,
						year: it.Year,
						total: it.Total.sum()
					};
				})
				.groupBy("it.ArticleGroup01Key")
				.groupBy("it.Year");
		};
	};
	document.addEventListener("DatabaseInitialized", function() {
		if (window.database.storageProvider.name === "webSql") {
			configureWebSqlGroupedTurnoverByArticleGroup01();
		}
	});
})((window.Helper = window.Helper || {}), jQuery);