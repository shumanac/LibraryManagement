var mongoose = require('mongoose');
var Schema = new mongoose.Schema({
    "title": {
        "type": "String",
        "unique": "true",
        "required": "true"
    },
    "summary": {
        "type": "String",
        "unique": "true",
        "required": "true"
    },
    "borrowed": "Number",
    "quantity": "Number",
    //"picture": "String",
    "users": "Object",
    "updated_at": {
        "type": Date,
        "default": Date.now
    }
});
module.exports = mongoose.model("book", Schema);



//var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
//
//
//mongoose.connect('mongodb://localhost:27017/libraryApp');
//var db = mongoose.connection;
//
//
//
//var BookSchema = new Schema({
//    name:{type:String }, 
//    author:{type:String},
//    catagory:{type:String },
//    isbn:{type:String}
//   
//   
//});
//
//var Books = module.exports = mongoose.model('Books', BookSchema);


//module.exports.insertBook = function(Books, err){
//   
// console.log("book inserted" + Books);
//    
//});

