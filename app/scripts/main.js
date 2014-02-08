/* globals L*/
(function(){
	'use strict';
	var cloudmadApiKey = '96fd484b35cf4e21ab4a7569ae8ac413';
	var map = L.map('map').setView([39.9500, -75.1700], 13);

	var layer = L.tileLayer('http://{s}.tile.cloudmade.com/' + cloudmadApiKey + '/111829/256/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom: 18
	}).addTo(map);

	$(function(){

		$(window).resize(function(){
			var header = $('#header').outerHeight();
			var footer = $('#footer').outerHeight();
			var win = $(this).height();
			$('#map').height(win - (header + footer));
			//layer.redraw();
		}).resize();

		var geoLayer = null;
		
		var retrieveLocations = function(){
			$.getJSON('/data/1_philly_farmers_market.json', {
				bbox : map.getBounds().toBBoxString(),
			},
			function(data){
				if(geoLayer){
					map.removeLayer(geoLayer);
					geoLayer = null;
				}
				geoLayer = L.geoJson(data, {
					style: function (feature) {
						console.log(feature);
						return { 
							color: 'red'
						};
					},
					onEachFeature: function (feature, geoLayer) {
						geoLayer.setIcon(L.divIcon({
							html : '+',
							iconSize : '20px',
							popupAnchor : [8, 5]
						}));
						//layer.bindClick('<table class="marker-details">'+ feature.properties + '</table>');
					}
				});
				geoLayer.addTo(map);
			});
		};


		var currentLocation = null;
		//get location...
		map.on('locationfound', function(e){
			if(currentLocation === null)
			{
				map.setView(e.latlng,15);
				var locationMarker = L.divIcon({
					className: 'marker-current-location',
					iconSize: '20px',
					popupAnchor : [10, 0]
				});
				currentLocation = new L.marker(e.latlng, {icon: locationMarker});
				currentLocation.bindPopup('<span>Current Location</span>').addTo(map);
			}
			currentLocation.setLatLng(e.latlng);
		});

		map.locate({ watch: true });
		retrieveLocations();
	});
})();