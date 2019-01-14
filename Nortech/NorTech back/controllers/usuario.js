'use strict'
// REQUIRES
var connection = require('../config/conexion').connection;
// Encriptador
var bcrypt = require('bcrypt');
// creamos un objeto para ir almacenando todo lo que necesitemos
var Usuario = {};

// ==================
// Obtener usuarios
// ==================
Usuario.getUsers = function(req, res) {

    if (connection) {
        connection.query('SELECT * FROM usuario ORDER BY id', function(err, result) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuarios',
                    error: err.code
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
// Obtener usuario por ID
// ==================
Usuario.getUser = function(req, res) {

    var id = req.params.id;

    if (connection) {
        var sql = 'SELECT * FROM usuario WHERE id = ' + connection.escape(id);
        connection.query(sql, function(err, result) {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar el usuario',
                    error: err.code
                });
            }
            // Si no retorna nada
            if (!result.length) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Sin resultados...'
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
        password: bcrypt.hashSync(body.password, 10),
        edad: body.edad
    };

    if (userData.edad < 18) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear usuario',
            error: { message: 'Edad minima: 18' }
        });
    }

    if (connection) {
        connection.query('INSERT INTO usuario SET ?', userData, function(err, result) {

            if (err) { // code: ER_DUP_ENTRY, ER_BAD_NULL_ERROR
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear usuario',
                    error: err.code
                });
            } else {
                delete userData.password;
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
// Actualizar Usuario por ID
// ==================
/* Usuario.updateUser = function(req, res) {

} */

// ==================
// Eliminar Usuario por ID
// ==================
Usuario.deleteUser = function(req, res) {

    var id = req.params.id;

    if (connection) {
        connection.query('DELETE FROM usuario WHERE id = ?', id, function(err, result) {


            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar el usuario',
                    error: err.code
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
                    mensaje: 'Usuario Eliminado',
                    affectedRows: result.affectedRows // 1
                });
            }

        });
    }
}


// exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = Usuario;