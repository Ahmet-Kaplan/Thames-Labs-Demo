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

var User = bookshelf.Model.extend({
    tableName: 'users'
});

module.exports = User;
