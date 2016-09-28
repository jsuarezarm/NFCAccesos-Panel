var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    id: String,
    usuario: String,
    nombre: String,
    apellidos: String,
    contrasena: String,
    paneladmin: {type: Boolean, default: false},
    permisos: JSON
});

module.exports = mongoose.model('Usuario', usuarioSchema);
