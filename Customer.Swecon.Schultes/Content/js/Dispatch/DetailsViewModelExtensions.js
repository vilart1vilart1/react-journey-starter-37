;(function () {

    window.Crm.Service.ViewModels.DispatchDetailsViewModel.prototype = namespace("Crm.Service.ViewModels").DispatchDetailsViewModel.prototype;
    var baseInit = window.Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.init;
    window.Crm.Service.ViewModels.DispatchDetailsViewModel.prototype.init = function(routeValues) {
      var self = this;
      return baseInit.apply(this, arguments)
        .then(function() {
          self.displayedTimePostings = window.ko.computed(function() {
            return self.timePostings().filter(function(serviceOrderTimePosting) {
                return serviceOrderTimePosting.ExtensionValues().IsOvertime() === false;
              })
              .sort(function(l, r) {
                if (l.Date() > r.Date()) {
                  return 1;
                }
                if (l.Date() < r.Date()) {
                  return -1;
                }
                if (l.Username() > r.Username()) {
                  return 1;
                }
                if (l.Username() < r.Username()) {
                  return -1;
                }
                if (l.From() > r.From()) {
                  return 1;
                }
                if (l.From() < r.From()) {
                  return -1;
                }
                return 0;
              });
          }).distinct('Date').distinct('Username');

        

        });
    };

})();
