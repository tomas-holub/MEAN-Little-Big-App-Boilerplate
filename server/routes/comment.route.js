var Coment = require('../models/comment.model');
var express = require('express');
var router  = express.Router();

router.route('/comment').get(function (req, res) {
    Coment.find(function (err, comments) {
        if (err) {
            return res.send(err);
        }
        res.json(comments);
    });
});

router.route('/comment/:id').delete(function (req, res) {

    if (req.params.id) {
        Coment.findByIdAndRemove(
            req.params.id,
            function (err, article) {
                if (err) {
                    console.log(err);
                }
                res.json(article._id);
            });
    }
});

router.route('/comment').post(function (req, res) {
    var comment = new Coment(req.body);
  //  console.log(comment);
    comment.save(function (err) {
        if (err) {
            return res.send(err);
        }

        res.send({message: 'Comment Created'});
    });
});

module.exports = router;