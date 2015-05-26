var MemberFilter = function() {
      var self = this;      

      self.sprint = ko.observable(); // object
      self.searchText = ko.observable().extend({ throttle: Retrospective.Config.throttle });
 
      return self;
  };