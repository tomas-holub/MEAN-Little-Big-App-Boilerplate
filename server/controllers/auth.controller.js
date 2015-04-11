var User   = require('../models/user.model');
var jwt    = require('jwt-simple');
var config = require('../config/config');

exports.register = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(201).send({message: 'User Created'});
    });
};

exports.login = function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (err) {
            return res.send(err);
        }
        if (user) {
            var userData = new User({
                email: user.email
            });
        } else {
            return res.status(401).send({message: "Email not found"});
        }

        var expires = Date.now() + (config.expires || 1800);
        var token = jwt.encode({
            email: userData.email,
            exp: expires
        }, config.secret);
        res.status(200).json({
            token: token,
            expires: expires,
            user: userData.toJSON()
        });
    });
};

exports.logout = function (req, res) {

};

exports.validUser = function(email, callback){

    User.findOne({email:email}, function(err, user) {
        if (user.email) {
            callback(true);
        }
        callback(false);
    })
}