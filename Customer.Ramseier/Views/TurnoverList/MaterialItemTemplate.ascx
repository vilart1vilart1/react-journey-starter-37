<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl<Crm.ViewModels.CrmModel>" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>

<div class="lv-item media">
	<div class="lv-avatar bgm-bluegray pull-left" data-bind="text: IsVolume() ? 'A' : 'U'"></div>
	<div class="media-body">
		<div class="row">
			<div class="col-sm-4">
				<div class="lv-title">
					<a data-bind="attr: { href: '#/Main/Company/DetailsTemplate/' + ContactKey() }">
						<span data-bind="text: ContactName()"></span>
					</a>
				</div>
				<div>
					<small class="small">
						<span data-bind="attr: { class: Difference() < 0 ? 'btn btn-xs btn-danger' : 'btn btn-xs btn-success' }">
							<span data-bind="money: Difference()"></span>
							<!-- ko if: !IsVolume() -->
								<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
							<!-- /ko -->
							<!-- ko if: IsVolume() -->
								<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
							<!-- /ko -->
						</span>
					</small>
				</div>
			</div>
			<hr class="visible-xs">
			<div class="col-sm-8 table-responsive">
				<table class="w-100">
					<tbody>
						<tr>
							<th class="text-right col-sm-3" data-bind="text: new Date().getFullYear()"></th>
							<th class="text-right col-sm-3">
								<span data-bind="translatedText: 'Prediction'"></span> <span data-bind="text: new Date().getFullYear()"></span>
							</th>
							<th class="text-right col-sm-2" data-bind="text: new Date().getFullYear()-1"></th>
							<th class="text-right col-sm-2" data-bind="text: new Date().getFullYear()-2"></th>
							<th class="text-right col-sm-2" data-bind="text: new Date().getFullYear()-3"></th>
						</tr>
						<tr class="text-right">
							<td class="col-sm-3 p-0">
								<span data-bind="money: TotalCurrentYear()"></span>
								<!-- ko if: !IsVolume() -->
									<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
								<!-- /ko -->
								<!-- ko if: IsVolume() -->
									<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
								<!-- /ko -->
							</td>
							<td class="col-sm-3 p-0">
								<span data-bind="money: ExtrapolatedTotalCurrentYear()"></span>
								<!-- ko if: !IsVolume() -->
								<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
								<!-- /ko -->
								<!-- ko if: IsVolume() -->
								<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
								<!-- /ko -->
							</td>
							<td class="col-sm-2 p-0">
								<span data-bind="money: TotalPreviousYear()"></span>
								<!-- ko if: !IsVolume() -->
									<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
								<!-- /ko -->
								<!-- ko if: IsVolume() -->
									<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
								<!-- /ko -->
							</td>
							<td class="col-sm-2 p-0">
								<span data-bind="money: TotalPrePreviousYear()"></span>
								<!-- ko if: !IsVolume() -->
									<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
								<!-- /ko -->
								<!-- ko if: IsVolume() -->
									<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
								<!-- /ko -->
							</td>
							<td class="col-sm-2 p-0">
								<span data-bind="money: TotalMinusThreeYears()"></span>
								<!-- ko if: !IsVolume() -->
									<span data-bind="lookupValue: CurrencyKey, lookups: $parent.lookups.currency"></span>
								<!-- /ko -->
								<!-- ko if: IsVolume() -->
									<span data-bind="lookupValue: QuantityUnitKey, lookups: $parent.lookups.quantityUnit"></span>
								<!-- /ko -->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
