var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost:27017/libraryApp');
var db = mongoose.connection;



var BookSchema = new Schema({
    name:{type:String }, 
    author:{type:String},
    catagory:{type:String },
    isbn:{type:String}
   
   
});

var Books = module.exports = mongoose.model('Books', BookSchema);


//module.exports.insertBook = function(Books, err){
//   
// console.log("book inserted" + Books);
//    
//});

