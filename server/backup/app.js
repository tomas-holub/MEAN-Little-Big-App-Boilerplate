var express    = require('express');
var bodyParser = require('body-parser');
var passport   = require('passport');



var db         = require('./models/db')
var user       = require('./routes/user.route.js');
var article    = require('./routes/article.route.js');
var comment    = require('./routes/comment.route.js');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(passport.initialize());
app.use(passport.session());



app.use('/', express.static('./public'));
app.use('/views', express.static('./public/views'));
app.use('/bower_components',  express.static('./bower_components'));
app.use('/api/v1', user);
app.use('/api/v1', article);
app.use('/api/v1', comment);

var port = parseInt(process.env.OPENSHIFT_NODEJS_PORT) || '3000';
var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';


app.listen(port, ip, function () {
    console.log( "Listening on " + ip + ", server_port " + port )
});

module.exports = app;
