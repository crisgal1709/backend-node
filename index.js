'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var port = 3700;


mongoose.connect('mongodb://localhost:27017/portafolio')
				.then(() => {
					console.log('Conexión a la base de datos establecida exitosamente');

					//Creación del servidor
					app.listen(port, () => {
						console.log('Servidor corriendo correctamente en localhost:3700');
					});

					
				})
				.catch(err => console.log(err))

