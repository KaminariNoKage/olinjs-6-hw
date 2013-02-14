
/*
 * GET home page.
 */

var Mods = require('../models/fb_model.js')
	, Homepg = Mods[0]
	, Images = Mods[1]
	, Comment = Mods[2];

exports.index = function(req, res){
	req.facebook.api('/me', function(err, data) {
		var id = data.id
			, img = "https://graph.facebook.com/" + data.username + "/picture?width=200&height=200"
			, name = data.name;
		Homepg.find({fb_id: id}).exec(function (err, docs) {
			//Checking to see if the user id already exists (once logged in)
			if (docs[0] == null){
				var newuser = new Homepg({name: name, fb_id: id, image: img, background: 'black', textcolor: 'white', textfont: 'Arial', textsize: '20px', message: 'My New Page! Change What I say!'});
				console.log('New user made')
				newuser.save(function (err) {
				if (err)
					return console.log("Error: We couldn't save the new User");
				//Setting the user session to the current user if new
				req.session.user = newuser;
				//Redirecting to home for more fun stuff
				res.redirect('/myhome');
				});
			}
			else {
				//docs[0].remove();
				//Setting the session to the current, already logged user
				req.session.user = docs[0];
				res.redirect('/myhome');
			};
		});
	});
};