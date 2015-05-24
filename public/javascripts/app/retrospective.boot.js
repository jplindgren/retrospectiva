$(function(){
	Retrospective.init(document.body);


	var t = new TeamRetrospectiveViewModel()
	t.init();
	ko.applyBindings(t);

});