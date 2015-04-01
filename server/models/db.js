var mongoose         = require('mongoose');
var dbName           = 'tom';
var connectionString = 'mongodb://localhost:27017/' + dbName;

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