var mongoose = require('mongoose');
var env      = process.env.NODE_ENV || 'development';
var config   = require('./config')[env];
var connectionString;

if (typeof config !== 'undefined') {

    connectionString = config.dbHost + ':' + config.dbPort + '/' + config.dbName;

    if (config.dbPassword){
        connectionString = config.dbUsername + ":" +
        config.dbPassword + "@" +
        config.dbHost + ':' +
        config.dbPort + '/' +
        config.dbName;
    }

    mongoose.connect('mongodb://' + connectionString);
}

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + connectionString);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});