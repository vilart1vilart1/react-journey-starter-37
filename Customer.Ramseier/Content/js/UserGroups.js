$(document).ready(function () {
$(document)
	.delegate(".usergroup-edit-form", "submit", function (e) {
		e.preventDefault();
		$('input#edit_usergroup_save').addClass("disabled");
		var form = $(this);
		form.ajaxSubmit({
			url: Helper.resolveUrl("~/CustomRoleAndGroup/CustomerUserGroupEdit"),
			type: "POST",
			data: { userGroupId: form.data("itemId") },
			success: function (data) {
				$('input#edit_usergroup_save').removeClass("disabled");
				form.parents("li").replaceWith(data);
			}
		});
	});
});