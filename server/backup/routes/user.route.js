var User = require('../models/user.model');
var express = require('express');
var router = express.Router();

router.route('/user').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
});

router.route('/user/:id').delete(function (req, res) {
    console.log('delete called');

    if (req.params.id) {
        User.findByIdAndRemove(
            req.params.id,
            function (err, user) {
                if (err) {
                    console.log(err);
                }
                res.json(user._id);
            });
    }
});

router.route('/user').post(function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.send(err);
        }

        res.send({message: 'User Created'});
    });
});

module.exports = router;