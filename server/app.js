var express = require('express');
var app = express();

app.use('/', express.static('./public'));
app.use('/bower_components',  express.static('./bower_components'));


var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || '3000';
var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.listen(port, ip, function () {
    console.log( "Listening on " + ip + ", server_port " + port )
});

module.exports = app;
