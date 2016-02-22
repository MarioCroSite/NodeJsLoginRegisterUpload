var ROUTE = '/users';

function UsersController (router, menu, models) {
	var Account = models.Account;

	// GET: /users
	router.get('/', function (req, res) {
		Account
			.find()
			.exec(function (err, accounts) {
				res.render('users.twig', {
					user: req.user,
					menu: menu,
					menuActive: ROUTE,
					users: accounts
				});
			});
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: UsersController(
			config.express.Router(),
			config.menu,
			config.models
		)
	}
}