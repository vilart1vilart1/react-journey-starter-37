(function () { 
    var baseViewModel = window.Main.ViewModels.DocumentAttributeListIndexViewModel;
    namespace("Main.ViewModels").DocumentAttributeListIndexViewModel.prototype = baseViewModel.prototype;
    namespace("Main.ViewModels").DocumentAttributeListIndexViewModel.prototype.get = function (fileResource) {
        $.ajax({
            type: 'GET',
            url: window.open(window.Helper.resolveUrl("~/Customer.Ramseier/Head/GetDocument/") + fileResource.Id(),
                '_blank', 'location=no,closebuttoncaption=' + window.Helper.String.getTranslatedString('Close'))
        });
    };
}());