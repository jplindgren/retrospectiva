var MemberFilter = function() {
      var self = this;      

      self.filter = function(item) { 
      	var nameUnwrapped = ko.utils.unwrapObservable(item.name);
      	return nameUnwrapped.indexOf(self.searchText()) > -1; 
      }
      
      self.searchText = ko.observable('').extend({ throttle: Retrospective.Config.throttle });
 
      return self;
  };