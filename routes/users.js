var express = require('express');
var router = express.Router();

//Get Register

router.get('/register', function(req, res){
    res.render('register');
});


//Get Login

router.get('/login', function(req, res){
    res.render('login');
});
module.exports = router;

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
        console.log("passed");
    }
});