const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let librosSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: ['La descripcion es obligatoria']
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'usuarios'
    }
});

module.exports = mongoose.model('Libros', librosSchema)