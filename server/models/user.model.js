var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {type: String, unique:true},
    password:{type: String},
    createdOn: { type: Date, default: Date.now },
    modifiedOn: Date,
    lastLogin: Date
});

userSchema.path('email').validate(function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}, 'The e-mail is invalid.');

module.exports = mongoose.model('User', userSchema);
