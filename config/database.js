var mysql = require('mysql')
var connection = mysql.createPool({
    host        : '172.83.9.226',
    user        : 'root',
    password    : '', // Change database password to your owner database credentials
    database    : 'school_db'
});

module.exports = connection;