'use strict'

var Ingreso = require('../models/ingreso');

var controller = {

	home: function(req, res){
		return res.status(200).send({
			message: 'Hola, soy el home de Ingreso controller'
		})
	},

	saveIngreso: function(req, res){
		var ingreso = new Ingreso();

		var params = req.body;

		ingreso.fecha = params.fecha;
		ingreso.monto = params.monto;
		ingreso.observaciones = params.observaciones;

		return ingreso.save((err, ingresoStored) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al guardar el ingreso ' + err});

			if (!ingresoStored) return res.status(404).send({error: 1, message: "No se ha podido guardar el ingreso."});

			return res.status(200).send({error: 0, ingreso: ingresoStored});
		})
	},

	getIngreso: function(req, res){
		var ingresoId = req.params.id;

		if (ingresoId == null) return res.status(404).send({error: 1, message: "El ingreso no existe."});
		Ingreso.findById(ingresoId, (err, ingreso) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al buscar el Ingreso ' + err});

			if (!ingreso) return res.status(404).send({error: 1, message: "El Ingreso no existe."});

			return res.status(200).send({err: 0, ingreso: ingreso});
		});
	}, 

	// getIngresos: function(req, res){
	// 	Ingreso.find({}).sort('-fecha').exec((err, ingresos) => {
	// 		if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los ingesos... ' + err});

	// 		if (!ingresos) return res.status(404).send({error: 1, message: "No hay ingresos disponibles."});

	// 		return res.status(200).send({error: 0, ingresos: ingresos})
	// 	});
	// }, 

	getIngresos: function(req, res){
		let page = req.query.page || 1;
		Ingreso.paginate({}, {page: page, limit: 5}, (err, result) => {
		 	if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los ingesos... ' + err});

	        if (!result) return res.status(404).send({error: 1, message: "No hay ingresos disponibles."});

			return res.status(200).send({error: 0, ingresos: result})
		})
	},

	updateIngreso: function(req, res){

		var ingresoId = req.params.id;
		var update = req.body;

		Ingreso.findByIdAndUpdate(ingresoId, update, {new:true}, (err, ingresoUpdated) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al actualizar... ' + err});

			if (!ingresoUpdated) return res.status(404).send({error: 1, message: "Este ingreso no existe."});

			return res.status(200).send({error: 0, ingreso: ingresoUpdated});
		})

	},

	deleteIngreso: function(req, res){

		var ingresoId = req.params.id;

		Ingreso.findByIdAndRemove(ingresoId, (err, ingresoRemoved) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al eliminar... ' + err});

			if (!ingresoRemoved) return res.status(404).send({error: 1, message: "Este proyecto no existe."});

			return res.status(200).send({error: 0, ingreso: ingresoRemoved, message: 'Ingreso eliminado con éxito'});
		})

	},
	

}

module.exports = controller;