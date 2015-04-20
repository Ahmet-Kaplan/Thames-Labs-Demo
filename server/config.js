var config = {
    secret: 'nbn2counj3o3uoiunc978ho3ijhjcdfohn2o934rf',
    tokenExpireDuration: '60',
    tokenExpireInterval: 'minutes',
    users: {},
    port: process.env.PORT || 3000
};

var knexMySqlDatabaseSettings = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'elite',
        password: 'meRaWR73a$atH-3*',
        database: 'cs-live',
        charset: 'utf8'
    }
};

module.exports = config;
module.exports.KnexMySqlDatabaseSettings = knexMySqlDatabaseSettings;
