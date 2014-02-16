module.exports.init = function(app){
	var _ = require('underscore');
	var farmersMarkets = require('../../data/philly_farmers_market');
	_.each(farmersMarkets.features, function(f){
		f.properties.TYPE = 'FARMERS_MARKET';
		f.properties.ID = f.properties.TYPE + "_" + f.properties.OBJECTID;
	});

	var cornerStores = require('../../data/philly_healthy_corner_store');
	_.each(cornerStores.features, function(f){
		f.properties.TYPE = 'HEALTHY_CORNER_STORE';
		f.properties.ID = f.properties.TYPE + "_" + f.properties.OBJECTID;
	});

	var locations = farmersMarkets;
	locations.features = 
		locations.features.concat(cornerStores.features);

	app.all('/api/locations', function(req, res){
		res.json(locations);
	});

};