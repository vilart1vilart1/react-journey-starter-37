<li>
	<span data-bind="text: window.Helper.Lookup.getLookupValue($parent.documentStatuses, $data.StatusKey()), style: { color: window.Helper.ErpDocument.getDocumentColor($data, $parent.documentStatuses) }"></span>
</li>
<li>
	<span data-bind="translatedText: 'T_Value'"></span>:
    <span data-bind="money: TotalWoTaxes"></span>
	<span data-bind="text: window.Helper.Lookup.getLookupValue($parent.currencies, $data.CurrencyKey())"></span>
</li>
<li>
	<span data-bind="translatedText: 'T_GrossAmount'"></span>:
    <span data-bind="money: Total"></span>
	<span data-bind="text: window.Helper.Lookup.getLookupValue($parent.currencies, $data.CurrencyKey())"></span>
</li>
<li data-bind="visible: Description">
	<span data-bind="translatedText: 'T_Description'"></span>:
	<span data-bind="text: Description"></span>
</li>