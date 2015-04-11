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
        res.json(users);
    });
};

exports.getById = function(req, res){

};

exports.update = function(req, res){

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