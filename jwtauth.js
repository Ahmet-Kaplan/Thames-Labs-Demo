var jwt = require('jwt-simple');
var config = require('./config');

var CheckToken = function (req, res, next) {
    var token = (req.body && req.body.tkn) || (req.query && req.query.tkn) || req.headers['x-tkn'];

    if (token) {
        try {
            var decoded = jwt.decode(token, config.secret);

            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 401);
                delete config.users[token];
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