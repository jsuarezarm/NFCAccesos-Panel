var mongoose = require('mongoose');
var Puerta = require('../models/puerta');

var error = {'response' : 404};
var error_400 = {'response' : 400};
var ok = {'response' : 201};

exports.nueva = function(req, res){
    var puertanueva = new Puerta({
        id: req.body.idpuerta,
        descripcion: req.body.descripcion,
        localizacion: req.body.localizacion
    });
    puertanueva.save();
    res.redirect('/puertas');
};

exports.getPuertas = function(req, res){
    Puerta.find(function(err, puertas){
        if(!err){
            res.render('puertas', {puertas : puertas});
        }else{
            console.log(err);
            response.send(error);
        }
    });
};

exports.eliminar = function(req, res){
    Puerta.findOne({_id: req.params.id}, function(err, puerta){
        puerta.remove();
        res.redirect('/puertas');
    });
};

exports.getPuerta = function(req, res){
    Puerta.findOne({_id: req.params.id}, function(err, puerta){
        res.render('puerta', {puerta : puerta});
    });
};

exports.editar = function(req, res){
    Puerta.findOne({id: req.body.idpuerta}, function(err, puerta){
        puerta.descripcion = req.body.descripcion;
        puerta.localizacion = req.body.localizacion;
        puerta.save();
        res.redirect('/puertas');
    });
};

/*******************************************************************/

// var firebase = require('firebase');
//
// // firebase.initializeApp({
// //     databaseURL: "https://nfcpruebas-b3738.firebaseio.com/"
// // });
// var db = firebase.database();
//
// var puertas = null;
// var refPuertas = db.ref("/puertas");
// refPuertas.once("value", function(snapshot) {
//     puertas = snapshot.val();
// });
//
// exports.getPuertas = function(req, res){
//     var ref = db.ref("/puertas");
//     var valor = null;
//     ref.once("value", function(snapshot) {
//         users = snapshot.val();
//     });
// };
//
// exports.getvariable = function(){
//     return puertas;
// };
//
// exports.getPuerta = function(id, fn){
//     var ref = db.ref("/puertas/" + id);
//     ref.once("value", function(snapshot) {
//         fn(snapshot.val());
//     });
// }
//
// exports.addPuerta = function(id, des, loc){
//     var ref = db.ref("/puertas/" + id);
//     ref.on("value", function(snapshot) {
//         if(!snapshot.exists()){
//             ref.set({
//                 descripcion: des,
//                 localizacion: loc
//             });
//         }else{
//             console.log("la puerta ya existe");
//         }
//     });
// };
//
// exports.delPuerta = function(id){
//     var ref = db.ref("/puertas/" + id);
//     ref.remove();
// };
//
// exports.editPuerta = function(id, des, loc){
//     var ref = db.ref("/puertas/" + id);
//     ref.on("value", function(snapshot) {
//         ref.set({
//             descripcion: des,
//             localizacion: loc
//         });
//     });
// };
