var env      = process.env.NODE_ENV || 'development';
var config   = require('./config')[env];
var mongoose = require('mongoose');
var dbName   = config.dbName || 'test';
var dbHost   = config.dbHost || 'localhost';
var dbPort   = config.dbPort || '27017';

var connectionString = dbHost + ':' + dbPort + '/' + dbName;

// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect('mongodb://' + connectionString);

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