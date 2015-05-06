;(function(Retrospective){
	Retrospective.Manager = function(html){
		this.html = html;

		this.sprintListElement = this.html.find('#sprintList');
		this.pageHeader = this.html.find('.page-header');

		this.sprints = {};

		this.addEventListerners();
		this.loadSprints().then(
			this.renderSprints.bind(this)
		);
	};

	Retrospective.Manager.prototype.addEventListerners = function() {
		this.sprintListElement.on('change', $.proxy(this, 'sprintChanged'));
	};

	Retrospective.Manager.prototype.sprintChanged = function(event) {
		var sprintSelected = $(event.target.children).filter(':selected').text();
		this.pageHeader.text(sprintSelected);
	};

	Retrospective.Manager.prototype.loadSprints = function() {
		var result = Retrospective.Sprint.all();
		var self = this;

		return result.done(function(sprints){
			$.each(sprints, function(index, sprint){
		        self.append(sprint);
	      	});
		});
	};

	Retrospective.Manager.prototype.renderSprints = function(){
		var fragment = $(document.createDocumentFragment());
		var options = [];

		for (var id in this.sprints) {
	      if (!this.sprints.hasOwnProperty(id)) {
	        continue;
	      }
	      var sprint = this.sprints[id];
	      fragment.append( $("<option></option>").attr("value", sprint.Id).text("Sprint - " + sprint.SprintNumber));	      
	    }
		this.sprintListElement.append(fragment);
	}

	Retrospective.Manager.prototype.append = function(sprint){
		this.sprints[sprint.Id] = sprint;
	};



})(Retrospective);