; var TeamRetrospectiveViewModel = function(){ 
	var self = this;
	var sprints = ko.observableArray([]);

	var members = ko.observableArray([]);
	var memberFilter = new MemberFilter();

	var filteredMembers = ko.computed(function() {
		console.log('************',!memberFilter.searchText());
        if(!memberFilter.searchText()) {
            return members(); 
        } else {
            return ko.utils.arrayFilter(members(), function(member) {
                return member.name == memberFilter.searchText;
            });
        }
    });

	var selectedSprint = ko.observable();

	var setSelectSprint = function(data, e){
		selectedSprint(data);
	};

	var init = function(){
		populateSprints();
		populateMembers();

		memberFilter.searchText.subscribe(onFilterChange);

    	//inialize to the first section
    	selectedSprint(sprints()[0]);
	}

	var populateSprints = function(){
		$.ajax({
            	url: 'http://localhost:56650/api/sprints',
            	dataType: "json",
            	crossDomain: true,
    	}).done(function(results){    		
    		$.map(results, function(data){
    			var sprint = new Sprint({ id: data.id, number: data.sprintNumber }, selectedSprint);
    			sprints.push(sprint);	
      		});

    	});
	};

	var populateMembers = function(){
		$.ajax({
            	url: 'http://localhost:56650/api/teams/6336df64-80ec-e411-b351-08002779885b/members/',
            	dataType: "json",
            	crossDomain: true,
    	}).done(function(results){    		
    		$.map(results, function(data){
    			members.removeAll();
    			var member = new Member({ id: data.id, name: data.name });
    			members.push(member);
      		});

    	});
	};

 	var clearFilter = function () {
        memberFilter.searchText('');
	};

    var dataOptions = function (force) {
        return {
            results: members,
            filter: memberFilter,
            sortFunction: sort.membersSort,
            forceRefresh: force,
            currentUserId: config.currentUserId            
        };
    };

    var restoreFilter = function () {
    	console.log('restoreFilter');
    	/*
        var val = store.fetch(stateKey.searchText);
        if (val !== memberFilter.searchText()) {
            memberFilter.searchText(val);
        }
        */
    };

    var setFilter = function () {     
    	console.log('setFilter');
        memberFilter.sprint(selectedSprint);

    };

    var onFilterChange = function (val) {
    	console.log(val);
    	console.log(memberFilter);
        //store.save(stateKey.searchText, val);
        refresh();
    };

    var forceRefreshCmd = ko.asyncCommand({
        execute: function (complete) {
        	console.log('forceRefresh');
        	populateMembers();
            setFilter();
            //$.when(datacontext.members.getMembersByTeam(dataOptions(true)))
            //    .always(complete);
        }
    });

    var refresh = function (callback) {
    	console.log('refresh');
    	populateMembers();
        setFilter();        
        //$.when(datacontext.sessions.getData(dataOptions(false)))
        //            .always(utils.invokeFunctionIfExists(callback));
    };

	return {
		sprints: sprints,
		members: members,
		init: init,
		setSelectSprint: setSelectSprint,
		selectedSprint: selectedSprint,
		memberFilter: memberFilter,
		clearFilter: clearFilter,
		forceRefreshCmd: forceRefreshCmd,
		filteredMembers: filteredMembers
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

; var Member = function(data){ 
	var self = this;
	var name = ko.observable(data.name);
	var id = ko.observable(data.id);

	return {
		id: id,
		name: name
	}
};
