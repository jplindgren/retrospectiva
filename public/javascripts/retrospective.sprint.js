;(function(Retrospective){
	Retrospective.Sprint = function(attributes){
		this.errors = [];
    	this.assignAttributes(attributes);
	}

	Retrospective.Sprint.all = function(){
		var deferred = $.Deferred();
  		var result = $.ajax({
            	url: Retrospective.Config.baseUrl + "/sprints", 
            	dataType: "json",
            	crossDomain: true,
    	});

    	result.success(function(sprints){
  			sprints = $.map(sprints, function(data){
        		return new Retrospective.Sprint(data);
      		});
      		deferred.resolve(sprints);
  		});

      	return deferred.promise();
	}

	Retrospective.Sprint.prototype.assignAttributes = function(attributes){
		for (var property in attributes){
			if (attributes.hasOwnProperty(property))
				this[property] = attributes[property];
		}
	}
})(Retrospective);