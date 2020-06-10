var mongoose = require('mongoose');
var Reserva = require('./reserva');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
})

usuarioSchema.methods.reservar = function(figId , desde, hasta, cb) {
    var reserva = new Reserva({usuario: this._id, figura: figId, desde: desde, hasta: hasta})
    console.log(reserva);
    reserva.save(cb)
}

module.exports = mongoose.model('Usuario', usuarioSchema);