;(function($){
	var app = $.sammy('#main', function() {

        var views = $('section');
        var showElement = function(element){
            views.each(function(){
                $(this).hide();
            });
            element.show();
        }

  		this.get('#/main-view', function(context) {
            showElement($('#main-view'));
    	});
      
    	this.get('#/team-retrospective-view', function(context) {          
            showElement($('#team-retrospective-view'));
    	});

    	this.get('#/sprint-retrospective-view/:id', function(context) {
            console.log('sprint-retrospective-view route called with param ' + this.params['id']);
    	});

    	this.get('#/members/:id', function(context) {
            ko.cleanNode($('#member-detail-view')[0]);
    		
            showElement($('#member-detail-view'));

            var dataServiceMembers = new DataServiceMembers();
            dataServiceMembers.getMember(this.params['id']).then(function(member){
                var profileViewModel = new ProfileViewModel(member);
                ko.applyBindings(profileViewModel, document.getElementById('member-detail-view'));  
            });
    	});

        this.get('#/answer-retrospective-view', function(context){
            ko.cleanNode($('#answer-retrospective')[0]);
            showElement($('#answer-retrospective'));

            var dataServiceQuestions = new DataServiceQuestions();
            dataServiceQuestions.getCurrentRetrospectiveQuestions().done(function(result){
                console.log(LoggedUser);
                var answerRetrospectiveViewModel = new AnswerRetrospectiveViewModel({
                    sprintNumber: result.sprint,
                    questions: result.questions.map(function(question) { return new Question({ id: question.id, description: question.description }); }),
                    user: new User({ retrospectiveMemberId: LoggedUser.retrospectiveMemberId, name: LoggedUser.name })
                }, dataServiceQuestions);
                ko.applyBindings(answerRetrospectiveViewModel, $('#answer-retrospective')[0]);
            });
        });
      
    });
      
    $(function() {
        app.run('#/team-retrospective-view');
    });

})(jQuery);