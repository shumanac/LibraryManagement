var express = require('express');
var port = process.env.PORT || 8080; //select your port or let it pull from your .env file
var morgan = require ('morgan'); /* Morgan is used for logging request details*/
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var router = express.Router();
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var exphbs = require('express-handlebars');
var session = require('express-session');
var expressValidator = require('express-validator');
var csrf = require('csurf');





//init app

var app = express();

var routes = require('./routes/index');
var users = require('./routes/users');



//view engine

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


//BodyParser middleware

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

//set static folder

app.use(express.static(path.join(__dirname,'/public')));

//Express session

app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));

//Passport init
app.use(passport.initialize());
app.use(passport.session());
// Set up middleware
var requireAuth = passport.authenticate('jwt', { session: false });
//Express Validator

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



  




//Connect flash

app.use(flash());

//Global vars

app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});



app.use('/', routes);
app.use('/users', users);

//===============PORT=================
app.listen(port, function(){
    console.log("Running the server on port"+' ' + port);
});





//app.use(methodOverride('X-HTTP-Method-Override'));

//app.use(passport.initialize());
//app.use(passport.session());
//
//// Session-persisted message middleware
//app.use(function(req, res, next){
//  var err = req.session.error,
//      msg = req.session.notice,
//      success = req.session.success;
//
//  delete req.session.error;
//  delete req.session.success;
//  delete req.session.notice;
//
//  if (err) res.locals.error = err;
//  if (msg) res.locals.notice = msg;
//  if (success) res.locals.success = success;
//
//  next();
//});
//
//// Configure express to use handlebars templates
//var hbs = exphbs.create({
//    defaultLayout: 'index', //we will be creating this layout shortly
//});
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');
//
//
//
//
////===============ROUTES===============
//
////displays our homepage
//app.get('/', function(req, res){
//  res.render('/home', {user: req.user});
//});
//
////displays our signup page
//app.get('/signin', function(req, res){
//  res.render('signin');
//});
//
//
////sends the request through our local signup strategy, and if successful takes user to homepage, otherwise returns then to signin page
//app.post('/local-reg', passport.authenticate('local-signup', {
//  successRedirect: '/',
//  failureRedirect: '/signin'
//  })
//);
//
////sends the request through our local login/signin strategy, and if successful takes user to homepage, otherwise returns then to signin page
//app.post('/login', passport.authenticate('local-signin', {
//  successRedirect: '/',
//  failureRedirect: '/signin'
//  })
//);
//
//
//
//app.get('*', function(req, res){
//    res.sendFile(path.join(__dirname + '/public/app/views/home'));
//});
//
//
//
//
//mongoose.connect('mongodb://localhost:27017/library', function(err){
//    if(err){
//        console.log('Not connected to the database'+ err);
//    }else{
//        console.log('Successfully connected to mongodb');
//    }
//});
//
//
//
////===============PASSPORT=================
//// Use the LocalStrategy within Passport to login/"signin" users.
//passport.use('local-signin', new LocalStrategy(
//  {passReqToCallback : true}, //allows us to pass back the request to the callback
//  function(req, username, password, done) {
//    funct.localAuth(username, password)
//    .then(function (user) {
//      if (user) {
//        console.log("LOGGED IN AS: " + user.username);
//        req.session.success = 'You are successfully logged in ' + user.username + '!';
//        done(null, user);
//      }
//      if (!user) {
//        console.log("COULD NOT LOG IN");
//        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
//        done(null, user);
//      }
//    })
//    .fail(function (err){
//      console.log(err.body);
//    });
//  }
//));
//// Use the LocalStrategy within Passport to register/"signup" users.
//passport.use('local-signup', new LocalStrategy(
//  {passReqToCallback : true}, //allows us to pass back the request to the callback
//  function(req, username, password, done) {
//    funct.localReg(username, password)
//    .then(function (user) {
//      if (user) {
//        console.log("REGISTERED: " + user.username);
//        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
//        done(null, user);
//      }
//      if (!user) {
//        console.log("COULD NOT REGISTER");
//        req.session.error = 'That username is already in use, please try a different one.'; //inform user could not log them in
//        done(null, user);
//      }
//    })
//    .fail(function (err){
//      console.log(err.body);
//    });
//  }
//));













