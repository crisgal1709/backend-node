'use strict'

var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
	userId: String,
	title: String,
	body: String,
})

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);