'use strict'

var express = require('express');
var SportsController = require('../controllers/sports');
var router = express.Router();

router.get('/', (req, res) => {
	return res.render('sports')
})
router.get('/home', SportsController.home)

module.exports = router;