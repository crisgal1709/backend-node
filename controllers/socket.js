var fs = require('fs');
var io = require('../socket');


var controller = {

	url: function(req, res){
		return res.status(200).send({
			urlSocket: process.env.SOCKET_URI || 'http://localhost:3001'
		})
	},

	home: function(req, res){
		io.emit('backend', {text: 'Mensaje desde el backend ' + Math.floor((Math.random() * 100) + 1), nickname: 'Backend Socket'});
		res.status(200).send('si');
	},

}


module.exports = controller;