/*jslint node: true */
"use strict";

var agent = null;
var soap = require('soap');
//var settings = require('./settings.js');
var path = require('path');

var InitialiseExchangeConnection = function () {
    var endpoint = "https://" + path.join(settings.url, 'EWS/Exchange.asmx');
    var url = path.join(__dirname, 'Services.wsdl');

    soap.createClient(url, {}, function (err, client) {
        if (err) {
            throw err;
        }
        if (!client) {
            throw new Error('Could not create client');
        }

        agent = client;
        agent.setSecurity(new soap.BasicAuthSecurity(settings.username, settings.password));
    }, endpoint);
};

var settings = {
    url: 'exchange.brightvisions.co.uk',
    username: 'brightvisions\\csdemo',
    password: '&tied?BORROW?close&',
    mailbox_email: 'csdemo@brightvisions.co.uk'
};

module.exports.Settings = settings;
module.exports.InitExchConn = InitialiseExchangeConnection;
module.exports.Agent = agent;