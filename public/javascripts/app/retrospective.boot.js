$(function(){
	var retrospectives = [];

	Retrospective.init(document.body);

	var dataServicesRetrospectives = new DataServiceRetrospectives();
	var user = new User({
        id: '',
        teamId: '7a6939eb-9b08-e511-be73-c48508d65d66',
        teamName: 'Team DropEvents',
        name: 'João Paulo Lindgren',
        username: 'jplindgren'
    });

	var populateRetrospectives = function(){
        return dataServicesRetrospectives.getRetrospectives(user.teamId)
                .then(function(results){
                            $.map(results, function(data){
                                var members = $.map(data.members, function(data){
                                    return new Member({ id: data.id, name: data.name })
                                });
                                var retrospective = new RetrospectivePOCO({
                                    id: data.id, 
                                    team: new Team({ id: data.teamId, name: data.teamName }),
                                    sprint: new Sprint({ id: data.id, number: data.sprintNumber }),
                                    members: members
                                }, ko.observable());
                                retrospectives.push(retrospective);
                            });
                            var teamRetrospective = new TeamRetrospectiveViewModel(retrospectives)
							teamRetrospective.init();			
							ko.applyBindings(teamRetrospective);
                        });
    };
    populateRetrospectives();
});