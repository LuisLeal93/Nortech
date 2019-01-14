// Requiere
var express = require('express');
var app = express();


// RUTAS
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
})

// Exportar
module.exports = app;