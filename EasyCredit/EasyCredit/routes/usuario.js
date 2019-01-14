'use strict'
// Requiere
var express = require('express');
var app = express();
// Importar controlador de usuario
var Usuario = require('../controllers/usuario');


// RUTAS, CRUD

// ==================
// Obtener usuarios
// ==================
app.get('/', Usuario.getUsers);

// ==================
// Obtener usuario
// ==================
app.get('/:username', Usuario.getUser);

// ==================
// Crear Usuario
// ==================
app.post('/', Usuario.insertUser);

// ==================
// Actualizar Usuario
// ==================
app.put('/', Usuario.updateUser);


// Exportar
module.exports = app;