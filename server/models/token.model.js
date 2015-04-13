var mongoose = require('mongoose');

var tokenSchema = new mongoose.Schema({
    token: {type: String, unique: true},
    expiration: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Token', tokenSchema);
