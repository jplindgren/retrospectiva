var ProfileViewModel = function(data){
	var self = this;
	self.member = ko.observable(data);
	return {
		member: self.member
	}
}