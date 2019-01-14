'use strict'
// REQUIRES
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'easyCredit',
    multipleStatements: true // para los StoredProcedures
});

connection.connect((err) => {
    if (err) throw err;
    console.log('MySQL port: \x1b[32m%s\x1b[0m', 3306);

})


module.exports.connection = connection;