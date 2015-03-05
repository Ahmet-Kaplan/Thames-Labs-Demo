var jwt = require('jwt-simple');
var config = require('./config');

var CheckToken = function (req, res, next) {
    var token = (req.body && req.body.tkn) || (req.query && req.query.tkn) || req.headers['x-tkn'];

    if (token) {
        try {
            var decoded = jwt.decode(token, config.secret);

            if (decoded.exp <= Date.now()) {
                delete config.users[token];
                return res.status(401).send('Access token has expired');
            }

            return next();
        } catch (err) {
            console.log('Token error: ' + err);
            return res.sendStatus(401);
        }
    } else {
        console.log('No token');
        return res.sendStatus(401);
    }
};

module.exports.CheckValidToken = CheckToken;
