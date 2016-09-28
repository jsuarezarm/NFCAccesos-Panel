var mongoose = require('mongoose');
var Usuario = require('../models/usuario');
var Puerta = require('../models/puerta');

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

/***********************************************************/

var firebase = require('firebase');
firebase.initializeApp({
    databaseURL: "https://nfcpruebas-b3738.firebaseio.com/"
});
// var db = firebase.database();
//
// var users = null;
// var refUsers = db.ref("/users");
// refUsers.once("value", function(snapshot) {
//     users = snapshot.val();
// });
//
// exports.getUsers = function(req, res){
//     var ref = db.ref("/users");
//     var valor = null;
//     ref.once("value", function(snapshot) {
//         users = snapshot.val();
//     });
// };
//
// exports.getvariable = function(){
//     return users;
// };
//
// exports.getUsuario = function(id, fn){
//     var ref = db.ref("/users/" + id);
//     ref.once("value", function(snapshot) {
//         fn(snapshot.val());
//     });
// }
//
// exports.getUser = function(id){
//     var ref = db.ref("/users/" + id);
//
// };
//
// exports.existsUser = function(id){
//     var ref = db.ref("/users/" + id);
//     ref.on("value", function(snapshot) {
//         console.log(snapshot.exists());
//     });
// };
//
// exports.addUser = function(id, us, nom, ape, pass){
//     var ref = db.ref("/users/" + id);
//     ref.on("value", function(snapshot) {
//         if(!snapshot.exists()){
//             ref.set({
//                 username: us,
//                 nombre: nom,
//                 apellidos: ape,
//                 contrasena: pass
//             });
//         }else{
//             console.log("el usuario ya existe");
//         }
//     });
// };
//
// exports.delUser = function(id){
//     var ref = db.ref("/users/" + id);
//     ref.remove();
// };
//
// exports.editUsuario = function(id, us, nom, ape, pass){
//     var ref = db.ref("/users/" + id);
//     ref.on("value", function(snapshot) {
//         ref.set({
//             username: us,
//             nombre: nom,
//             apellidos: ape,
//             contrasena: pass
//         });
//     });
// };
//
// exports.editPermissions = function(id, perm){
//     var tmp = {};
//     for(var i = 0; i < perm.length; i++){
//         tmp[perm[i]] = "si";
//     }
//
//     var ref = db.ref("/users/" + id + "/permisos/");
//     ref.on("value", function(snapshot) {
//         ref.set(tmp);
//     });
// };
