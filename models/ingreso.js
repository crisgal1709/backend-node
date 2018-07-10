'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var IngresoSchema = Schema({
	fecha: String,
	monto: String,
	observaciones: String,
}) 


module.exports = mongoose.model('Ingreso', IngresoSchema);