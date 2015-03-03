var SALT = "$2a$10$AV9hl/W3uwrt1naVsEY3PO";
var bcrypt = require('bcryptjs');
var Users = require('./model/user');

function CheckPassword(provided, stored){
    var hash = bcrypt.hashSync(provided, SALT);
        
    return (provided === stored);
};