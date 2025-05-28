<%@ Control Language="C#" Inherits="Crm.Library.Modularization.CrmViewUserControl" %>
<%@ Import Namespace="Crm.Library.Globalization.Extensions" %>
<%@ Import Namespace="Crm.Library.Modularization.Extensions" %>

<div role="tabpanel" class="tab-pane animated fadeIn" id="tab-details">
	<pmb-block params="icon: 'equalizer', caption: 'BackgroundInfo', context: { company: company }, condition: window.AuthorizationManager.isAuthorizedForAction('Company', 'Edit')">
		<pmbb-view>
			<!-- ko with: company -->
			<span data-bind="text: BackgroundInfo" class="pre-line"></span>
			<span data-bind="translatedText: 'BackgroundInformationEmptyState', ifnot: BackgroundInfo"></span>
			<!-- /ko -->
		</pmbb-view>
		<pmbb-edit>
			<!-- ko with: company -->
			<div class="fg-line">
				<textarea class="form-control" rows="5" placeholder="<%= Html.Localize("BackgroundInfo") %>..." data-bind="value: BackgroundInfo"></textarea>
			</div>
			<!-- /ko -->
		</pmbb-edit>
	</pmb-block>
    <pmb-block params="icon: 'notifications', caption: 'Status', context: { companyStatus: companyStatus }, condition: window.AuthorizationManager.isAuthorizedForAction('Company', 'Edit') && companyStatus() !=null">
        <pmbb-view>
            <div class="pmbb-header">
                <!-- ko if: !companyStatus() -->
                <ul class="actions">
                    <li class="dropdown">
                        <a data-toggle="dropdown" href="#">
                            <i class="zmdi zmdi-more-vert"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-right">
                            <li class="add-bravo" >
                                <a href="#" data-route="Customer.Ramseier/Status/EditTemplate"data-toggle="modal" data-target="#modal">
                                    <%= Html.Localize("Add") %>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
                <span data-bind="translatedText: 'ContactStatusUndefinedState'"></span>
                <!-- /ko -->
            </div>
            <div class="pmbb-body p-l-30">
            <!-- ko with: companyStatus -->
            <div class="bravo-entry">
                <div style="font-weight: bold;">
                    <span data-bind="text: LegacyId"></span> -
                    <span data-bind="text: Description"></span>
                </div>
                <span data-bind="text: Comment" class="pre-line"></span>
            </div>
            <!-- /ko -->
            </div>
        </pmbb-view>
        <pmbb-edit>
            <!-- ko with: companyStatus -->
            <pmbb-edit-entry params="caption: 'Comment', validationElement: Comment">
                <input type="text" class="form-control" data-bind="value: Comment">
            </pmbb-edit-entry>
            <!-- /ko -->
        </pmbb-edit>
    </pmb-block>

	<pmb-block params="icon: 'trending-up', caption: 'Needs', context: { company: company }, condition: window.AuthorizationManager.isAuthorizedForAction('Company', 'Edit')">
		<pmbb-view>
			<!-- ko with: company -->
			<span data-bind="text: ExtensionValues().Needs" class="pre-line"></span>
			<span data-bind="translatedText: 'NeedsEmptyState', ifnot: ExtensionValues().Needs"></span>
		
			<!-- /ko -->
		</pmbb-view>
		<pmbb-edit>
			<!-- ko with: company -->
			<div class="fg-line">
				<textarea class="form-control" rows="5" placeholder="<%= Html.Localize("Needs") %>..." data-bind="value:ExtensionValues().Needs"></textarea>
			</div>
			<!-- /ko -->
		</pmbb-edit>
	</pmb-block>

	<pmb-block class="general" params="icon: 'account', caption: 'General', context: { company: company }, onInit: $root.resetEditSubsidiaries.bind($root), onBeforeSave: $root.onSavePmbBlock.bind($root), onAfterSave: $root.onAfterSavePmbBlock.bind($root), onCancel: $root.resetEditSubsidiaries.bind($root), condition: window.AuthorizationManager.isAuthorizedForAction('Company', 'Edit')">
		<pmbb-view>
			<!-- ko with: company -->
			<pmbb-view-entry params="caption: 'Name'">
				<span data-bind="text: Name"></span>
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: Name"></span>
			</pmbb-view-entry>
			<pmbb-view-entry params="caption: 'CompanyType'">
				<span data-bind="if: CompanyTypeKey, lookupValue: CompanyTypeKey, lookups: $root.lookups.companyTypes"></span>
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyTypeKey"></span>
			</pmbb-view-entry>
			<pmbb-view-entry params="caption: 'ResponsibleUser'">
				<span data-bind="userDisplayName: { UserName: $root.company().ResponsibleUser, Users: $root.users }"></span>
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: $root.responsibleUser"></span>
			</pmbb-view-entry>
			<pmbb-view-entry params="caption: 'AreaSalesManager'">
				<span data-bind="userDisplayName: { UserName: $root.company().AreaSalesManager, Users: $root.users }"></span>
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: $root.company().AreaSalesManager()"></span>
			</pmbb-view-entry>
			<!-- ko if: ParentCompany -->
			<pmbb-view-entry params="caption: 'ParentCompany'">
				<!-- ko with: ParentCompany -->
				<a href="#" data-bind="attr: { href: '#/Main/Company/DetailsTemplate/' + Id() }">
					<span data-bind="text: Helper.Company.getDisplayName($data)"></span>
				</a>
				<!-- /ko -->
			</pmbb-view-entry>
			<!-- /ko -->
			<!-- ko if: $root.subsidiaries().length -->
			<pmbb-view-entry params="caption: 'Subsidiaries'">
				<!-- ko foreach: $root.subsidiaries -->
				<div>
					<a href="#" data-bind="attr: { href: '#/Main/Company/DetailsTemplate/' + Id() }">
						<span data-bind="text: Helper.Company.getDisplayName($data)"></span>
					</a>
				</div>
				<!-- /ko -->
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: $root.subsidiaries().length"></span>
			</pmbb-view-entry>
			<!-- /ko -->
			<pmbb-view-entry params="caption: 'SourceTypeKey'">
				<span data-bind="if: SourceTypeKey, lookupValue: SourceTypeKey, lookups: $root.lookups.sourceTypes"></span>
				<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: SourceTypeKey"></span>
			</pmbb-view-entry>
			<% Html.PluginRenderActions("CompanyDetailsContactSourceView"); %>
			<!-- /ko -->
		</pmbb-view>
		<pmbb-edit>
			<!-- ko with: company -->
			<pmbb-edit-entry params="caption: 'Name', validationElement: Name">
				<input type="text" class="form-control" data-bind="value: Name">
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'CompanyType', validationElement: CompanyTypeKey">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyTypeKey, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyType')}">
				</select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'ResponsibleUser', validationElement: ResponsibleUser">
				<select class="form-control" data-bind="select2autocompleter: { data: ResponsibleUser, autocompleteOptions: { orderBy: ['LastName'], table: 'Main_User', mapDisplayObject: Helper.User.mapForSelect2Display, customFilter: Helper.User.filterUserQuery } }">
				</select>
			</pmbb-edit-entry>
			<pmbb-edit-entry id="AreaSalesManager" params="caption: 'AreaSalesManager', validationElement: AreaSalesManager">
				<select class="form-control" data-bind="select2autocompleter: { data: AreaSalesManager, autocompleteOptions: { orderBy: ['LastName'], table: 'Main_User', mapDisplayObject: Helper.User.mapForSelect2Display, customFilter: Helper.User.filterUserQuery } }">
				</select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'ParentCompany', validationElement: ParentId">
				<select name="ParentCompany" class="form-control" data-bind="select2autocompleter: { data: ParentId, autocompleteOptions: { table: 'Main_Company', orderBy: ['Name'], joins: Helper.Company.getAutocompleteJoins(), customFilter: Helper.Company.getSelect2Filter, mapDisplayObject: Helper.Company.mapDisplayNameWithAddressForSelect2, onSelect: ParentCompany, key: 'Id', confirmChange: $root.onConfirmParentCompany.bind($root) } }" >
				</select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'AddSubsidiary'">
				<select name="AddSubsidiary" class="form-control" data-bind="select2autocompleter: { data: $root.subsidiary, autocompleteOptions: { table: 'Main_Company', orderBy: ['Name'], joins: Helper.Company.getAutocompleteJoins(), customFilter: $root.subsidiaryFilter.bind($root), mapDisplayObject: Helper.Company.mapDisplayNameWithAddressForSelect2, confirmChange: $root.onConfirmSubsidiary.bind($root), onSelect: $root.onSubsidiarySelect.bind($root) } }" >
				</select>
			</pmbb-edit-entry>
			<dl class="dl-horizontal" data-bind="if: $root.editSubsidiaries().length">
				<dt class="p-t-10"><%= Html.Localize("Subsidiaries") %></dt>
				<dd data-bind="foreach: $root.editSubsidiaries">
					<div class="input-group">
						<div class="form-control">
							<div class="m-t-10" data-bind="text: Name"></div>
						</div>
						<span class="input-group-addon last">
							<a href="#" class="btn btn-danger waves-effect" data-bind="click: $root.editSubsidiaries.remove.bind($root.editSubsidiaries)">
								<i class="zmdi zmdi-delete"></i>
							</a>
						</span>
					</div>
				</dd>
			</dl>
			<pmbb-edit-entry params="caption: 'SourceTypeKey', validationElement: SourceTypeKey">
				<select class="form-control" data-bind="select2autocompleter: { data: SourceTypeKey, autocompleteOptions: { customFilter: Helper.Lookup.queryLookup, table: 'Main_SourceType', mapDisplayObject: Helper.Lookup.mapLookupForSelect2Display,getElementByIdQuery: Helper.Lookup.getLookupByKeyQuery, onSelect: function () { return $data.CampaignSource(null); }, getElementByIdQuery: Helper.Lookup.getLookupByKeyQuery }}">
				</select>
			</pmbb-edit-entry>
			<% Html.PluginRenderActions("CompanyDetailsContactSourceEdit"); %>
			<!-- /ko -->
		</pmbb-edit>
	</pmb-block>
    <% Html.RenderPartial("Bravo/BravoList"); %>
	<div data-bind="with: $root.addresses().filter(function(x) { return !x.IsCompanyStandardAddress() })">
		<!-- ko if: $root.standardAddress -->
		<contact-data params="caption: window.Helper.String.getTranslatedString('ContactAddress') + ' - ' + window.Helper.String.getTranslatedString('StandardAddress'), address: $root.standardAddress, lookups: $root.lookups, loading: $root.loading"></contact-data>
		<!-- /ko -->
		<!-- ko if: $root.showAllAddresses() && !$root.loading() -->
			<div data-bind="foreach: {data: $data, as: 'address' }">
				<contact-data params="caption: window.Helper.String.getTranslatedString('ContactAddress') + ' #' + ($index() + 2), address: address, lookups: $root.lookups, canDelete: true, makeStandardAddress: $root.makeStandardAddress.bind($root), loading: $root.loading"></contact-data>
			</div>
		<!-- /ko -->
		<!-- ko if: $data.length && !$root.showAllAddresses() -->
			<a class="lv-footer" href="#" data-bind="text: Helper.String.getTranslatedString('ShowAllAddresses').replace('{0}', $root.addresses().length), click: $root.showAllAddresses.bind($root, true)"></a>
		<!-- /ko -->
	</div>
	<!-- ko if: window.Main.Settings.CompanyGroupFlags.AreSearchable -->
	<pmb-block class="companygroupflags" params="icon: 'flag', caption: 'AdditionalInformation', context: { company: company }, condition: window.AuthorizationManager.isAuthorizedForAction('Company', 'Edit')">
		<pmbb-view>
			<!-- ko with: company -->
				<pmbb-view-entry params="caption: 'CompanyGroupFlag1'">
					<span data-bind="if: CompanyGroupFlag1Key, lookupValue: CompanyGroupFlag1Key, lookups: $root.lookups.companyGroupFlags1"></span>
					<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyGroupFlag1Key"></span>
				</pmbb-view-entry>
				<pmbb-view-entry params="caption: 'CompanyGroupFlag2'">
					<span data-bind="if: CompanyGroupFlag2Key, lookupValue: CompanyGroupFlag2Key, lookups: $root.lookups.companyGroupFlags2"></span>
					<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyGroupFlag2Key"></span>
				</pmbb-view-entry>
				<pmbb-view-entry params="caption: 'CompanyGroupFlag3'">
					<span data-bind="if: CompanyGroupFlag3Key, lookupValue: CompanyGroupFlag3Key, lookups: $root.lookups.companyGroupFlags3"></span>
					<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyGroupFlag3Key"></span>
				</pmbb-view-entry>
				<pmbb-view-entry params="caption: 'CompanyGroupFlag4'">
					<span data-bind="if: CompanyGroupFlag4Key, lookupValue: CompanyGroupFlag4Key, lookups: $root.lookups.companyGroupFlags4"></span>
					<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyGroupFlag4Key"></span>
				</pmbb-view-entry>
				<pmbb-view-entry params="caption: 'CompanyGroupFlag5'">
					<span data-bind="if: CompanyGroupFlag5Key, lookupValue: CompanyGroupFlag5Key, lookups: $root.lookups.companyGroupFlags5"></span>
					<span class="c-gray" data-bind="translatedText: 'Unspecified', ifnot: CompanyGroupFlag5Key"></span>
				</pmbb-view-entry>
			<!-- /ko -->
		</pmbb-view>
		<pmbb-edit>
			<!-- ko with: company -->
			<pmbb-edit-entry id="CompanyGroupFlag1Key" params="caption: 'CompanyGroupFlag1', validationElement: CompanyGroupFlag1Key">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyGroupFlag1Key, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyGroupFlag1')}"></select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'CompanyGroupFlag2', validationElement: CompanyGroupFlag2Key">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyGroupFlag2Key, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyGroupFlag2')}"></select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'CompanyGroupFlag3', validationElement: CompanyGroupFlag3Key">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyGroupFlag3Key, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyGroupFlag3')}"></select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'CompanyGroupFlag4', validationElement: CompanyGroupFlag4Key">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyGroupFlag4Key, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyGroupFlag4')}"></select>
			</pmbb-edit-entry>
			<pmbb-edit-entry params="caption: 'CompanyGroupFlag5', validationElement: CompanyGroupFlag5Key">
				<select class="form-control" data-bind="select2autocompleter: { data: CompanyGroupFlag5Key, autocompleteOptions: Helper.Lookup.getAutocompleteOptions('Main_CompanyGroupFlag5')}"></select>
			</pmbb-edit-entry>
			<!-- /ko -->
		</pmbb-edit>
	</pmb-block>
	<!-- /ko -->
	<% Html.PluginRenderActions("CompanyMaterialDetailsTabExtensions"); %>
	<% Html.PluginRenderActions("ContactMaterialDetailsTabExtensions"); %>
</div>