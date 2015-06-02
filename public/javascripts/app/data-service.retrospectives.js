;var DataServiceRetrospectives = (function(){
	var init = function(){
        amplify.request.define('team-retrospetives', 'ajax', {
            url: Retrospective.Config.baseUrl + '/teams/{teamId}/retrospectives',
        	dataType: "json",
        	crossDomain: true
        });
	};
 	var getRetrospectives = function(teamId){
        var dfd = $.Deferred();
        amplify.request({
            resourceId: 'team-retrospetives',
            data: { teamId: teamId },
            success: dfd.resolve,
            error: dfd.reject
        });

        return dfd.promise();
	};

	init();

	return {
		getRetrospectives: getRetrospectives
	}
});