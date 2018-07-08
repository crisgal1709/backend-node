'use strict'


var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT_SOCKET || 3001;

server.listen(port, function(){
	console.log('El servidor está funcionando en :' + port);
});

app.get('/', (req, res)=> {
	console.log(req.query);
	io.emit('prueba', req.query )
	res.status(200).send('si');
});

//Sockets
var messages = [
	{
		id: 1,
		text: 'Bienvenido, si está aquí por error, no hay nada especial, son solo pruebas con Socket.io',
		nickname: 'Bot - cristiangno'
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