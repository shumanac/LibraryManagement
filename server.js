var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require ('morgan'); /* Morgan is used for logging request details*/
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/library', function(err){
    if(err){
        console.log('Not connected to the database'+ err);
    }else{
        console.log('Successfully connected to mongodb');
    }
})

app.use(morgan('dev'));
app.listen(port, function(){
    console.log("Running the server on port"+' ' + port);
});
