'use strict'

const config = require('./config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var cubic = require('./socket');

mongoose.connect(config.urlMongo)
				.then(() => {
					console.log('Conectado a la base de datos ' + config.urlMongo );
					
				})
				.catch(err => console.log(err))

//Creación del servidor
var server = app.listen(config.port, () => {
	console.log('Servidor corriendo correctamente en el puerto ' + config.port);
});

var io = cubic.startIo(server);

app.post('/event-post', (req, res) => {
	console.log(req.body)
	cubic.events(io, req, res);
})


