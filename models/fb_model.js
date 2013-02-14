var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
	// Somehow worked
});

var homeSchema = mongoose.Schema({
	name: String,
	fb_id: String,
	image: String,
	background: String,
	textcolor: String,
	textfont: String,
	textsize: String,
	message: String
});

//Images in the carosel
var imageSchema = mongoose.Schema({
	name: String,
	ownerfb_id: String
});

//The comments themselves
var commentSchema = mongoose.Schema({
	img_id: String,
	authorname: String,
	time: String,
	message: String
});

var Homepg = mongoose.model('Homepg', homeSchema)
	, Images = mongoose.model('Images', imageSchema)
	, Comment = mongoose.model('Comment', commentSchema);
module.exports = [Homepg, Images, Comment];