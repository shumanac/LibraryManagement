var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');



mongoose.connect('mongodb://localhost:27017/libraryApp');
var db = mongoose.connection;



var UserSchema = new Schema({
    name:{type:String, lowercase:true, required:true, unique:true }, 
    username:{type:String, index: true, lowercase:true, required:true, unique:true },
    email:{type:String, lowercase:true, required:true, unique:true },
    password:{type:String, required:true}
   
   
});


var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
   
    bcrypt.hash(newUser.password, null, null, function(err, hash) {
    // Store hash in your password DB.
       if(err)return next(err);
       newUser.password = hash;
        newUser.save(callback);
    
});
};






module.exports.getUserByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};


module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
};

module.exports.comparePassword= function(candidatePassword, hash, callback){
    // Load hash from your password DB.
bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if(err)throw err;
    callback(null, isMatch);
});
}