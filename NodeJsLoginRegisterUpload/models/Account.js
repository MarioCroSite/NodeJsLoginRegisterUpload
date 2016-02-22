module.exports = function (mongoose, passport, Schema, LocalStrategy, passportLocalMongoose) {
	var AccountSchema = new Schema({
		username: String,
		password: String
	});

	AccountSchema.plugin(passportLocalMongoose);

	var Account = mongoose.model('Account', AccountSchema);

	passport.use(new LocalStrategy(Account.authenticate()));
	passport.serializeUser(Account.serializeUser());
	passport.deserializeUser(Account.deserializeUser());

	return Account;
}