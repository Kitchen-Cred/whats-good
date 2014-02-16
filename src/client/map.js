module.exports.init = function(api) {
	var map = L.map('map').setView([39.95, -75.166667], 15);
	window.map = map;
	var tiles = L.tileLayer('http://{s}.tile.cloudmade.com/96fd484b35cf4e21ab4a7569ae8ac413/121335/256/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: ''
	});
	tiles.addTo(map);
	
	//show the compass marker.
	if (window.navigator.geolocation) {
		window.navigator.geolocation.watchPosition(function(position){
			var coords = position.coords;
			var location = [coords.latitude, coords.longitude];
			var icon = new L.AwesomeMarkers.icon({
					icon: 'compass',
					markerColor: 'blue',
					prefix: 'fa'
				});

			L.marker(location, {icon : icon}).addTo(map);
			map.panTo(location);
		});
	}

	var featureLayer;
	api.getLocations().done(function(features) {
		featureLayer = L.geoJson(features, {
			onEachFeature: function(feature, layer) {
				layer.setIcon(new L.AwesomeMarkers.icon({
					icon: 'cutlery',
					markerColor: feature.properties.TYPE === 'FARMERS_MARKET' ? 'orange' : 'green',
					prefix: 'fa'
				}));
			},
			filter: function(feature) {
				var bounds = map.getBounds();
				var lat = feature.geometry.coordinates[1];
				var lon = feature.geometry.coordinates[0];
				return bounds.contains([lat, lon]);
			}
		});
		featureLayer.addTo(map);
	}).fail(function(err) {});
};