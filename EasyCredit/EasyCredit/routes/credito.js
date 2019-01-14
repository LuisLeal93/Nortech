'use strict'
// Requiere
var express = require('express');
var app = express();
// Importar controlador de usuario
var Credito = require('../controllers/credito');
// Middleware
var mdAutentificacion = require('../middleware/autentificacion');

// RUTAS, CRUD

// ==================
// Obtener todos los creditos
// ==================
app.get('/', Credito.getCredits);

// ==================
// Obtener creditos de un usuario
// ==================
app.get('/:username', mdAutentificacion.verificaUsuario, Credito.getCredit);

// ==================
// Crear peticion credito
// ==================
app.post('/', mdAutentificacion.verificaUsuario, Credito.insertCredit);

// ==================
// Actualizar estado credito
// ==================
app.put('/', Credito.updateCredit);
// app.put('/', mdAutentificacion.verificaUsuario, Credito.updateCredit);


// Exportar
module.exports = app;