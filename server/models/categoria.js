const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type: String,
        unique: true,
        required: ['La descripcion es obligatoria']
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'usuario'
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema)