var ROUTE = '/';

function MainController(router, menu) {
	// GET: /
	router.get('/', function (req, res) {
		res.render('index.twig', {
			menu: menu,
			menuActive: ROUTE,
			user: req.user
		});
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: MainController(
			config.express.Router(),
			config.menu
		)
	};
}
