/**
 * Home page router
 */
exports.init = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'What\'s good.'
		});
	});
	app.get('/offline', function(req, res) {
		res.end('This app is not currently available.');
	});
};