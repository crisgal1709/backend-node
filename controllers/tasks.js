'use strict'

var Task = require('../models/task');

var controller = {
	home: function(req, res){
		Task.find({}).exec((err, tasks) => {
			if (err) {return res.status(500).send({error: 1, message: 'Error ' + err})}
			if (!tasks) {return res.status(404).send({error: 0, message: 'No hay tareas disponibles'})}

			return res.status(200).send({error: 0, tasks: tasks})
		})
	},

	save: function(req, res){
		var body = req.body.body;

		var task = new Task();

		task.body = body;
		task.completed = false;

		return task.save((err, taskSaved) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al guardar la tarea ' + err});
			if (!taskSaved) return res.status(404).send({error: 1, message: "No se ha podido guardar la tarea."});

			return res.status(200).send({error: 0, task: taskSaved});
		})
	},

	update: function(req, res){
		var _id = req.params.id;
		var task = req.body;
		console.log(task)

		Task.findByIdAndUpdate(_id, task, {new: true}, (err, taskUpdated) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al actualizar... ' + err});
			if (!taskUpdated) return res.status(404).send({error: 1, message: "Esta tarea no existe."});
			return res.status(200).send({error: 0, task: taskUpdated});
		})
	},

	delete: function(req, res){
		var _id = req.params.id;
		Task.findByIdAndRemove(_id, (err, taskRemoved) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al Eliminar... ' + err});
			if (!taskRemoved) return res.status(404).send({error: 1, message: "Este proyecto no existe."});
			return res.status(200).send({error: 0, task: taskRemoved, message: 'Tarea eliminado con éxito'});
		})
	}
}

module.exports = controller;