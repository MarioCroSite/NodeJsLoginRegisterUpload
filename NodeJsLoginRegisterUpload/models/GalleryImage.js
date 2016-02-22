function GalleryImageModel (mongoose, Schema) {
	var GalleryImage = mongoose.model('GalleryImage', {
		Title: String,
		FileName: String,
		OriginalFileName: String,
		MimeType: String,
		UploadTime: Date,
		_User: Schema.Types.ObjectId
	});

	return GalleryImage;
}

module.exports = GalleryImageModel;
