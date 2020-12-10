const express = require('express');
const _ = require('underscore');
const app = express();
const Libros = require('../models/libros');

app.get('/libros', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Libros.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuarios', 'nombre email')
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al listar las categorias',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Libros listadas con exito',
                conteo: libros.length,
                libros
            });
        });
});

app.post('/libros', (req, res) => {
    let cat = new Libros({
        descripcion: req.body.descripcion,
        usuarios: req.body.usuarios
    });

    cat.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un libro',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libros insertada con exito',
            catDB
        });
    });
});

app.put('/libros/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion', 'usuarios']);

    Libros.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, catDB) => {
            if (err) {
                return res.status(400).json({
                    ok: true,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Categoria actualizada con exito',
                catDB
            });
        });
});

app.delete('/libros/:id', (req, res) => {
    let id = req.params.id;

    Libros.findByIdAndRemove(id, { context: 'query' }, (err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'La categoria fue eliminada con exito',
            catDB
        });
    });
});

module.exports = app;