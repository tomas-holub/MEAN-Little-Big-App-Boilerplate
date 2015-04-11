var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// serves client
app.use('/', express.static('./public'));
app.use('/views', express.static('./public/views'));
app.use('/bower_components',  express.static('./bower_components'));

// serves REST api
var db     = require('./config/mongodb')
var auth   = require('./middlewares/authenticate.js');
var router = require('./routes/router');
app.use('/api/v1', router);

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || '3000';
var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port, ip, function () {
    console.log( "Listening on " + ip + ", server_port " + port )
});

module.exports = app;
