var mongoose = require('mongoose');
var Usuario = require('../models/usuario');
var Puerta = require('../models/puerta');
var Registro = require('../models/registro');

var error = {'response' : 404};
var error_400 = {'response' : 400};
var ok = {'response' : 201};

exports.nuevo = function(req, res){
    var usuarionuevo = new Usuario({
        id: req.body.usuarioid,
        usuario: req.body.usuario,
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        contrasena: req.body.contrasena,
        permisos: {}
    });
    usuarionuevo.save();
    res.redirect('/usuarios');
};

exports.getUsuarios = function(req, res){
    Usuario.find(function(err, usuarios){
        if(!err){
            res.render('usuarios', {usuarios : usuarios});
        }else{
            console.log(err);
            response.send(error);
        }
    });
};

exports.eliminar = function(req, res){
    Usuario.findOne({_id: req.params.id}, function(err, usuario){
        usuario.remove();
        res.redirect('/usuarios');
    });
};

exports.getUsuario = function(req, res){
    Usuario.findOne({_id: req.params.id}, function(err, usuario){
        Puerta.find(function(err, puertas){
            res.render('usuario', {usuario : usuario, puertas : puertas});
        });
    });
};

exports.editar = function(req, res){
    Usuario.findOne({id: req.body.usuarioid}, function(err, usuario){
        usuario.usuario = req.body.usuario;
        usuario.nombre = req.body.nombre;
        usuario.apellidos = req.body.apellidos;
        usuario.contrasena = req.body.contrasena;
        usuario.save();
        res.redirect('/usuarios');
    });
};

exports.permisos = function(req, res){
    Usuario.findOne({id: req.body.usuarioid}, function(err, usuario){
        var tmp = {};
        if(req.body.permisos != null){
            if(typeof(req.body.permisos) == "string"){ // Si solo se recibe un permiso (string)
                tmp[req.body.permisos] = "si";
            }else{ // Si se reciben varios permisos (array)
                for(var i = 0; i < req.body.permisos.length; i++){
                    tmp[req.body.permisos[i]] = "si";
                }
            }
        }
        if(req.body.paneladmin){
            usuario.paneladmin = true;
        }else{
            usuario.paneladmin = false;
        }
        usuario.permisos = tmp;
        usuario.save();
        res.redirect('/usuarios');
    });
};

/*** Abrir puerta ***/
exports.abrirpuerta = function(req, res){
    Usuario.findOne({id: req.body.usuarioid}, function(err, usuario){
        if(usuario != null){ // Usuarios registrados en el sistema
            // Enviar datos del usuario
            res.send({
                usuario: usuario.usuario,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                permiso: usuario.permisos[req.body.puerta]
            });

            // Registrar intento de acceso
            acierto_ = false;
            if(usuario.permisos[req.body.puerta] == "si"){
                acierto_ = true;
            }
            var registronuevo = new Registro({
                fechayhora: req.body.fecha,
                usuario: usuario.usuario,
                puerta: req.body.puerta,
                acierto: acierto_
            });
            registronuevo.save();

        }else{ // Usuarios desconocidos
            // Enviar datos del usuario
            res.send({
                usuario: "desconocido",
                nombre: "Usuario desconocido",
                apellidos: "",
                permiso: "no"
            });

            // Registrar intento de acceso
            var registronuevo = new Registro({
                fechayhora: req.body.fecha,
                usuario: "desconocido",
                puerta: req.body.puerta,
                acierto: false
            });
            registronuevo.save();
        }

    });
};
