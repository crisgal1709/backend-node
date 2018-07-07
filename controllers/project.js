'use strict'

var Project = require('../models/project');
var fs = require('fs');
var io = require('../socket');

var controller = {

	home: function(req, res){

		
	io.emit('prueba', req.query )
	res.status(200);

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
		Project.find({}).sort('-year').exec((err, projects) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los projectos... ' + err});

			if (!projects) return res.status(404).send({error: 1, message: "No hay projectos disponibles."});

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

	uploadImage: function(req, res){
		var projectId = req.params.id;
		var fileName = "Imagen no subida";

		if (req.files) {

			var filePath = req.files.image.path;
			console.log(filePath)
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

}


module.exports = controller;