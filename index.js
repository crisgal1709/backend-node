'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var port = process.env.PORT || 3000;
var urlMongo = process.env.MONGODB_URI || 'mongodb+srv://crisgal:thewise@cluster0-0rg4n.mongodb.net/test?retryWrites=true';
var cubic = require('./socket');



mongoose.connect(urlMongo)
				.then(() => {
					console.log('Conexión a la base de datos establecida exitosamente');

					//Creación del servidor
					var server = app.listen(port, () => {
						console.log('Servidor corriendo correctamente en el puerto ' + port);
					});

					var io = cubic.startIo(server);
					app.post('/event-post', (req, res) => {
						cubic.events(io, req, res);
					})
					
				})
				.catch(err => console.log(err))


