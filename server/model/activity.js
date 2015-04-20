var config = require('../config.js');
var knex = require('knex')(config.KnexMySqlDatabaseSettings );
var bookshelf = require('bookshelf')(knex);

var Activity = bookshelf.Model.extend({
    tableName: 'activity'
});

module.exports = Activity;
