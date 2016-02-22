var config		= require('./config');
var app			= config.app;
var glob		= config.glob;
var passport	= config.passport;

/* Load all controllers */
	glob('./controllers/**/*.js', function (err, controllers) {
		console.log('Loading controllers...');

		controllers.forEach(function (path) {
			var controller = require(path)(config);
			app.use(controller.route, controller.router);

			console.log(path.split('/').reverse()[0] + ' loaded!');
		});

		console.log('All controllers loaded!\n');
	});

// Start server
	app.listen(1337, function () {
		console.log('Server je pokrenut!\n');
	});