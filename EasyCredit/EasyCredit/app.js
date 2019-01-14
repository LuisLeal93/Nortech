'use strict'
// REQUIRES
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

app.listen(PORT, () => {
    console.log('Express port: \x1b[32m%s\x1b[0m', PORT);
});

// CORS, permitir al backend recibir peticiones del frontend
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Authorization = Token
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
    next();
});

// Body-parser
//// parse application/x-www-form-urlencoded & JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importar Rutas
var usuarioRoutes = require('./routes/usuario');
var creditoRoutes = require('./routes/credito');
var appRoutes = require('./routes/app');

// Rutas Middleware
app.use('/usuario', usuarioRoutes);
app.use('/credito', creditoRoutes);
app.use('/', appRoutes);


module.exports = app