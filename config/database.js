var mysql = require('mysql')
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'formtools'
});

module.exports = connection;
