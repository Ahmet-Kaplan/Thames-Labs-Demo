var config = require('../config.js');
var knex = require('knex')(config.KnexMySqlDatabaseSettings );
var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
    tableName: 'users'
});

module.exports = User;
