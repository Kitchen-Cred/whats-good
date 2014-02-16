//zepto doesn't include 
//require('../../client_components/zepto/zepto.js');
$(function() {
	//configure the tabs.
	//screen resize.
	var handleResize = require('./resize');
	$(window).resize(handleResize);
	$(window).resize();

	//configure the map.
	var clientApi = require('./api');
	var mapInit = require('./map').init(clientApi);
});