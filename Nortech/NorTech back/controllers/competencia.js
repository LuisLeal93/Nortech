'use strict'
// REQUIRES
var connection = require('../config/conexion').connection;
// creamos un objeto para ir almacenando todo lo que necesitemos
var Competencia = {};

// ==================
// Obtener competencias
// ==================
Competencia.getCompetencias = function(req, res) {

    if (connection) {
        connection.query(' CALL getCompetencias(); ', function(error, result) { // callback 

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando las competencias',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (result[0] < 1) {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'No hay resultados...'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    competencias: result
                });
            }

        });
    }
}


// ==================
// Obtener competencias de una ciudad
// ==================
Competencia.getCompetenciasCiudad = function(req, res) {

    let ciudad = req.params.ciudad;

    if (connection) {
        ciudad = connection.escape(ciudad);
        let sp = ` CALL getCompetenciasCiudad(${ciudad}); `;
        connection.query(sp, function(error, result) { // callback 

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando las competencias',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (result[0] < 1) {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'No hay resultados...'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    competencias: result
                });
            }

        });
    }
}


// ==================
// Obtener competencias registradas por x usuario
// ==================
Competencia.getCompetenciaPersonal = function(req, res) {

    let username = req.params.username;

    if (connection) {
        username = connection.escape(username);
        let sp = ` CALL getCompetenciaPersonal(${username}); `;
        connection.query(sp, function(error, result) { // callback 

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando las competencias',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (result[0] < 1) {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'No hay resultados...'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    competencias: result
                });
            }

        });
    }
}

// ==================
// Crear competencia
// ==================
Competencia.insertCompetencia = function(req, res) {

    var body = req.body;
    // Obteniendo valores del body
    var competenciaData = {
        name: body.name,
        ciudad: body.ciudad,
        ubicacion: body.ubicacion,
        fecha: body.fecha,
    };

    if (connection) {
        connection.query('INSERT INTO competencia SET ?', competenciaData, function(error, result) {

            if (error) { // code: ER_DUP_ENTRY, ER_BAD_NULL_ERROR
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear competencia',
                    errors: error.code
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    competencia: competenciaData,
                    id: result.insertId
                });
            }

        });
    }
}

// ==================
// Eliminar competencia
// ==================
Competencia.deleteCompetencia = function(req, res) {

    var id = req.params.id;

    if (connection) {
        connection.query('DELETE FROM competencia WHERE id = ?', id, function(error, result) {


            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar la competencia',
                    code: error.code
                });
            }

            if (result.affectedRows === 0) {
                return res.status(501).json({
                    ok: false,
                    mensaje: 'No es posible realizar la eliminación'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'Competencia Eliminada',
                    affectedRows: result.affectedRows // 1
                });
            }

        });
    }
}

// exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = Competencia;