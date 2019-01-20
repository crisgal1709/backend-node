'use strict'

var express = require('express');
var TasksController = require('../controllers/tasks');
var router = express.Router();

router.get('/', TasksController.home);
router.post('/save', TasksController.save)
router.put('/update/:id', TasksController.update);
router.delete('/delete/:id', TasksController.delete)

module.exports = router;