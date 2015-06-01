$(function(){
	var DataService;
	window.DataService = DataService = {};

	Retrospective.init(document.body);

	window.userLogged = {
		teamId: '6336df64-80ec-e411-b351-08002779885b',
		name: 'João Paulo Lindgren',
		userName: 'jplindgren'
	}

	var teamRetrospective = new TeamRetrospectiveViewModel()
	teamRetrospective.init();			
	ko.applyBindings(teamRetrospective);

/*
	var t = new TeamRetrospectiveViewModel()
	t.init();	
	ko.applyBindings(t);
	*/
});