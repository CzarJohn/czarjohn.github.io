(function($){
  $(function(){
  	$('.carousel').carousel({
  		full_width: true,
  		dist: 100
  	});

  	 $('.datepicker').pickadate({
		    selectMonths: true, // Creates a dropdown to control month
		    selectYears: 15 // Creates a dropdown of 15 years to control year
		  });

  	$("#input-search").keyup(function (event) {
	    if (event.keyCode == 13) {
			$('#submit-search').click();
	    }
	});

	$('#submit-search').click(function(){
		$('.search-results').toggle(400);
	});

	$('#submit-add').click(function(){
		$('.validate').val('');
		$('.vali').removeClass('active');
		 Materialize.toast('Employee has been added! Yey!', 4000);
	});

  }); // end of document ready
})(jQuery); // end of jQuery name space