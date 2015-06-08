$(function(){
	var retrospectives = [];

	Retrospective.init(document.body);

	var dataServicesRetrospectives = new DataServiceRetrospectives();
	LoggedUser = new User({
        id: '',
        retrospectiveMemberId: '7B2AACF8-130C-E511-87ED-08002779885B',
        teamId: '85be4abc-130c-e511-87ed-08002779885b',
        teamName: 'DropEvents',
        name: 'João Paulo Lindgren',
        username: 'jplindgren'
    });

	var populateRetrospectives = function(){
        return dataServicesRetrospectives.getRetrospectives(LoggedUser.teamId)
                .then(function(results){
                            $.map(results, function(data){
                                var members = $.map(data.members, function(data){
                                    return new Member({ userId: data.userId, name: data.name })
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
							ko.applyBindings(teamRetrospective, document.getElementById('team-retrospective-view'));
                        });
    };
    populateRetrospectives();
});