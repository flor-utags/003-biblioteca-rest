const express = require('express');
const _ = require('underscore');
const app = express();
const Prestamos = require('../models/prestamos');

app.get('/prestamos', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Prestamos.find({ disponible: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuarios', 'nombre email')
        .populate('libros', 'descripcion')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consultar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: prestamos.length,
                prestamos
            });
        });
});

app.post('/prestamos', (req, res) => {
    let pro = new Prestamos({
        articulo: req.body.articulo,
        precioUni: req.body.precioUni,
        libros: req.body.libros,
        disponible: req.body.disponible,
        usuarios: req.body.usuarios
    });

    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un producto',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            proDB
        });
    });
});

app.put('/prestamos/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['articulo', 'precioUni']);

    Prestamos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, proDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }
            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                producto: proDB
            });
        });
});

app.delete('/prestamos/:id', function(req, res) {

    let id = req.params.id;

    Prestamos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Porducto eliminado con exito',
            proDB

        });
    });
});


module.exports = app;