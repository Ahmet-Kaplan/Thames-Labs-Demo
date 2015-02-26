var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'elite',
        password: 'meRaWR73a$atH-3*',
        database: 'cs-live',
        charset: 'utf8'
    }
});

var bookshelf = require('bookshelf')(knex);

var Contact = bookshelf.Model.extend({
    tableName: 'contacts'
});

module.exports = new Contact();