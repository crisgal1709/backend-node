'use strict'

var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');

var SocketController = require('../controllers/socket');

router.get('/home', SocketController.home);
router.get('/url', SocketController.url);

module.exports = router;

