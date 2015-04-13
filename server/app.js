var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var env    = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// serves client
app.use('/', express.static('./public'));
app.use('/docs', express.static('./docs'));
app.use('/views', express.static('./public/views'));
app.use('/bower_components',  express.static('./bower_components'));

// serves REST api
var db     = require('./config/mongodb')
var auth   = require('./middlewares/authenticate.js');
var router = require('./routes/router');
app.use('/api/v1', router);

var port = parseInt(config.serverPort) || '3000';
var ip   = config.serverIp || '127.0.0.1';

app.listen(port, ip, function () {
    console.log( "Listening on " + ip + ", server_port " + port )
});

module.exports = app;
