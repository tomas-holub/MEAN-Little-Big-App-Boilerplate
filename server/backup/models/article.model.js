var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    text: String,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coment'}],
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Article', articleSchema);
