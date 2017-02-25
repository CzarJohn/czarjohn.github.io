pendingClicks = 0;
latLngArr = [];

(function(window, google, mapster){

	var options = mapster.MAP_OPTIONS;

	element = document.getElementById('map-canvas');

	var geocoder = new google.maps.Geocoder();
	map = new Mapster.create(element, options);

	$('.add').click(function(){
		Materialize.toast('Please plot four points by clicking on the map.', 3000);
		pendingClicks = 4;
	});

	map.addPolygon({
		paths: [
		    new google.maps.LatLng(14.161195, 121.246666),
		    new google.maps.LatLng(14.161250, 121.246770),
		    new google.maps.LatLng(14.161109, 121.246857),
		    new google.maps.LatLng(14.161048, 121.246745),
		    new google.maps.LatLng(14.161195, 121.246666)
		],
		available: true,
	});

	map.addPolygon({
		paths: [
		    new google.maps.LatLng(14.161038, 121.247073),
		    new google.maps.LatLng(14.161078, 121.247173),
		    new google.maps.LatLng(14.160827, 121.247293),
		    new google.maps.LatLng(14.160796, 121.247203),
		    new google.maps.LatLng(14.161038, 121.247073)
		],
		available: false,
	});
	map._on({
		obj : map.gMap,
		event :  'click',
		callback : function(e){
			console.log(pendingClicks);
			if(pendingClicks > 0){
				//console.log(e.latLng.lng());
				latLngArr.push(e.latLng);
				pendingClicks--;
				if(pendingClicks == 0){
					map.addPolygon({
						paths: [
						    latLngArr[0],
						    latLngArr[1],
						    latLngArr[2],
						    latLngArr[3],
						    latLngArr[0]
						],
						available: true,
					});
					latLngArr = [];
				}
			}
		}
	});

	 /* // Construct the polygon.
	  bermudaTriangle = new google.maps.Polygon({
	    paths: triangleCoords,
	  });*/
	 
	  //bermudaTriangle.setMap(map);


	/*

	function geocode(opts){
		geocoder.geocode({
			address: opts.address
		}, function(results, status){
			if(status === google.maps.GeocoderStatus.OK){
				opts.success.call(this, results, status);
			}else{
				opts.error.call(this, status);
			}
		});
	}

	setTimeout(function(){
		geocode({
			address : 'Metro Manila, Philippines',
			success : function(results){
				var result = results[0];
				var marker = map.addMarker({
					lat : result.geometry.location.lat(),
					lng : result.geometry.location.lng(), 
					draggable : true,
					content: 'I like pizza'
				});
				map.gMap.panTo({
					lat : result.geometry.location.lat(),
					lng : result.geometry.location.lng()
				});		
				console.log({
					lat : result.geometry.location.lat(),
					lng : result.geometry.location.lng()
				});
			},
			error : function(status){
				console.error(status);
			}
		});
	}, 3000);

	*/

	/*var marker2 = map.addMarker({
		lat : 37.791350,
		lng : -122.495883, 
		draggable : true,
		content: 'I like you'
	
	});

	map._removeMarker(marker2);*/

	/*

		event : {
			name : 'click',
			callback : function(e){
				console.log(e);
				var infoWindow = new google.maps.InfoWindow({
					content: 'I like pizza.'
				});
				infoWindow.open(map.gMap, marker);
			}
		}
	*/




	/*var marker = new google.maps.Marker({
		position: {
			lat: 37.791350,
			lng: -122.435883
		},
		map: map.gMap
	});*/

}(window, google, window.Mapster || (window.Mapster = {})))
