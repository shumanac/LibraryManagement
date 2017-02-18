var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require ('morgan'); /* Morgan is used for logging request details*/

app.use(morgan('dev'));
app.listen(port, function(){
    console.log("Running the server on port"+' ' + port);
});
