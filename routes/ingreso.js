'use strict'

var express = require('express');
var IngresoController = require('../controllers/ingreso');
var router = express.Router();

router.get('/home', IngresoController.home);
router.get('/ingresos', IngresoController.getIngresos);
router.post('/save-ingreso', IngresoController.saveIngreso);
router.get('/ingreso/:id', IngresoController.getIngreso);
router.put('/ingreso/:id', IngresoController.updateIngreso);
router.delete('/ingreso/:id', IngresoController.deleteIngreso);

module.exports = router;