module.exports.init = function(api) {
	var map = L.map('map').setView([39.95, -75.166667], 13);
	var tiles = L.tileLayer('http://{s}.tile.cloudmade.com/96fd484b35cf4e21ab4a7569ae8ac413/121335/256/{z}/{x}/{y}.png', {
		maxZoom: 18
	});
	tiles.addTo(map);
	api.getBestLocationsForBoundingBox(map.getBounds())
	.always(function(args) {
		console.log(args);
	});
};