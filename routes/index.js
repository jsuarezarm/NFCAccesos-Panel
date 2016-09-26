var express = require('express');
var router = express.Router();

var sessionController = require('../controllers/session_controller.js');

var usuarios = require('../controllers/usuarios.js');
allUsers = usuarios.getUsers();

var puertas = require('../controllers/puertas.js');
allPuertas = puertas.getPuertas();

var registro = require('../controllers/registro.js');
allAttempts = registro.getLogs();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET usuarios page. */
router.get('/usuarios', sessionController.loginRequired, function(req, res, next){
    allUsers = usuarios.getUsers();
    usu = usuarios.getvariable();
    res.render('usuarios', { usuarios : usu });
});

router.post('/adduser', sessionController.loginRequired, function(req, res){
    usuarios.addUser(req.body.usuarioid, req.body.usuario, req.body.nombre, req.body.apellidos, req.body.contrasena);
    allUsers = usuarios.getUsers();
    usu = usuarios.getvariable();
    // res.render('usuarios', { usuarios : usu });
    res.redirect('/usuarios');
});

router.get('/usuarios/delete/:id', sessionController.loginRequired, function(req, res){
    usuarios.delUser(req.params.id);
    allUsers = usuarios.getUsers();
    usu = usuarios.getvariable();
    // res.render('usuarios', { usuarios : usu });
    res.redirect('/usuarios');
});

router.get('/usuarios/edit/:id', sessionController.loginRequired, function(req, res){
    usuarios.getUsuario(req.params.id, function(data){

        allPuertas = puertas.getPuertas();
        pue = puertas.getvariable();

        res.render('usuario', { usuario : data, usuarioid : req.params.id, puertas : pue });
    });
});

router.post('/usuarios/edit/edituser', sessionController.loginRequired, function(req, res){
    usuarios.editUsuario(req.body.usuarioid, req.body.usuario, req.body.nombre, req.body.apellidos, req.body.contrasena);
    res.redirect('/usuarios');
});

router.post('/usuarios/edit/permisos', sessionController.loginRequired, function(req, res){
    usuarios.editPermissions(req.body.usuarioid, req.body.permisos);
    res.redirect('/usuarios');
});

/* GET puertas page. */
router.get('/puertas', sessionController.loginRequired, function(req, res, next){
    allPuertas = puertas.getPuertas();
    pue = puertas.getvariable();
    res.render('puertas', { puertas : pue });
});

router.post('/addpuerta', sessionController.loginRequired, function(req, res){
    puertas.addPuerta(req.body.idpuerta, req.body.descripcion, req.body.localizacion);
});

router.get('/puertas/delete/:id', sessionController.loginRequired, function(req, res){
    puertas.delPuerta(req.params.id);
    allPuertas = puertas.getPuertas();
    pue = puertas.getvariable();
    // res.render('puertas', { puertas : pue });
    res.redirect('/puertas');
});

router.get('/puertas/edit/:id', sessionController.loginRequired, function(req, res){
    puertas.getPuerta(req.params.id, function(data){
        res.render('puerta', { puerta : data, puertaid : req.params.id });
    });
});

router.post('/puertas/edit/editpuerta', sessionController.loginRequired, function(req, res){
    puertas.editPuerta(req.body.idpuerta, req.body.descripcion, req.body.localizacion);
    res.redirect('/puertas');
});

/* GET registro page. */
router.get('/registro', sessionController.loginRequired, function(req, res, next){
    allAttempts = registro.getLogs();
    int = registro.getvariable();
    res.render('registro', { intentos : int });
});

/* Rutas de sesion */
router.get('/login', sessionController.new);
router.post('/login', sessionController.create);
router.get('/logout', sessionController.destroy);

module.exports = router;
