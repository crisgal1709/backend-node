'use strict'

var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var IngresoSchema = Schema({
	fecha: String,
	monto: String,
	observaciones: String,
}) 

IngresoSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Ingreso', IngresoSchema);