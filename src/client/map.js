module.exports = function(app) {
	var api = app.api;
	var map = L.map('map').setView([39.95, -75.166667], 15);
	var tiles = L.tileLayer('http://{s}.tile.cloudmade.com/96fd484b35cf4e21ab4a7569ae8ac413/121335/256/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '',
		trackResize : true
	});
	tiles.addTo(map);
	var currentCenter;
	var currentMarker;
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
			if(!currentMarker){			
				currentMarker = L.marker(location, {
					icon: icon,
					title: 'Current Location'
				}).addTo(map);
				if (!currentCenter) {
					currentCenter = location;
					recenter(location);
				}
			}
			currentMarker.setLatLng(location);
		});
	}
	
	var recenter = function(location, duration) {
		if (location) {
			map.panTo(location, {
				animate: true,
				duration: duration || 0.75
			});
		}
	};

	map.on('resize', function(e) {
		recenter(currentCenter, 0.1);
	});

	//define marker colors
	var setIcon = function(feature, layer, selected) {
		var markerColor = feature.properties.TYPE === 'FARMERS_MARKET' ? 'orange' : 'green';
		var marker = feature.properties.TYPE === 'FARMERS_MARKET' ? 'leaf' : 'shopping-cart';
		markerColor = selected ? 're' : markerColor;
		layer.setIcon(new L.AwesomeMarkers.icon({
			icon: marker,
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
					currentCenter = [latlng[1], latlng[0]];
					if (selectedFeature && selectedFeature !== feature) {
						setIcon(selectedFeature, selectedLayer, false);
					}
					setIcon(feature, layer, true);
					selectedFeature = feature;
					selectedLayer = layer;
					app.tabs.show(feature);
					setTimeout(function(){
						map.invalidateSize();
						recenter(currentCenter, 0.25);
					}, 1000);
					recenter(currentCenter, 0.25);
				});
				setIcon(feature, layer);
			}
		});
		featureLayer.addTo(map);
	}).fail(function(err) {});
};