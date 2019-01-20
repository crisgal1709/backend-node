'use strict'

var User = require('../models/user');
var path = require('path')
var fs = require('fs');
var services = require('../services')

var controller = {

	home: function(req, res){
		return res.send('Hola, Auth')
	},

	signUp: function(req, res){

		if (!req.body.password) {
			return res.status(200)
					.send({
						message: 'Ingresa una contraseña'
					})
		}	

		var password = services.hashPassword(req.body.password)
		console.log(password)
		if (!password) {
			return res.status(500)
					.send({
						message: 'Ocurrió un error al generar el registro'
					})
		}

		const user = new User({
			email: req.body.email,
			displayName: req.body.displayName,
			password: password
		})

		user.save((err, userStored) => {
			if (err) {return res.status(500).send('Error al crear el usuario ' + err)}

			return res.status(200).send({token: services.createToken(user)})
		})
	},

	signIn: function(req, res){
		console.log(req.body)
		//return res.send({hola: 'mundo'})
		User.findOne({email: req.body.email}, (err, user) => {
			if(err) return res.status(500).send({message: 'Ha ocurrido un error ' + err})
			if (!user) return res.status(404).send({message: 'No existe el usuario'})

			if (!services.comparePassword(req.body.password, user.password)) {
				return res.status(401).send({message: 'Contraseña incorrecta'})				
			}

			req.user = user;
			res.status(200).send({
				message: 'Te has logueado correctament',
				token: services.createToken(user)
			})

		})
	},

	logout: function(req, res){
		 const token = req.headers.authorization.split(' ')[1]
		 services.decodeToken(token)
		 			.then(response => {
		 				req.user = null;
		 				return res.send({
		 					error: 0, message: 'Logout'
		 				})
		 			})
		 			.catch(error => {
		 				return res.status(500)
		 							.send({
		 								error: 1, message: 'Error ' + error
		 							})
		 			})
		 
	}


}

module.exports = controller;