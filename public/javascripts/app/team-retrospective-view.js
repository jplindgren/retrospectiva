; var TeamRetrospectiveViewModel = function(retrospectives){ 
	var self = this;

    var retrospectives = ko.observableArray(retrospectives);
    var activeRetrospective = ko.observable();
    var setActiveRetrospective = function(retrospective){
        activeRetrospective(retrospective);
    };

	var memberFilter = new MemberFilter();

    var user = new User({
        id: '',
        teamId: '7a6939eb-9b08-e511-be73-c48508d65d66',
        teamName: 'Team DropEvents',
        name: 'João Paulo Lindgren',
        username: 'jplindgren'
    });

	var dataServiceMembers = new DataServiceMembers();
    var dataServiceSprints = new DataServiceSprints();
    var dataServicesRetrospectives = new DataServiceRetrospectives();

	var filteredRetrospectiveMembers = ko.computed(function() {
        if (activeRetrospective()){
            return ko.utils.arrayFilter(activeRetrospective().members(), memberFilter.filter);
        }else{
            return [];
        }
    });

	var init = function(){
        //inialize to the first section
        //populateData();
        //populateRetrospectives();        
        setActiveRetrospective(retrospectives()[0]);
        memberFilter.searchText.subscribe(onFilterChange);
		
	}

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

    var onFilterChange = function (val) {
        //store.save(stateKey.searchText, val);
        refresh();
    };

    var forceRefreshCmd = ko.asyncCommand({
        execute: function (complete) {
        	console.log('forceRefresh');
            setFilter();
            //$.when(datacontext.members.getMembersByTeam(dataOptions(true)))
            //    .always(complete);
        }
    });

    var refresh = function (callback) {
        setFilter();
        //$.when(datacontext.sessions.getData(dataOptions(false)))
        //            .always(utils.invokeFunctionIfExists(callback));
    };

	return {
        retrospectives: retrospectives,
        activeRetrospective: activeRetrospective,
        setActiveRetrospective: setActiveRetrospective,
        filteredRetrospectiveMembers: filteredRetrospectiveMembers,
		init: init,
		memberFilter: memberFilter,
		clearFilter: clearFilter,
		forceRefreshCmd: forceRefreshCmd,
        user: user
	};
};

;var RetrospectivePOCO = function(data, selected){
    var id = data.id;
    var sprint = ko.observable(data.sprint);
    var team = ko.observable(data.team);
    var members = ko.observableArray(data.members);

    var isSelected = ko.computed(function() {
        if (!selected())
            return false;
        return id === selected().id;
    });

    return {
        sprint: sprint,
        team: team,
        members: members,
        id: id,
        isSelected: isSelected
    }
}

; var Sprint = function(data){ 
	var self = this;
	var number = ko.observable(data.number);
	var id = data.id;

	var name = ko.computed(function() {
        return "Sprint " + number();
    }, this, { pure: true });

	return {
		id: id,
		number: number,
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

;var Team = function(data){
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
