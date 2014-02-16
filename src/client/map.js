module.exports.init = function(api) {
	var map = L.map('map').setView([39.95, -75.166667], 15);
	var tiles = L.tileLayer('http://{s}.tile.cloudmade.com/96fd484b35cf4e21ab4a7569ae8ac413/121335/256/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: ''
	});
	tiles.addTo(map);
	//show the compass marker.
	if (window.navigator.geolocation) {
		window.navigator.geolocation.watchPosition(function(position) {
			var coords = position.coords;
			var location = [coords.latitude, coords.longitude];
			var icon = new L.AwesomeMarkers.icon({
				icon: 'location-arrow',
				markerColor: 'blue',
				prefix: 'fa'
			});
			L.marker(location, {
				icon: icon
			}).addTo(map);
			map.panTo(location, {
				animate: true,
				duration: 0.75
			});
		});
	}
	//define marker colors
	var setMarker = function(feature, layer, selected) {
		var markerColor = feature.properties.TYPE === 'FARMERS_MARKET' ? 'orange' : 'green';
		markerColor = selected ? 're' : markerColor;
		layer.setIcon(new L.AwesomeMarkers.icon({
			icon: 'cutlery',
			markerColor: markerColor,
			prefix: 'fa'
		}));
	};

	//selected feature.
	var selectedLayer;
	var selectedFeature;
	//add the locations to the map.
	api.getLocations().done(function(features) {
		var featureLayer = L.geoJson(features, {
			onEachFeature: function(feature, layer) {
				layer.on('click', function() {
					var latlng = feature.geometry.coordinates;
					map.panTo([latlng[1], latlng[0]], {
						animate: true,
						duration: 0.25
					});
					if (selectedFeature && selectedFeature !== feature) {
						setMarker(selectedFeature, selectedLayer, false);
					}
					setMarker(feature, layer, true);
					selectedFeature = feature;
					selectedLayer = layer;
				});
				setMarker(feature, layer);
			}
		});
		featureLayer.addTo(map);
	}).fail(function(err) {});
};