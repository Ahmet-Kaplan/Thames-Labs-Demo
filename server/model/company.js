var config = require('../config.js');
var knex = require('knex')(config.KnexMySqlDatabaseSettings );
var bookshelf = require('bookshelf')(knex);

var Company = bookshelf.Model.extend({
    tableName: 'companies'
});

module.exports = Company;
