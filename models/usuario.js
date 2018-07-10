'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
	nombres: String,
	apellidos: String,
	usuario: String,
	password: String,
	email: String,
}) 


module.exports = mongoose.model('Ingreso', UsuarioSchema);