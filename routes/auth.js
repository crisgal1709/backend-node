'use strict'

var express = require('express');
var AuthController = require('../controllers/auth');
var router = express.Router();

router.get('/home', AuthController.home);
router.get('/login', (req, res) => {
	res.render('login')

})
router.post('/signUp', AuthController.signUp);
router.post('/signIn', AuthController.signIn);
router.get('/logout', AuthController.logout)

module.exports = router;