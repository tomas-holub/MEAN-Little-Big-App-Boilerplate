var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/api/v1/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//
//app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
//app.use('/', require('./routes/index'));



app.use('/', express.static('./public'));
app.use('/views', express.static('./public/views'));
app.use('/bower_components',  express.static('./bower_components'));
//var routes = require('./routes/index');
var users = require('./routes/users');


var db = require('./config/mongodb');
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/api/v1/', users);

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || '3000';
var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.listen(port, ip, function () {
    console.log( "Listening on " + ip + ", server_port " + port )
});

module.exports = app;