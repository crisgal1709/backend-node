'use strict'

var express = require('express');
var BaseController = require('../controllers/controller');
var router = express.Router();

router.get('/', (req, res) => {
	res.send('Hola');
})
router.get('/email', BaseController.sendEmail)
router.get('/changePassword', (req, res) => {
	res.send({message: 'Unavailable'})
});

module.exports = router;