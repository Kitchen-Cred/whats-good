module.exports = (function(app) {
	var _ = require('underscore');
	_.templateSettings = {
		interpolate: /\[\[(.+?)\]\]/g
	};
	var templates = {};
	_.each($('#tabs div'), function(t) {
		templates[t.id] = _.template($(t).html());
		$(t).empty();
	});
	var currentFeature;
	var showFeature = function(feature) {
		$('#tabs').addClass('shown');
		currentFeature = feature;
		$(window).resize();
		$('#tabs li[data-name="info"]').click();
	};
	var hideFeature = function() {
		$('#tabs').removeClass('shown');
		$(window).resize();
	};
	$('#tabs li[data-name]').click(function() {
		$(this).addClass('selected').siblings('li').removeClass('selected');
		var tab = 'tab-' + $(this).attr('data-name');
		var result = templates[tab](currentFeature);
		$('#' + tab).empty().html(result).addClass('selected')
			.siblings('div').removeClass('selected').each(function() {
				$(this).empty();
		});
	});
	return {
		show: showFeature,
		hide: hideFeature
	};
})();