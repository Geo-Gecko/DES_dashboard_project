var mysql = require('mysql')
var connection = mysql.createPool({
    host: '172.83.9.226',
    // host: 'localhost',
    user: 'root',
    password: '', // Change database password to your owner database credentials
    database: 'formtools'
});

module.exports = connection;