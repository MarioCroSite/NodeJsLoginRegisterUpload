var ROUTE = '/login';

function LoginController(router, menu, passport) {
	// GET: /login
	router.get('/', function (req, res) {
		res.render('login.twig', {
			menu: menu,
			menuActive: ROUTE,
			user: req.user
		});
	});

	// POST: /login
	router.post('/', passport.authenticate('local', { failureRedirect: '/login/fail' }), function (req, res) {
		if (req.isAuthenticated()) {
			if (req.body.remember) {
				// Cookie expires after 30 days
				req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
			} else {
				// Cookie expires at end of session
				req.session.cookie.expires = false;
			}

			res.redirect('/');
		} else {
			res.send('Korisnik nije autoriziran!');
		}
	});

	// GET: /login/fail
	router.get('/fail', function (req, res) {
		res.status(401);
		res.send('Krivi username/password!');
	});

	// GET: /login/logout
	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: LoginController(
			config.express.Router(),
			config.menu,
			config.passport
		)
	};
}
