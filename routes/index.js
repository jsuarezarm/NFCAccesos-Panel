var express = require('express');
var router = express.Router();

var sessionController = require('../controllers/session_controller.js');
var usuarios = require('../controllers/usuarios.js');
var puertas = require('../controllers/puertas.js');
var registro = require('../controllers/registro.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Rutas de usuarios */
router.get('/usuarios', sessionController.loginRequired, usuarios.getUsuarios);
router.post('/adduser', sessionController.loginRequired, usuarios.nuevo);
router.get('/usuarios/delete/:id', sessionController.loginRequired, usuarios.eliminar);
router.get('/usuarios/edit/:id', sessionController.loginRequired, usuarios.getUsuario);
router.post('/usuarios/edit/edituser', sessionController.loginRequired, usuarios.editar);

// router.post('/usuarios/edit/permisos', sessionController.loginRequired, function(req, res){
//     usuarios.editPermissions(req.body.usuarioid, req.body.permisos);
//     res.redirect('/usuarios');
// });

router.post('/usuarios/edit/permisos', sessionController.loginRequired, usuarios.permisos);

/* Rutas de las puertas */
router.get('/puertas', sessionController.loginRequired, puertas.getPuertas);
router.post('/addpuerta', sessionController.loginRequired, puertas.nueva);
router.get('/puertas/delete/:id', sessionController.loginRequired, puertas.eliminar);
router.get('/puertas/edit/:id', sessionController.loginRequired, puertas.getPuerta);
router.post('/puertas/edit/editpuerta', sessionController.loginRequired, puertas.editar);

/* Rutas del registro de accesos */
router.get('/registro', sessionController.loginRequired, registro.getRegistro);

/* Rutas de sesion */
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

/* Rutas para abrir las puertas */
router.post('/abrirpuerta', usuarios.abrirpuerta);

module.exports = router;
