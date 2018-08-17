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
    'knex':knex
}