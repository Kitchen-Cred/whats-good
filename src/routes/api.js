module.exports.init = function(app){
	app.all('/api/*', function(req,res,next){
		res.end('API method requested: ' + req.path);
	});
};