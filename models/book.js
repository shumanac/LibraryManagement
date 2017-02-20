
var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var BookSchema = new Schema({
    title:{type:String, lowercase:true, required:true, unique:true }, 
    summary:{type:String, index: true, lowercase:true, required:true, unique:true },
    quantity:{type:String, lowercase:true, required:true, unique:true }
   
   
   
});


var Book = module.exports = mongoose.model('Book', BookSchema);











