var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var registroSchema = new Schema({
    fechayhora: String,
    usuario: String,
    puerta: String,
    acierto: {type: Boolean, default: false}
});

module.exports = mongoose.model('Registro', registroSchema);
