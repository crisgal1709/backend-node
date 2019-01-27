'use strict'

var express = require('express');
var IngresoController = require('../controllers/ingreso');
var router = express.Router();

router.get('/home', IngresoController.home);
router.get('/', IngresoController.getIngresos);
router.post('/save', IngresoController.saveIngreso);
router.get('/:id', IngresoController.getIngreso);
router.put('/:id', IngresoController.updateIngreso);
router.delete('/:id', IngresoController.deleteIngreso);

module.exports = router;