'use strict'
// REQUIRES
var connection = require('../config/conexion').connection;

// creamos un objeto para ir almacenando todo lo que necesitemos
var Credito = {};

// ==================
// Obtener todos los creditos
// ==================
Credito.getCredits = function(req, res) {

    if (connection) {

        connection.query(' CALL getAllCredits(); ', function(error, result) { // callback

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando creditos',
                    errors: error.code
                });
            }
            // console.log(result);
            // Si no retorna nada
            if (result[0] < 1) {
                return res.status(200).json({
                    ok: true,
                    mensaje: 'No hay resultados...'
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    creditos: result
                });
            }

        });
    }
}

// ==================
// Obtener creditos de un usuario
// ==================
Credito.getCredit = function(req, res) {

    var username = req.params.username;

    if (connection) {
        username = connection.escape(username);
        var sp = ` CALL getCredits(${username}); `;
        connection.query(sp, function(error, result) {

            if (error) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al buscar los creditos',
                    errors: error.code
                });
            }
            // Si no retorna nada
            /*  if (result[0] < 1) {
                 return res.status(200).json({ // 204
                     ok: true,
                     mensaje: 'Aún No haz realizado ninguna solicitud de credito'
                 });
             } */
            return res.status(200).json({
                ok: true,
                creditos: result
            });

        });
    }
}

// ==================
// Crear peticion credito
// ==================
Credito.insertCredit = function(req, res) {

    var body = req.body;
    // Obteniendo valores del body
    var creditData = {
        username: body.username,
        plazo: body.plazo || 0,
        monto: body.monto || 0
    };
    var plazosValidos = [3, 6, 9];

    // parseo para post-man
    creditData.plazo = parseInt(creditData.plazo);
    creditData.monto = parseInt(creditData.monto);

    // preguntar por tarjeta de credito <---

    if (creditData.monto < 1000 || plazosValidos.indexOf(creditData.plazo) === -1) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear la solicitud',
            errors: { message: 'informacion invalida' }
        });
    }

    if (connection) {
        connection.query('INSERT INTO credito SET ?', creditData, function(error, result) {

            if (error) { // plazo fk, ER_NO_REFERENCED_ROW_2
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al crear la solicitud',
                    errors: error.code
                });
            } else {
                return res.status(200).json({
                    ok: true,
                    credito: creditData,
                    id: result.insertId
                });
            }

        });
    }
}

// ==================
// Actualizar estado credito
// ==================
Credito.updateCredit = function(req, res) {

    var body = req.body;
    var creditData = {
        id: body.id,
        estado: body.estado
    };

    var estadoPermitido = ['aceptado', 'rechazado'];
    if (!estadoPermitido.includes(creditData.estado)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Error al crear la solicitud',
            errors: { message: 'Propiedad invalida' }
        });
    }

    if (connection) {
        var sql = 'UPDATE credito SET estado = ' + connection.escape(creditData.estado) +
            ' WHERE id = ' + connection.escape(creditData.id);

        connection.query(sql, function(error, result) {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la peticion',
                    errors: error.code
                });
            }
            // Si no retorna nada
            if (result.affectedRows === 0) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar la peticion',
                    errors: { message: 'La peticion de credito no existe' }
                });
            }
            res.status(200).json({
                ok: true,
                affectedRows: result.affectedRows,
                estado: creditData.estado
            });
        });
    }
}


// exportamos el objeto para tenerlo disponible en la zona de rutas
module.exports = Credito;