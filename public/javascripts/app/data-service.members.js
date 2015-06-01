;var DataServiceMembers = (function(){
	var init = function(){
        amplify.request.define('members-brief', 'ajax', {
            url: Retrospective.Config.baseUrl + '/teams/{teamId}/members?sprintId={sprintId}',
        	dataType: "json",
        	crossDomain: true
        });
	};
 	var getMembersBrief = function(teamId, sprintId){
        console.log(sprintId);
        var dfd = $.Deferred();
        amplify.request({
            resourceId: 'members-brief',
            data: { teamId: teamId, sprintId: sprintId },
            success: dfd.resolve,
            error: dfd.reject
        });

        return dfd.promise();
	};


	var getMember = function(id){
		var url = Retrospective.Config.baseUrl + '/members/' + id; 
 		console.log(url);
 		return $.ajax({
        	url: url,
        	dataType: "json",
        	crossDomain: true,
    	});
	};

	init();

	return {
		getMembersBrief: getMembersBrief,
		getMember: getMember
	}
});