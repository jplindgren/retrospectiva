; var TeamRetrospectiveViewModel = function(){ 
	var self = this;
	var sprints = ko.observableArray([]);

	var members = ko.observableArray([]);
	var memberFilter = new MemberFilter();

    var user = new User({
        id: '',
        teamId: '6336df64-80ec-e411-b351-08002779885b',
        teamName: 'Team DropEvents',
        name: 'João Paulo Lindgren',
        username: 'jplindgren'
    });

	var dataServiceMembers = new DataServiceMembers();
    var dataServiceSprints = new DataServiceSprints();

    var selectedSprint = ko.observable();
	var filteredMembers = ko.computed(function() {
        /*
        if(memberFilter.searchText()) {
        	return ko.utils.arrayFilter(selectedSprint.members(), function(member) {
                return member.name == memberFilter.searchText;
            });
        } 
        return (selectedSprint) ? selectedSprint().members() : [];
        */
        console.log(selectedSprint());
        return (selectedSprint() !== undefined) ? selectedSprint().members() : [];
    });

	var setSelectSprint = function(data){
		selectedSprint(data);
	};

	var init = function(){
        //inialize to the first section
        populateData();

        memberFilter.searchText.subscribe(onFilterChange);
		
	}

    var populateData = function(){
        populateSprints().then(function(){
            populateMembers();
        });
        
    }

	var populateSprints = function(){
        return dataServiceSprints.getSprints()
                        .then(function(results){
                            $.map(results, function(data){
                                var sprint = new Sprint({ id: data.id, number: data.sprintNumber }, selectedSprint);
                                sprints.push(sprint);   
                            });
                            setSelectSprint(sprints()[0]);
                        });
        /*
		$.ajax({
            	url: 'http://localhost:56650/api/sprints',
            	dataType: "json",
            	crossDomain: true,
    	}).done(function(results){    		
    		$.map(results, function(data){
    			var sprint = new Sprint({ id: data.id, number: data.sprintNumber }, selectedSprint);
    			sprints.push(sprint);	
      		});
            selectedSprint(sprints()[0]);
    	});
        */
	};

	var populateMembers = function(){
		dataServiceMembers.getMembersBrief(userLogged.teamId, selectedSprint().id)
								.done(function(results){
						    		$.map(results, function(data){
						    			selectedSprint().members.removeAll();
						    			selectedSprint().members.push(new Member({ id: data.id, name: data.name }));
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
		filteredMembers: filteredMembers,
        user: user
	}
};


; var Sprint = function(data, selected){ 
	var self = this;
	var number = ko.observable(data.number);
	var id = data.id;
    var members = ko.observableArray([]);

	var isSelected = ko.computed(function() {
		if (!selected())
			return false;
       	return id === selected().id;
    });

	var name = ko.computed(function() {
        return "Sprint " + number();
    }, this, { pure: true });

	return {
		id: id,
		number: number,
		isSelected: isSelected,
		name: name,
        members: members
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

;var User = function(data){
    var self = this;
    var name = data.name;
    var username = data.username;
    var id = data.id;
    var teamId = data.teamId;
    var teamName = data.teamName;

    return {
        id: id,
        teamId: teamId,
        name: name,
        username: username
    }
};
