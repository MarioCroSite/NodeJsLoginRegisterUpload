var ROUTE = '/upload';

function UploadController (config, router, menu, models, multer) {
	var upload = multer({
		dest: __dirname + '/../public/uploads'
	});
	var GalleryImage = models.GalleryImage;

	// GET: /upload
	router.get('/', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('upload.twig', {
				menu: menu,
				menuActive: ROUTE,
				user: req.user
			});
		} else {
			res.status(401);
			res.send('<b>401</b> Not authorized!')
		}
	});

	// POST: /upload
	router.post('/', upload.single('file'), function (req, res) {
		console.log(req.file);
		
		var image = new GalleryImage({
			Title: req.body.title,
			FileName: req.file.filename,
			OriginalFileName: req.file.originalname,
			MimeType: req.file.mimetype,
			UploadTime: new Date(),
			_User: req.user._id
		});
		image.save(function (err) {
			if (err) {
				console.log('Error prilikom dodavanja slike u bazu!');
			}
		});

		res.redirect('/upload');
	});

	return router;
}

module.exports = function (config) {
	return {
		route: ROUTE,
		router: UploadController(
			config,
			config.express.Router(),
			config.menu,
			config.models,
			config.multer
		)
	}
}
