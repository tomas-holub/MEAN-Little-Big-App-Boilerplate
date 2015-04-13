var User   = require('../models/user.model');
var Token  = require('../models/token.model');
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

        var expires = Date.now() + config.expiration;
        var token = jwt.encode({
            _id:userData._id,
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


// Token invalidation - store token to the token blacklist
// Delete all expired tokens from the blacklist token collection
exports.logout = function (req, res) {
    var token = req.headers['x-access-token'];
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        var token = new Token({token:token,expiration:decoded.exp});
        token.save(function (err) {
            if (err) {
                return res.status(404).send(err);
            }
            Token.find({expiration: {$lt: Date.now()}}).remove(function(err){
                if (err) {
                    return res.status(404).send(err);
                }
                res.status(201).send({message: 'Token Invalidated'});
            });
        });
    } else {
        res.status(401).send({message: "Token not found"});
    }
};