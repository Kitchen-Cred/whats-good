module.exports = {
	getLocations: function(bounds) {
		var result = $.Deferred();
		//this should go and load data from either 
		//local storage, or the server.. or both.
		$.getJSON('/api/locations').done(function(locations) {
			//TODO: filter this list.
			result.resolve(locations);
		}).fail(function(err) {
			result.reject({
				message: "Unable to load locations."
			});
		});
		return result;
	}
};