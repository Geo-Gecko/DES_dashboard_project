var mysql = require('mysql')
var connection = mysql.createPool({
    host        : '172.83.9.226',
    user        : 'root',
    password    : '', 
    database    : 'formtools'
});

module.exports = connection;