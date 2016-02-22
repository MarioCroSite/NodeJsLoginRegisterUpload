var ROUTE = '/gallery';

function GalleryController(config, router, menu, models) {
	var GalleryImage = models.GalleryImage;

	// GET: /gallery
	router.get('/', function (req, res) {
		GalleryImage
			.find({ _User: req.user })
			.sort('-UploadTime')
			.exec(function (err, images) {
				res.render('gallery.twig', {
					menu: menu,
					menuActive: ROUTE,
					user: req.user,
					images: images
				});
			});
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: GalleryController(
			config,
			config.express.Router(),
			config.menu,
			config.models
		)
	};
}
