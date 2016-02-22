function Config() {
	// Requirements
	var express 		= require('express');
	var multer 			= require('multer');
	var glob 			= require('glob');
	var bodyParser 		= require('body-parser');
	var cookieParser 	= require('cookie-parser');
	var session 		= require('express-session');
	var mongoose 		= require('mongoose');
	var passport 		= require('passport');
	var passportLocal 	= require('passport-local');
	var passportLocalMongoose = require('passport-local-mongoose');
	var menu			= require('./menu');

	// App
	var app = express();

	// Schema
	var Schema = mongoose.Schema;

	// Passport Local Strategy
	var LocalStrategy = passportLocal.Strategy;

	// Body parser
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	// Cookie parser
	app.use(cookieParser());

	// Session
	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	}));

	// Passport
	app.use(passport.initialize());
	app.use(passport.session());

	// Public and views directory
	app.use(express.static('public'))
	app.set('views', __dirname + '/views');

	// Mongoose
	var dbConfig = {
		host: 'localhost',
		port: 27017,
		database: 'auth'
	};
	mongoose.connect('mongodb://' + dbConfig.host + ':' + dbConfig.port + '/' + dbConfig.database);

	// Models
	var models = {
		Account: require('./models/Account')(mongoose, passport, Schema, LocalStrategy, passportLocalMongoose),
		GalleryImage: require('./models/GalleryImage')(mongoose, Schema)
	}

	// Build config object
	return {
		express: express,
		multer: multer,
		glob: glob,
		bodyParser: bodyParser,
		cookieParser: cookieParser,
		session: session,
		mongoose: mongoose,
		passport: passport,
		passportLocal: passportLocal,
		passportLocalMongoose: passportLocalMongoose,
		menu: menu,
		models: models,

		app: app,
		Schema: Schema,
		LocalStrategy: LocalStrategy
	};
}

module.exports = Config();
