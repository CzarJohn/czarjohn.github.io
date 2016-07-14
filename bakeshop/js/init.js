(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $('.carousel').carousel({
    	dist: -200,
    	shift: 0,
    	padding: 0,
    	full_width: true   
	});
	setInterval(autoplay, 2000);
	function autoplay() {
	    $('.carousel').carousel('next');
	}

  }); // end of document ready
})(jQuery); // end of jQuery name space