'use strict'

var Post = require('../models/post');
var dataPosts = require('../data/post')

var controller = {

	seed: function(req, res){
		//return res.send('Seed');
		dataPosts.forEach(function(post, index){
			let postForSave = new Post({
				userId: post.userId,
				title: post.title,
				body: post.body
			});

			postForSave.save((err, stored) => {
				console.log('saved ' + stored._id)
			})
		})
	},

	getPosts: function(req, res){
		let page = req.query.page || 1;
		Post.paginate({}, {page: page, limit: 10}, (err, result) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al recuperar los posts... ' + err});

	        if (!result) return res.status(404).send({error: 1, message: "No hay Posts disponibles."});

			return res.status(200).send({error: 0, posts: result})
		});
	},

	show: function(req, res){
		var id = req.params.id
		Post.findById(id, (err, post) => {
			if (err) {return res.status(500).send({err: 1, message: 'Ocurrió un error'})}

			if (!post) {return res.status(404).send({err: 1, message: 'Post No encontrado'})}

			return res.status(200).send({error: 0, post: post})
		})
	},

	delete: function(req, res){
		var id = req.params.id
		Post.findByIdAndRemove(id, (err, PostRemoved) => {
			if(err) return res.status(500).send({error: 1, message: 'Error al eliminar... ' + err});

			if (!PostRemoved) return res.status(404).send({error: 1, message: "Este proyecto no existe."});

			return res.status(200).send({error: 0, post: PostRemoved, message: 'Post eliminado con éxito'});
		})
	}

}

module.exports = controller;