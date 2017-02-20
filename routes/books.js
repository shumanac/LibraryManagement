var express = require('express');
var router = express.Router();
var Books = require('../models/books');

router.post('/insert', function(req, res) {
    var name: req.body.title;
    var author: req.body.author;
    var category: req.body.category;
    var isbn: req.body.isbn;
  
if(errors){
       res.render('/users/index', {
           errors:errors
       })
        
    }else{
       var newBook = new Books({
           name:name,
           author:author,
           category:category,
           isbn:isbn
       })
        Books.insertBook(newBook, function(){
            if(err)throw err;
            console.log(name);
            
        });
        req.flash('success_msg', 'your book is inserted');
        res.redirect('/user/index');
    }

  res.redirect('/');
});





