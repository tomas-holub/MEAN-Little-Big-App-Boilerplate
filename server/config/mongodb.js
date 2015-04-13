var env      = process.env.NODE_ENV || 'development';
var config   = require('./config')[env];
var mongoose = require('mongoose');
var dbName   = config.dbName || 'test';
var dbHost   = process.env.OPENSHIFT_MONGODB_DB_HOST || config.dbHost || 'mongodb://localhost';
var dbPort   = process.env.OPENSHIFT_MONGODB_DB_PORT || config.dbPort || '27017';

var connectionString = dbHost + ':' + dbPort + '/' + dbName;
mongoose.connect(connectionString);

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