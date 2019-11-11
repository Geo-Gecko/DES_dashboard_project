var mysql = require('mysql')
var connection = mysql.createPool({
    // host: '172.83.9.226',
    host: 'localhost',
    user: 'root',
    //password: 'GG_PP_MSQL_ADMIN_19', // Change database password to your owner database credentials
    password: '', // Change database password to your owner database credentials
    database: 'formtools'
});

module.exports = connection;