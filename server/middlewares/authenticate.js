var jwt    = require('jwt-simple');
var config = require('../config/config');
var User   = require('../models/user.model');
var Token  = require('../models/token.model');

var auth = function (req, res, next) {

    var token = req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, config.secret);

            if (decoded.exp <= Date.now()) {
                res.status(400);
                res.json({
                    "status": 400,
                    "message": "Token Expired"
                });
                return;
            }
            Token.findOne({token: token}, function (err, token) {
                if (token !== null) {
                    res.status(400);
                    res.json({
                        "status": 400,
                        "message": "Token invalid"
                    });
                    return;
                }
                User.findOne({email: decoded.email}, function (err, user) {
                    if (user.email) {
                        res.status(200);
                        next();
                    } else {
                        res.status(401);
                        res.json({
                            "status": 401,
                            "message": "Invalid User"
                        });
                        return;
                    }
                })
            })
        } catch (err) {
            res.status(500);
            res.json({
                "status": 500,
                "message": "Invalid Token format",
                "error": err
            });
        }
    } else {
        res.status(401);
        res.json({
            "status": 401,
            "message": "Missing Token"
        });
        return;
    }
}
module.exports = auth;