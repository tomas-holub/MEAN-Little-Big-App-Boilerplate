var Article = require('../models/article.model');
var express = require('express');
var router = express.Router();

router.route('/article').get(function (req, res) {
    Article.find(function (err, articles) {
        if (err) {
            return res.send(err);
        }
        res.json(articles);
    }).populate('author').exec(function(error,article){
        console.log(error);
        console.log(article);
    });
});

router.route('/article/:id').delete(function (req, res) {

    if (req.params.id) {
        Article.findByIdAndRemove(
            req.params.id,
            function (err, article) {
                if (err) {
                    console.log(err);
                }
                res.json(article._id);
            });
    }
});

router.route('/article').post(function (req, res) {
    var article = new Article(req.body);
    article.save(function (err) {
        if (err) {
            return res.send(err);
        }

        res.send({message: 'Article Created'});
    });
});

module.exports = router;