var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require ('morgan'); /* Morgan is used for logging request details*/
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(appRoutes);


mongoose.connect('mongodb://localhost:27017/library', function(err){
    if(err){
        console.log('Not connected to the database'+ err);
    }else{
        console.log('Successfully connected to mongodb');
    }
});




app.listen(port, function(){
    console.log("Running the server on port"+' ' + port);
});
