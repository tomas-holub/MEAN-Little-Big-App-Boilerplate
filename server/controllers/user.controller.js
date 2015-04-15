var User = require('../models/user.model');

exports.create = function (req, res) {
    var user = new User(req.body);
    user.save(function (err) {
        if (err) {
            return res.status(404).send(err);
        }
        res.status(201).send({message: 'User Created'});
    });
};

exports.get = function (req, res) {
    User.find(function (err, users) {
        if (err) {
            return res.send(err);
        }
        var allUsers = [];
        for(var i=0; i<users.length;i++){
            var user = new User({email:users[i].email});
            allUsers.push(user);
        }
        res.json(allUsers);
    });
};

exports.getById = function (req, res) {
    if (req.params.id) {
        User.findById(req.params.id, function (err, user) {
            if (user) {
                var userData = new User({
                    email: user.email
                });
                res.status(200).json({
                    user: userData.toJSON()
                });
            } else {
                return res.status(404).send({message: "User with id " + req.params.id + " not found"});
            }
        });
    } else {
        return res.status(404).send({message: "Missing user id"});
    }
};

exports.delete = function (req, res) {
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
};