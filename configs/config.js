const dotenv = require('dotenv').config();

let knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    },
    debug: true
});

module.exports = {
	"port": 8080,
	"bodyLimit": "100kb",
    "corsHeaders": ["Link"],
    "session": {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'puniakita',
        schema: {
            tableName: 'session',
            columnNames: {
                session_id: 'sessionId',
                expires: 'expires',
                data: 'data'
            }
        }
    },
    'knex':knex
}