'use strict'

var io = require ('socket.io');

var cubic = {};

var apps = [
	'1234',
	'9876',
];

var socket = {};

cubic.getSocket = function getSocket(){
	return io;
}

cubic.socketConnection = function socketConnection(socket){
	socket.emit('message', {message: 'Hey!'});
};

cubic.startIo = function startIo(server){
	io = io.listen(server);

	io.use((socket, next) => {
		//let app = socket.handshake.query.app;
		let app = '1234';

		if (apps.indexOf(app) > -1) {
			return next();
		}

		return next(new Error('authentication error'));
	})
	
	io.on('connection', cubic.socketConnection);
	
	return io;
};

cubic.events = function(io, req, res){
	io.emit(req.body.event, req.body)
	//console.log(req.body)
	console.log('desde el backend');
	res.status(200).send({error: 0, message: 'Broadcast succesfully'});
}

module.exports = cubic;

