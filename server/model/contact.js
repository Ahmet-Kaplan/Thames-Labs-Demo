var config = require('../config.js');
var knex = require('knex')(config.KnexMySqlDatabaseSettings );
var bookshelf = require('bookshelf')(knex);

var Contact = bookshelf.Model.extend({
    tableName: 'contacts'
});

module.exports = Contact;
