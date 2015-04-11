var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique:true},
    password:{type: String},
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
