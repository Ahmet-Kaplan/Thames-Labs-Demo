// project: flaming-octo-sansa
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var fs = require('fs');
var https = require('https');

var ssl_options = {
    //cert: fs.readFileSync('./server/ssl/ssl.crt'),
    cert: fs.readFileSync('./server/ssl/server.crt'),
    key: fs.readFileSync('./server/ssl/private.key'),
    ca: fs.readFileSync('./server/ssl/sub.class1.server.ca.pem')
};

var app = express();
var server = https.createServer(ssl_options, app);

app.set('jwtTokenSecret', config.secret);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

require('./route.js')(app);

if (!module.parent) {
    server.listen(config.port, function () {
        console.log('Secure server running on port ' + config.port);
    });
}