;var DataServiceSprints = (function(){
	var init = function(){
        amplify.request.define('sprints', 'ajax', {
            url: Retrospective.Config.baseUrl + '/sprints',
        	dataType: "json",
        	crossDomain: true
        });
	};
 	var getSprints = function(){
        var dfd = $.Deferred();
        amplify.request({
            resourceId: 'sprints',
            success: dfd.resolve,
            error: dfd.reject
        });

        return dfd.promise();
	};

	init();

	return {
		getSprints: getSprints
	}
});