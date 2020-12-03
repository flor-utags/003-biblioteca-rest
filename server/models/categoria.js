const mongoose = require('mongoose');
const Schema = moongose.Schema;

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

Module.exports = mongoose.model('Categoria', CategoriaSchema)