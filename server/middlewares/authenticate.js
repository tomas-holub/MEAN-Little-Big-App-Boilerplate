var jwt       = require('jwt-simple');
var validUser = require('../controllers/auth.controller').validUser;
var config    = require('../config/config');

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

            validUser(decoded.email, function (isValid) {
                if (isValid) {
                    res.status(200);
                    next();
                }
            });
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
            "message": "Unauthorized"
        });
        return;
    }
}
module.exports = auth;