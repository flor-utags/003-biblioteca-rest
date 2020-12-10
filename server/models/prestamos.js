const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let prestamosSchema = new Schema({
    articulo: {
        type: String,
        unique: true,
        required: [true, 'El articulo es obligatorio']
    },
    precioUni: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    libros: {
        type: librosSchema.Types.ObjectId,
        ref: ''
    },
    disponible: {
        type: Boolean,
        default: true
    },
    usuarios: {
        type: Schema.Types.ObjectId,
        ref: 'Usuarios'
    }
});

module.exports = mongoose.model('Prestamos', prestamosSchema);