(function(window, google, mapster){

	mapster.MAP_OPTIONS = {
		center: {
			lat:14.161139, lng: 121.246864
		},
		zoom: 19,
		disableDefaultUI: true,
		//scrollwheel:false,
		//draggable: false,
		//maxZoom: 40,
		//minZoom: 9,
		zoomControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		mapTypeId: google.maps.MapTypeId.HYBRID	
	}

}(window, google, window.Mapster || (window.Mapster = {})))