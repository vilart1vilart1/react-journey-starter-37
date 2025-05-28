<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>

<div role="tabpanel" class="tab-pane animated fadeIn active" id="tab-turnover" data-bind="with: tabs()['tab-turnover']" style="display: block;">
	<empty-state-box params="mood: 'sad', title: 'TurnoverEmptyStateTitle', text: 'TurnoverEmptyState'" data-bind="visible: !hasTurnoverStatistics()"></empty-state-box>
	<div class="listview lv-bordered" data-bind="visible: hasTurnoverStatistics">
		<div class="lv-body">
			<div class="lv-header" data-bind="translatedText: 'TurnoverStatistics'">
			</div>

			<div class="lv-item media">
				<div class="media-body">
					<flot-chart params="source: turnoverItemsQuery, 
										mapAndGroupBy: function(query) { return query; },
										color: getChartColor.bind($data), 
										label: getChartLabel.bind($data),
										unit: chartUnit,
										axisXLabel: 'Year', 
										axisYLabel: showVolume() ? 'TurnoverVolume' : 'Turnover'">
					</flot-chart>
				</div>
			</div>

			<div class="lv-header" data-bind="translatedText: 'BuyingBehavior'">
			</div>

			<div class="lv-item media">
				<div class="media-body p-l-30">
					<div class="row" data-bind="visible: totalOrders">
						<div class="col-sm-6">
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'CreateDate'"></dt>
								<dd data-bind="dateText: company().CreateDate"></dd>
							</dl>
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'FirstOrder'"></dt>
								<dd data-bind="dateText: firstOrder"></dd>
							</dl>
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'LatestOrder'"></dt>
								<dd data-bind="dateText: latestOrder"></dd>
							</dl>
						</div>
						<div class="col-sm-6">
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'TotalOrders'"></dt>
								<dd data-bind="text: totalOrders"></dd>
							</dl>
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'OrderEveryXDays'"></dt>
								<dd data-bind="text: orderEveryXDays"></dd>
							</dl>
							<dl class="dl-horizontal">
								<dt data-bind="translatedText: 'DaysSinceLastOrder'"></dt>
								<dd data-bind="text: daysSinceLastOrder"></dd>
							</dl>
						</div>
					</div>
					<div class="row" data-bind="visible: !totalOrders()">
						<div class="col-sm-12" data-bind="translatedText: 'BuyingBehaviorEmptyState'">
						</div>
					</div>
				</div>
			</div>
			
			<div class="lv-header">
				<span data-bind="translatedText: 'TotalTurnoverValue', visible: !showVolume()"></span>
				<span data-bind="translatedText: 'TotalTurnoverVolume', visible: showVolume()"></span>
			</div>
			<div class="lv-item media">
				<table class="table">
					<tr class="bgm-bluegray c-white">
						<th class="text-right"><span data-bind="translatedText: 'Difference'"></span></th>
						<th class="text-right"><span data-bind="text: moment().year()"></span></th>
						<th class="text-right"><span data-bind="translatedText: 'Prediction'"></span> <span data-bind="text: moment().year()"></span></th>
						<th class="text-right"><span data-bind="text: moment().year()-1"></span></th>
						<th class="text-right"><span data-bind="text: moment().year()-2"></span></th>
						<th class="text-right"><span data-bind="text: moment().year()-3"></span></th>
					</tr>
					<tr class="text-right">
						<!-- ko if: totalSummary() -->
						<td>
							<span data-bind="attr: { class: totalSummary().Difference < 0 ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-success' }">
								<span data-bind="money: totalSummary().Difference"></span>
							</span>
						</td>
						<td><span data-bind="money: totalSummary().TotalCurrentYear"></span></td>
						<td><span data-bind="money: totalSummary().ExtrapolatedTotalCurrentYear"></span></td>
						<td><span data-bind="money: totalSummary().TotalPreviousYear"></span></td>
						<td><span data-bind="money: totalSummary().TotalPrePreviousYear"></span></td>
						<td><span data-bind="money: totalSummary().TotalMinusThreeYears"></span></td>
						<!-- /ko -->
						<!-- ko ifnot: totalSummary() -->
						<td><span>0</span></td>
						<td><span>0</span></td>
						<td><span>0</span></td>
						<td><span>0</span></td>
						<td><span>0</span></td>
						<!-- /ko -->
					</tr>
				</table>
			</div>

			<div class="lv-header">
				<span data-bind="translatedText: 'TurnoverValue', visible: !showVolume()"></span>
				<span data-bind="translatedText: 'TurnoverVolume', visible: showVolume()"></span>
			</div>
			<div class="lv-item media">
				<div class="panel-group m-b-5" id="turnover-articlegroup-accordion-0" data-bind="attr: { id: 'turnover-articlegroup-accordion-0' }" role="tablist" aria-multiselectable="true">
					<!-- ko with: groupedTurnoverItems -->
					<!-- ko template: { name: 'turnoverArticleGroup', foreach: ArticleGroups } -->
					<!-- /ko -->
					<!-- /ko -->
				</div>
			</div>

			<script type="text/html" id="turnoverArticleGroup">
				<div class="panel panel-collapse">
					<div class="panel-heading" role="tab" data-bind="visible: $parent.Id !== 0 || $parent.HasArticleGroups">
						<h4 class="panel-title">
							<span class="row">
								<span class="col-sm-12">
									<span data-bind="text: Key, visible: Key"></span>
									<span data-bind="translatedText: 'Miscellaneous', visible: !Key"></span>
								</span>
								<span class="row">
									<span class="col-sm-1">
										<!-- ko if: ExtrapolatedCurrentYearValue() && PreviousYearValue() -->
										<span data-bind="attr: { class: ExtrapolatedCurrentYearValue() - PreviousYearValue().total < 0 ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-success' }">
											<span data-bind="money: ExtrapolatedCurrentYearValue() - PreviousYearValue().total"></span>
										</span>
										<!-- /ko -->
										<!-- ko if: !CurrentYearValue() && PreviousYearValue() -->
										<span class="btn btn-xs btn-danger">
											<span data-bind="money: 0 - PreviousYearValue().total"></span>
										</span>
										<!-- /ko -->
										<!-- ko if: ExtrapolatedCurrentYearValue() && !PreviousYearValue() -->
										<span class="btn btn-xs btn-success">
											<span data-bind="money: ExtrapolatedCurrentYearValue()"></span>
										</span>
										<!-- /ko -->
										<!-- ko if: !ExtrapolatedCurrentYearValue() && !PreviousYearValue() -->
										<span class="btn btn-xs btn-success">
											<span data-bind="money: 0"></span>
										</span>
										<!-- /ko -->
									</span>
									<span class="col-sm-2 text-right">
										<span data-bind="text: moment().year()"></span>
										<br />
										<small>
											<!-- ko if: CurrentYearValue() -->
											<span data-bind="money: CurrentYearValue().total"></span>
											<!-- /ko -->
											<!-- ko ifnot: CurrentYearValue() -->
											<span data-bind="money: 0"></span>
											<!-- /ko -->
										</small>
									</span>
									<span class="col-sm-3 text-right">
										<span data-bind="translatedText: 'Prediction'"></span> <span data-bind="text: moment().year()"></span>
										<br />
										<small>
											<!-- ko if: ExtrapolatedCurrentYearValue() -->
											<span data-bind="money: ExtrapolatedCurrentYearValue()"></span>
											<!-- /ko -->
											<!-- ko ifnot: ExtrapolatedCurrentYearValue() -->
											<span data-bind="money: 0"></span>
											<!-- /ko -->
										</small>
									</span>
									<span class="col-sm-2 text-right">
										<span data-bind="text: moment().year()-1"></span>
										<br />
										<small>
											<!-- ko if: PreviousYearValue() -->
											<span data-bind="money: PreviousYearValue().total"></span>
											<!-- /ko -->
											<!-- ko ifnot: PreviousYearValue() -->
											<span data-bind="money: 0"></span>
											<!-- /ko -->
										</small>
									</span>
									<span class="col-sm-2 text-right">
										<span data-bind="text: moment().year()-2"></span>
										<br />
										<small>
											<!-- ko if: PrePreviousYearValue() -->
											<span data-bind="money: PrePreviousYearValue().total"></span>
											<!-- /ko -->
											<!-- ko ifnot: PrePreviousYearValue() -->
											<span data-bind="money: 0"></span>
											<!-- /ko -->
										</small>
									</span>
									<span class="col-sm-2 text-right">
										<span data-bind="text: moment().year()-3"></span>
										<br />
										<small>
											<!-- ko if: ThreeYearsAgoValue() -->
											<span data-bind="money: ThreeYearsAgoValue().total"></span>
											<!-- /ko -->
											<!-- ko ifnot: ThreeYearsAgoValue() -->
											<span data-bind="money: 0"></span>
											<!-- /ko -->
										</small>
									</span>
								</span>
							</span>
						</h4>
					</div>
					<div class="panel-collapse" data-bind="attr: { id: 'collapse-' + Id }, css: { 'collapse': !Visible() }" aria-expanded="false">
						<!-- ko if: Visible -->
						<!-- ko if: HasArticleGroups -->
						<!-- ko template: { name: 'turnoverArticleGroup', foreach: ArticleGroups } -->
						<!-- /ko -->
						<!-- /ko -->
						<!-- ko ifnot: HasArticleGroups -->
						<!-- ko foreach: Items -->
						<div class="lv-item media">
							<div class="lv-avatar pull-left bgm-green" data-bind="visible: Trend === 'up'">
								<i class="zmdi zmdi-hc-lg zmdi-trending-up"></i>
							</div>
							<div class="lv-avatar pull-left bgm-bluegray" data-bind="visible: Trend === 'flat'">
								<i class="zmdi zmdi-hc-lg zmdi-trending-flat"></i>
							</div>
							<div class="lv-avatar pull-left bgm-deeporange" data-bind="visible: Trend === 'down'">
								<i class="zmdi zmdi-hc-lg zmdi-trending-down"></i>
							</div>
							<div class="media-body">
								<div class="lv-title col-md-6 p-b-25">
									<span data-bind="text: Item.ItemNo"></span>
									-
									<span data-bind="text: Item.ItemDescription"></span>
								</div>
								<div class="col-md-6">
									<dl class="dl-horizontal">
										<dt data-bind="translatedText: 'ThisYear'"></dt>
										<dd class="m-b-5">
											<span data-bind="money: CurrentYearValue"></span><span data-bind="text: Unit"></span>
										</dd>
										<dt data-bind="dateText: { value: PreviousYear, pattern: { raw: 'MMMM YYYY' } }"></dt>
										<dd class="m-b-5">
											<span data-bind="money: PreviousYearCurrentMonth"></span><span data-bind="text: Unit"></span>
										</dd>
										<dt data-bind="dateText: { value: PreviousYear, pattern: { skeleton: 'y' } }"></dt>
										<dd class="m-b-5">
											<span data-bind="money: PreviousYearValue"></span><span data-bind="text: Unit"></span>
										</dd>
										<!-- ko foreach: AdditionalYears -->
										<dt data-bind="text: Year"></dt>
										<dd class="m-b-5">
											<span data-bind="money: Value"></span><span data-bind="text: $parent.Unit"></span>
										</dd>
										<!-- /ko -->
									</dl>
								</div>
							</div>
						</div>
						<!-- /ko -->
						<!-- /ko -->
						<!-- /ko -->
					</div>
				</div>
			</script>

			<div class="load-more m-b-20">
				<button class="bgm-white c-black z-depth-1 btn btn-default waves-effect" data-bind="click: showAllTurnoverItems.bind($data, true), visible: !showAllTurnoverItems()">
					<i class="zmdi zmdi-view-list-alt"></i>
					<span data-bind="translatedText: 'ShowPreviousYears'"></span>
				</button>
			</div>
		</div>
	</div>
</div>
