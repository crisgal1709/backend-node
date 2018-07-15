'use strict'

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var app = require('./app');
var port = process.env.PORT || 3000;
var urlMongo = process.env.MONGODB_URI || 'mongodb+srv://crisgal:thewise@cluster0-0rg4n.mongodb.net/test?retryWrites=true';


mongoose.connect(urlMongo)
				.then(() => {
					console.log('Conexión a la base de datos establecida exitosamente');

					//Creación del servidor
					app.listen(port, () => {
						console.log('Servidor corriendo correctamente en el puerto ' + port);
					});
					
				})
				.catch(err => console.log(err))

