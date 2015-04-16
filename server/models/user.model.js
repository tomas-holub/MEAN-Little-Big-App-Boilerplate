var SALT_WORK_FACTOR = 10;
var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true},
    passwordHash:{ type: String, required: true }
});

userSchema.virtual('password')
    .get(function() {
        return this._password;
    })
    .set(function(value) {
        this._password = value;
        var salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
        this.passwordHash = bcrypt.hashSync(value, salt);
    });

userSchema.virtual('password_repeat')
    .get(function() {
        return this._password_repeat;
    })
    .set(function(value) {
        this._password_repeat = value;
    });

userSchema.path('passwordHash').validate(function(v) {
    if (this._password || this._password_repeat) {
        if (this._password.length<5) {
            this.invalidate('password', 'Password length must be at least 5 characters.');
        }
        if (this._password !== this._password_repeat) {
            this.invalidate('password_repeat', 'Password must match confirmation.');
        }
    }

    if (this.isNew && !this._password) {
        this.invalidate('password', 'required');
    }
}, null);

userSchema.methods.comparePassword = function(password_candidate, cb) {
    var isMatch = bcrypt.compareSync(password_candidate, this.passwordHash);
    cb(isMatch);
};

userSchema.path('email').validate(function (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}, 'The e-mail is invalid.');

var User = mongoose.model('User', userSchema);
module.exports = User;

