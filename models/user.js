var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

mongoose.connect('mongodb://localhost:27017/libraryApp');
var db = mongoose.connection;


var UserSchema = new Schema({
    username:{type:String, index: true, lowercase:true, required:true, unique:true },
    name:{type:String, lowercase:true, required:true, unique:true }, 
    password:{type:String, required:true},
    email:{type:String, lowercase:true, required:true, unique:true }
});

//UserSchema.pre('save', function(next) {
//  var user = this;
//    bcrypt.hash(user.password, null, null, function(err, hash) {
//    // Store hash in your password DB.
//        if(err)return next(err);
//        user.password = hash;
//         next();
//});
// 
//});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    
    bcrypt.hash(newUser.password, null, null, function(err, hash) {
    // Store hash in your password DB.
       if(err)return next(err);
       newUser.password = hash;
        newUser.save(callback);
    
});
}