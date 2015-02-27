// project: flaming-octo-sansa

var express = require('express');
var jwt = require('jwt-simple');
var moment = require('moment');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var Users = require('./model/user');
var Companies = require('./model/company');
var Contacts = require('./model/contact');
var jwtauth = require('./jwtauth.js');
var config = require('./config');
var https = require('https');
var fs = require('fs');
var http = require('http');

app.set('jwtTokenSecret', config.secret);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/login', function (req, res) {
    res.render('../view/login.ejs');
});

app.post('/login', function (req, res, next) {
    var uid = req.body.uid;
    var pwd = req.body.pwd;

    Users.where({
            username: uid,
            userpassword: pwd
        })
        .fetch()
        .then(function (user, err) {
            if (err) {
                console.log(err);
                return res.sendStatus(401);
            }
            if (!user) {
                return res.sendStatus(401);
            }

            var expires = moment().add(config.tokenExpireDuration, config.tokenExpireInterval).valueOf();
            var token = jwt.encode({
                iss: uid,
                exp: expires
            }, app.get('jwtTokenSecret'));
            config.users[token] = uid;

            res.send(token);
        });
});

app.get('/company', jwtauth.CheckValidToken, function (req, res) {
    Companies.fetchAll()
        .then(function (companies) {
            res.json(companies);
        });
});

app.get('/company/:companyId', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.companyId;

    Companies.where({
            companyId: cid
        })
        .fetch()
        .then(function (company) {
            res.json(company);
        });
});

app.get('/contact', jwtauth.CheckValidToken, function (req, res) {
    Contacts.fetchAll()
        .then(function (contacts) {
            res.json(contacts);
        });
});

app.get('/contact/:contactId', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.contactId;

    Contacts.where({
            contactId: cid
        })
        .fetch()
        .then(function (contact) {
            res.json(contact);
        });
});

var options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};
https.createServer(options, app).listen(port);
console.log('Running on port ' + port);
