//zepto doesn't include 
//require('../../client_components/zepto/zepto.js');
$(function() {
	//configure the tabs.
	//screen resize.
	var handleResize = require('./resize');
	$(window).resize(handleResize);
	$(window).resize();

	var App = {};
	//configure the map.
	App.api = require('./api');
	App.tabs = require('./tabs');
	App.map = require('./map')(App);
});