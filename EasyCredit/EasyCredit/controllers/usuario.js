'use strict'
// REQUIRES
var connection = require('../config/conexion').connection;

// creamos un objeto para ir almacenando todo lo que necesitemos
var Usuario = {};

// ==================
// Obtener usuarios
// ==================
Usuario.getUsers = function(req, res) {

    if (connection) {
        connection.query('SELECT * FROM usuario ORDER BY id', function(error, result) {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (!result.length) {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'No hay resultados...',
                });
            }
            return res.status(200).json({
                ok: true,
                usuarios: result
            });

        });
    }
}

// ==================
// Obtener usuario
// ==================
Usuario.getUser = function(req, res) {

    var username = req.params.username;

    if (connection) {
        var sql = 'SELECT * FROM usuario WHERE username = ' + connection.escape(username);
        connection.query(sql, function(error, result) {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el usuario',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (!result.length) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese username', // mensaje: 'Usuario con username ' + username + ' no existe',
                    errors: { message: 'No existe un usuario con ese username' }
                });
            }
            return res.status(200).json({
                ok: true,
                usuario: result
            });

        });
    }
}

// ==================
// Crear Usuario
// ==================
Usuario.insertUser = function(req, res) {

    var body = req.body;
    // Obteniendo valores del body
    var userData = {
        username: body.username,
        edad: body.edad
    };

    if (userData.edad < 20) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear usuario',
            errors: { message: 'Edad minima: 20' }
        });
    }

    if (connection) {
        connection.query('INSERT INTO usuario SET ?', userData, function(error, result) {

            if (error) { // code: ER_DUP_ENTRY, ER_BAD_NULL_ERROR
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear usuario',
                    errors: error.code
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    usuario: userData,
                    id: result.insertId
                });
            }

        });
    }
}

// ==================
// Actualizar Usuario
// ==================
Usuario.updateUser = function(req, res) {
    var body = req.body;

    var userData = {
        username: body.username,
        tarjetaCredito: body.tarjetaCredito
    };

    if (connection) {
        var sql = 'UPDATE usuario SET tarjetaCredito = ' + connection.escape(userData.tarjetaCredito) +
            ', updated_at = CURDATE() ' +
            ' WHERE username = ' + connection.escape(userData.username);

        connection.query(sql, function(error, result) {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (result.affectedRows === 0) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario', // Usuario con username ' + userData.username + ' no existe.
                    errors: { message: 'No existe un usuario con ese username' }
                });
            }
            res.status(200).json({
                ok: true,
                mensaje: userData.tarjetaCredito,
                affectedRows: result.affectedRows
            });
        });
    }
}


// exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = Usuario;