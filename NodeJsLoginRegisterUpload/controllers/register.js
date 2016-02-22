var ROUTE = '/register';

function RegisterController(config, router, menu, models, passport) {
	var Account = models.Account;

	// GET: /register
	router.get('/', function (req, res) {
		res.render('register.twig', {
			menu: menu,
			menuActive: ROUTE
		});
	});

	// POST: /register
	router.post('/', function (req, res) {
		Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
			if (err) {
				return res.render('register', {
					menu: menu,
					account: account
				});
			}

			passport.authenticate('local')(req, res, function () {
				res.redirect('/');
			});
		});
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: RegisterController(
			config,
			config.express.Router(),
			config.menu,
			config.models,
			config.passport
		)
	}
}
