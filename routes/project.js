'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');
const authenticate = require('../middleware/authenticate')

var router = express.Router();

//para poder subir archivos
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart({uploadDir: './uploads'})

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', authenticate, ProjectController.saveProject);
router.get('/project/:id', authenticate, ProjectController.getProject);
router.get('/projects', authenticate, ProjectController.getProjects);
router.put('/project/:id', authenticate, ProjectController.updateProject);
router.delete('/project/:id', authenticate, ProjectController.deleteProject);
router.get('/delete-all', authenticate, ProjectController.deleteAllProjects);
router.post('/upload-image/:id', authenticate, multipartMiddleware, ProjectController.uploadImage);
router.get('/get-image/:image', authenticate, ProjectController.getImageFile)

router.get('/private', authenticate, function(req, res){
	return res.send('Esta ruta es privada');
});

module.exports = router;