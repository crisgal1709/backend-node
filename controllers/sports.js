'use strict'

const axios = require('axios')
var cycle = require('../utils/cycle')

const urlApi = 'https://api.sportradar.us/soccer-t3/am/es/schedules/2018-12-01/results.json?api_key=3rtfdm6vkjgbqn6h7c6q93bd'

var controller = {
	home: function(req, res){
		axios.get(urlApi, {
					dataType: 'any',
					cache: false
				})
				.then(response => {
					var json = CircularJSON.stringify(response);
					var jsonString = JSON.stringify(JSON.decycle(response));
					// var restoredObject = JSON.retrocycle(JSON.parse(jsonString));
					// console.log(restoredObject)

					res.status(200).json(jsonString)
				})
				.catch(err => {
					res.send({err: 1, message: 'Error: ' + err})
				})
	}
}

module.exports = controller;