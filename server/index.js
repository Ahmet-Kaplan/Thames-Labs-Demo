// project: flaming-octo-sansa

var Companies = require('./model/company');
var Contacts = require('./model/contact');
var Users = require('./model/user');
var Activities = require('./model/activity');

var bodyParser = require('body-parser');
var config = require('./config');
var express = require('express');
var fs = require('fs');
var https = require('https');
var jwt = require('jwt-simple');
var jwtauth = require('./jwtauth.js');
var moment = require('moment');
var bcrypt = require('bcryptjs');

var ssl_options = {
    cert: fs.readFileSync('server/ssl/ssl.crt'),
    key: fs.readFileSync('server/ssl/private.key'),
    ca: fs.readFileSync('server/ssl/sub.class1.server.ca.pem')
};

var app = express();
var server = https.createServer(ssl_options, app);

app.set('jwtTokenSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/api/1.0/login', function (req, res, next) {
  var uid = req.body.uid;
  var pwd = req.body.pwd;

  var user = Users
  .where({username: uid})
  .fetch()
  .then(function(user, err){

    if (err) {
      console.log(err);
      return res.sendStatus(401);
    }

    if (!user) {
      console.log('No user with username ' + uid);
      return res.sendStatus(401);
    }

    var storedHash = user.get('Password');
    if (!storedHash) {
      console.log('No password hash stored');
      return res.sendStatus(401);
    }

    var passwordMatch = bcrypt.compareSync(pwd, storedHash);
    if (!passwordMatch) {
      console.log("Password doesn't match");
      return res.sendStatus(401);
    }
    
    // Success!
    var expires = moment().add(config.tokenExpireDuration, config.tokenExpireInterval).valueOf();

    var token = jwt.encode({
      iss: uid,
      exp: expires
    }, app.get('jwtTokenSecret'));

    var result = {
      token: token,
      userId: user.get('UserID'),
      userName: uid
    }    
    
    config.users[token] = result;

    return res.json(result);

  });

});

app.get('/api/1.0/company', jwtauth.CheckValidToken, function (req, res) {
  Companies.fetchAll()
  .then(function (companies) {
    res.json(companies);
  });
});

app.get('/api/1.0/company/:companyId', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.companyId;

    Companies.where({
            companyId: cid
        })
        .fetch()
        .then(function (company) {
            res.json(company);
        });
});

app.get('/api/1.0/contact', jwtauth.CheckValidToken, function (req, res) {
    Contacts.fetchAll()
        .then(function (contacts) {
            res.json(contacts);
        });
});

app.get('/api/1.0/contact/:contactId', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.contactId;

    Contacts.where({
            contactId: cid
        })
        .fetch()
        .then(function (contact) {
            res.json(contact);
        });
});

app.get('/api/1.0/company/:companyId/contact', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.companyId;

    Contacts.where({
            companyId: cid
        })
        .fetchAll()
        .then(function (contact) {
            res.json(contact);
        });
});

app.get('/api/1.0/activity', jwtauth.CheckValidToken, function (req, res) {
    var uid = config.users[token].userId;

    Activities.where({
            userId: uid
        })
        .fetchAll()
        .then(function (act) {
            res.json(act);
        });
});

app.get('/api/1.0/activity:activityId', jwtauth.CheckValidToken, function (req, res) {
    var aid = req.params.activityId;

    Activities.where({
            userId: uid
        })
        .fetchAll()
        .then(function (act) {
            res.json(act);
        });
});

app.get('/api/1.0/company/:companyId/activity', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.companyId;

    Activities.where({
            companyId: cid
        })
        .fetchAll()
        .then(function (act) {
             res.json(act);
        });
});

app.get('/api/1.0/contact/:contactId/activity', jwtauth.CheckValidToken, function (req, res) {
    var cid = req.params.contactId;

    Activities.where({
            contactId: cid
        })
        .fetchAll()
        .then(function (act) {
            res.json(act);
        });
});

server.listen(config.port, function(){
  console.log('Secure server running on port ' + config.port);
});
