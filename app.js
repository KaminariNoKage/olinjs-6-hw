
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '264540260346071', secret: 'ce92be5e172b4867ae5350795f2604df' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect('localhost');
  //mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/myfacebookspace');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
      if (!user || err){
        res.send("Please go to: /login to log in");
      } else {
        req.user = user;
        next();
      }
    });
  }
}

app.get('/', facebookGetUser(), routes.index);
app.get('/myhome', facebookGetUser(), user.myhome);
app.get('/login', Facebook.loginRequired({ scope: ['user_photos', 'friends_photos', 'publish_stream']}), user.login);
app.get('/logout', facebookGetUser(), user.logout);
app.get('/friends', facebookGetUser(), user.friends);

app.post('/update', user.update);
app.post('/newcomment', user.newcom);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
