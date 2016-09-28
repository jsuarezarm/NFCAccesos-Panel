var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var puertaSchema = new Schema({
    id: String,
    descripcion: String,
    localizacion: String
});

module.exports = mongoose.model('Puerta', puertaSchema);
