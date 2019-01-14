'use strict'
var connection = require('../config/conexion').connection;

// ==================
// Revisar vigencia del usuario
// ==================
exports.verificaUsuario = function(req, res, next) {
    const username = (req.params.username) ? req.params.username : req.body.username;

    if (username == null || username.length < 1) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al buscar el usuario',
            errors: { message: 'No existe un usuario con ese username' }
        });
    }

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
                    mensaje: 'Error al buscar el usuario',
                    errors: { message: 'No existe un usuario con ese username' }
                });
            }

            next();

        });
    }
}