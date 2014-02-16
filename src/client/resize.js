(function() {
	"use strict";
	var h = $('#header');
	var m = $('#map');
	var f = $('#footer');
	var w = $(window);
	var followup;
	var handleResize = function() {
		var hh = h.height();
		var fh = f.height();
		var wh = w.height();
		m.height(wh - (hh + fh));
		if (followup) {
			clearTimeout(followup);
			followup = null;
		} else {
			followup = setTimeout(handleResize, 250);
		}
	};
	module.exports = handleResize;
})();