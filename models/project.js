'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProjectSchema = Schema({
	name: String,
	description: String,
	year: Number,
	category: String,
	langs: String,
	image: String,
	user_id: { type: Schema.Types.ObjectId, ref: 'User' }
}) 


module.exports = mongoose.model('Project', ProjectSchema);