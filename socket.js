'use strict'


var app = require('./app');

//var server = require('http').Server(app);

var io = require('socket.io')(app)

//Sockets
var messages = [
	{
		id: 1,
		text: 'Bienvenido al chat privado de NodeJs y Socket.io de Cristian Galeano',
		nickname: 'Bot - @cristiangno'
	}
];

io.on('connection', (socket) => {
	//console.log('El nodo con IP: ' + socket.handshake.address + ' Se ha conectado');
	socket.emit('messages', messages);

	socket.on('addMessage', function(data) {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});

	socket.on('verificar_paciente_atencion', function(data){
		var mensaje = {
			on: true
		};
		io.sockets.emit('paciente_atencion', mensaje);
	})

});

module.exports = io;