'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var TaskSchema = Schema({
	body: String,
	completed: Boolean,
	observaciones: String
})

module.exports = mongoose.model('Task', TaskSchema);