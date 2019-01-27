'use strict'

var express = require('express');
var hbs = require('express-handlebars')
var bodyParser = require('body-parser');
var app = express();
var config = require('./config')


//cargar archivos de Rutas
var project_routes = require('./routes/project');
var socket_routes = require('./routes/socket');
var ingreso_routes = require('./routes/ingreso');
var auth_routes = require('./routes/auth');
var sports_routes = require('./routes/sports');
var base_routes = require('./routes/base');
var tasks_routes = require('./routes/tasks');
var posts_routes = require('./routes/post');

app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs',
}))

app.set('view engine', '.hbs')


//Middelaware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



// Configurar cabeceras y cors
app.use((req, res, next) => {
	config.hostname = req.headers.host
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, X-SOCKET-ID, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.get('/projects', (req, res) => {
	return res.render('projects')
})
app.use('/api', project_routes);
app.use('/ingresos', ingreso_routes);
app.use('/auth', auth_routes);

app.use('/sports', sports_routes)

app.use('/base', base_routes)
app.use('/tasks', tasks_routes)

app.use('/posts', posts_routes)



module.exports = app;