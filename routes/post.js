'use strict'

var express = require('express');
var PostController = require('../controllers/post');
var router = express.Router();

router.get('/', PostController.getPosts);
router.get('/seed', PostController.seed);
router.get('/:id', PostController.show);
router.delete('/:id', PostController.delete);

module.exports = router;