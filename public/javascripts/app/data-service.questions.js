;var DataServiceQuestions = (function(){
	var init = function(){
        amplify.request.define('current-retrospective-questions', 'ajax', {
            url: Retrospective.Config.baseUrl + '/retrospectives/current/questions',
        	dataType: "json",
        	crossDomain: true
        });

        amplify.request.define("send-answers", "ajax", {
            url: Retrospective.Config.baseUrl + "/retrospectives/current/answers",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8"
        });
	};
 	var getCurrentRetrospectiveQuestions = function(){
        var dfd = $.Deferred();
        amplify.request({
            resourceId: 'current-retrospective-questions',
            success: dfd.resolve,
            error: dfd.reject
        });

        return dfd.promise();
	};

    var sendAnswers = function(answers){
        console.log(answers);
        console.log(JSON.stringify(answers));
        var dfd = $.Deferred();
        amplify.request({
            resourceId: 'send-answers',
            data:  JSON.stringify(answers),
            success: dfd.resolve,
            error: dfd.reject
        });

        return dfd.promise();
    };

	init();

	return {
		getCurrentRetrospectiveQuestions: getCurrentRetrospectiveQuestions,
        sendAnswers: sendAnswers
	}
});