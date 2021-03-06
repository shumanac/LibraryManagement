var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local');

//Get Register

router.get('/register', function(req, res){
    res.render('register');
});


//Get Login

router.get('/login', function(req, res){
    res.render('login');
});


//Register user

router.post('/register', function(req, res){
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;
    
    //validation
    
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    var errors = req.validationErrors();
    if(errors){
       res.render('register', {
           errors:errors
       })
        
    }else{
       var newUser = new User({
           name:name,
           email:email,
           username:username,
           password:password
       })
        User.createUser(newUser, function(){
            if(err)throw err;
            console.log(user);
            
        });
        req.flash('success_msg', 'You are registered and can now login');
        res.redirect('/users/login');
    }
});

router.get('/register', function(req, res, next){
    var messages = req.flash('error');
    res.render('users/register', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});



//passport for login

passport.use(new LocalStrategy(
  function(username, password, done) {
      User.getUserByUsername(username, function(err, user){
          
          if(err)throw err
          if(!user){
              return done(null, false, {message: 'Unknown User'});
          }
          User.comparePassword(password, user.password, function(err, isMatch){
              if(err)throw err
              if(isMatch){
                  return done(null, user)
              }else{
                  return done(null, false, {message: 'Invalid Password'})
              }
          });
      });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user)
  });
});

router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login', failureFlash: true}),function(req, res) {
    res.redirect('/')
  });

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success_msg', "You are logged out");
    res.redirect('/users/login');
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
//  router.post('/authenticate', function(req, res) {
//    User.findOne({
//      email: req.body.email
//    }, function(err, user) {
//      if (err) throw err;
//
//      if (!user) {
//        res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
//      } else {
//        // Check if password matches
//        user.comparePassword(req.body.password, function(err, isMatch) {
//          if (isMatch && !err) {
//            // Create token if the password matched and no error was thrown
//            const token = jwt.sign(user, config.secret, {
//              expiresIn: 10080 // in seconds
//            });
//            res.status(200).json({ success: true, token: 'JWT ' + token });
//          } else {
//            res.status(401).json({ success: false, message: 'Authentication failed. Passwords did not match.' });
//          }
//        });
//      }
//    });
//  });




module.exports = router;