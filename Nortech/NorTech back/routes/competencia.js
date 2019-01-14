'use strict'
// Requiere
var express = require('express');
var app = express();

// Importar controlador de usuario
var Competencia = require('../controllers/competencia');


// RUTAS, CRUD

// ==================
// Obtener competencias
// ==================
app.get('/', Competencia.getCompetencias);

// ==================
// Obtener competencias de una ciudad
// ==================
app.get('/1/:ciudad', Competencia.getCompetenciasCiudad);

// ==================
// Obtener competencias registradas por x usuario
// ==================
app.get('/2/:username', Competencia.getCompetenciaPersonal);

// ==================
// Crear competencia
// ==================
app.post('/', Competencia.insertCompetencia);

// ==================
// Eliminar competencia
// ==================
app.delete('/:id', Competencia.deleteCompetencia);


// Exportar
module.exports = app;