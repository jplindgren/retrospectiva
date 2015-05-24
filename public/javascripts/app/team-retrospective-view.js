; var TeamRetrospectiveViewModel = function(){ 
	var self = this;
	var sprints = ko.observableArray([]);
	var selectedSprint = ko.observable();
	var selectSprint = function(data, e){
		selectedSprint(data);
	};

	var init = function(){
		$.ajax({
            	url: 'http://localhost:56650/api/sprints',
            	dataType: "json",
            	crossDomain: true,
    	}).done(function(results){
    		
    		$.map(results, function(data){
    			var s = new Sprint({ id: data.id, number: data.sprintNumber }, selectedSprint);
    			sprints.push(s);    			
      		});

    	});

    	//inialize to the first section
    	selectedSprint(sprints()[0]);
	}
	return {
		sprints: sprints,
		init: init,
		selectSprint: selectSprint,
		selectedSprint: selectedSprint
	}
};


; var Sprint = function(data, selected){ 
	var self = this;
	var number = ko.observable(data.number);
	var id = ko.observable(data.id);

	var isSelected = ko.computed(function() {
		if (!selected())
			return false;
       	return id() === selected().id();
    });

	var name = ko.computed(function() {
        return "Sprint " + number();
    }, this, { pure: true });

	return {
		id: id,
		number: number,
		isSelected: isSelected,
		name: name
	}
};

