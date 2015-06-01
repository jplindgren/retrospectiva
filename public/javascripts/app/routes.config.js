;(function($){
	var app = $.sammy('#main', function() {

		this.get('#/main-view', function(context) {
            $('#main-view').show();  

			$('#team-retrospective-view').hide();
            $('#sprint-retrospective-view').hide();
            $('#member-detail-view').hide();

            console.log('main view called')
      	});
      
      	this.get('#/team-retrospective-view', function(context) {
            $('#team-retrospective-view').show();

            $('#sprint-retrospective-view').hide();
            $('#member-detail-view').hide();
            $('#main-view').hide();
      	});

      	this.get('#/sprint-retrospective-view/:id', function(context) {
            $('#sprint-retrospective-view').show();

           	$('#team-retrospective-view').show(); 
            $('#member-detail-view').hide();
            console.log('sprint-retrospective-view route called with param ' + this.params['id']);
      	});

      	this.get('#/members/:id', function(context) {
      		$('#team-retrospective-view').hide();
      		$('#sprint-retrospective-view').hide();

            $('#member-detail-view').show();
            console.log('sprint-retrospective-view route called with param ' + this.params['id']);
      	});
      
    });
      
    $(function() {
      app.run('#/team-retrospective-view');
    });

})(jQuery);