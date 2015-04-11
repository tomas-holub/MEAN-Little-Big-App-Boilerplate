var mongoose         = require('mongoose');
var dbName           = 'tom';
var dbHost = process.env.OPENSHIFT_MONGODB_DB_HOST || 'mongodb://localhost';
var dbPort = process.env.OPENSHIFT_MONGODB_DB_PORT || '27017';

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