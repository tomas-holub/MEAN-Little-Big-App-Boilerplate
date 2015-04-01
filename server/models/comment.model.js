var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
   // authorId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    articleId: {type: mongoose.Schema.Types.ObjectId, ref: 'Article'},
    text: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Coment', commentSchema);
