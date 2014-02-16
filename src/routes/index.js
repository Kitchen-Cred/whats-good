/**
 * Home page router
 */
exports.init = function(app) {
	app.get('/', function(req, res) {
		res.render('index', {
			title: 'What\'s good? by KitchenCred.org'
		});
	});
	app.get('/offline', function(req, res) {
		res.render('index', {
			title: 'What\'s good? by KitchenCred.org (offline)'
		});
	});
};