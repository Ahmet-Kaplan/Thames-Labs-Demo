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

var Company = bookshelf.Model.extend({
    tableName: 'companies'
});

module.exports = new Company();