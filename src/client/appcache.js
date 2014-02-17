(function() {
	if (window.applicationCache) {
		window.applicationCache.addEventListener('updateready', function(e) {
			if (window.applicationCache.status === window.applicationCache.UPDATEREADY) {
				window.location.reload();
			}
		});
	}
})();