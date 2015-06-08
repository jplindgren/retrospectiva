var AnswerRetrospectiveViewModel = function(data, answerDataService){
	var self = this;			

	self.sprintNumber = 'Sprint ' + data.sprintNumber;
	self.questions = ko.observableArray(data.questions);
	self.user = data.user;
	
	self.description = ko.computed(function(){
		return 'description view model';
	});

	self.answerQuestion = function(data, event){
		var t = ko.utils.unwrapObservable(data.questions())
		
		var questionsDto = self.questions()
								.map(function(question){ 
									return { questionId: question.id, answer: question.answer }; 
								});
		answerDataService.sendAnswers({
			retrospectiveMemberId: LoggedUser.retrospectiveMemberId,
			answers: ko.toJS(questionsDto)
		})
	}

	return obj = {
		number: self.sprintNumber,
		questions: self.questions,
		user: self.user,
		description: self.description,
		answerQuestion: self.answerQuestion
	}
};

;var Question = function(data){
    var self = this;
    self.description = data.description;
    self.id = data.id;
    self.answer = ko.observable('');

    return {
        id: self.id,
        description: self.description,
        answer: self.answer
    }
};
