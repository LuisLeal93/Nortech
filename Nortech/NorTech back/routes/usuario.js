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
app.get('/:id', Usuario.getUser);

// ==================
// Crear Usuario
// ==================
app.post('/', Usuario.insertUser);

// ==================
// Actualizar Usuario
// ==================
/* app.put('/', Usuario.updateUser); */

// ==================
// Eliminar Usuario
// ==================
app.delete('/:id', Usuario.deleteUser);


// Exportar
module.exports = app;