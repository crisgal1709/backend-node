var fs = require('fs');
var app = require('../app')
var cubic = require('./socket');

var controller = {

	home: function(req, res){
		console.log(io)
		res.status(200).send({err: 1 });
		
	},

}


module.exports = controller;