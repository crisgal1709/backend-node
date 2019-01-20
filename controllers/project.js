'use strict'

var Project = require('../models/project');
var User = require('../models/user');
var path = require('path')
var fs = require('fs');
var Controller = require('./controller');
var util = require('../utils');


var controller = {

	home: function(req, res){
		return res.status(200).send('hola, Projects');
	}, 

	test: function(req, res){
		return res.status(200).send({
				  	message: 'Soy el método Test del controlador Project'
			   });
	},

	saveProject: function(req, res){
		var project = new Project();

		var params = req.body;

		project.name        = params.name;
		project.description = params.description;
		project.year        = params.year;
		project.category    = params.category;
		project.langs       = params.langs;
		project.image       = null;
		project.user_id     = null;

		return project.save((err, projectStored) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al guardar el projecto ' + err});

			if (!projectStored) return res.status(404).send({error: 1, message: "No se ha podido guardar el projecto."});

			return res.status(200).send({error: 0, project: projectStored});
		})
	},

	getProject: function(req, res){
		var projectId = req.params.id;

		if (projectId == null) return res.status(404).send({error: 1, message: "El projecto no existe."});
		Project.findById(projectId, (err, project) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al buscar el projecto ' + err});

			if (!project) return res.status(404).send({error: 1, message: "El projecto no existe."});

			return res.status(200).send({err: 0, project: project});
		});
	}, 

	getProjects: function(req, res){
		// var user = new User();
		// user.nombres = 'Cristian';
		// user.apellidos = 'Galeano'
		// user.usuario = 'cristiangno';
		// user.password = 'secret';
		// user.email = 'cr@gmail.com';
		// console.log(user);
		// user.save((err, userStored) => {
		// 	console.log(userStored);
		// })
		
		Project.find({}).sort('-year').exec((err, projects) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los Proyectos... ' + err});

			if (!projects) return res.status(404).send({error: 1, message: "No hay proyectos disponibles."});

			//res.cookie('cookieName',333, { maxAge: 900000, httpOnly: true });

			return res.status(200).send({error: 0, projects: projects})
		});
	}, 

	updateProject: function(req, res){

		var projectId = req.params.id;
		var update = req.body;

		Project.findByIdAndUpdate(projectId, update, {new:true}, (err, projectUpdated) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al actualizar... ' + err});

			if (!projectUpdated) return res.status(404).send({error: 1, message: "Este proyecto no existe."});

			return res.status(200).send({error: 0, project: projectUpdated});
		})

	},

	deleteProject: function(req, res){

		var projectId = req.params.id;

		Project.findByIdAndRemove(projectId, (err, projectRemoved) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al eliminar... ' + err});

			if (!projectRemoved) return res.status(404).send({error: 1, message: "Este proyecto no existe."});

			return res.status(200).send({error: 0, project: projectRemoved, message: 'Proyecto eliminado con éxito'});
		})

	},

	deleteAllProjects: function(req, res){
		Project.findByIdAndRemove('5b42811c901412568fedfa5e', (err, projectRemoved) => {
			console.log(err)
			console.log(projectRemoved)
		})

		res.status(200).send({si: 'si'})
	},

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Imagen no subida";

		if (req.files) {

			var filePath = req.files.image.path;
			
			var fileSplit = filePath.split("/");
			var fileName = fileSplit[1];

			var extSplit = fileName.split('.');
			var fileExt = extSplit[1];

			if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {

				return Project.findByIdAndUpdate(projectId, {image: fileName}, {new:true}, (err, projectUpdated) => {
					if(err) return res.status(500).send({error: 1, message: 'Error al subir la imagen al proyecto... ' + err});

					if (!projectUpdated) return res.status(404).send({error: 1, message: "Este proyecto no existe."});

					return res.status(200).send({error: 0, project: projectUpdated});
				})
			} else {
				fs.unlink(filePath, function(err) {
					res.status(200).send({error: 1, message: "La extensión no es válida"})
				})
			}

		} else {
			return res.status(200).send({message: fileName});
		}
	},

	getImageFile(req, res){
		var file = req.params.image;
		var path_file = './uploads/'+file;

		fs.exists(path_file, (exists) => {
			if (exists) {
				return res.sendFile(path.resolve(path_file));
			} else {
				res.status(200).send({
					error: 1,
					message: 'No existe la imagen',
				})
			}
		})
	},


}


module.exports = controller;