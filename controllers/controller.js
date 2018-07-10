'use strict'

var baseController = {

	getAll: function(req, res, model, name, sort = '-year' ){

		model.find({}).sort(sort).exec((err, all) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los registros... ' + err});

			if (!all) return res.status(404).send({error: 1, message: "No hay registros disponibles."});

			return res.status(200).send({error: 0, data: all})
		});

	}

};


module.exports = baseController;