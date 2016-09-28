var mongoose = require('mongoose');
var Registro = require('../models/registro');

var error = {'response' : 404};
var error_400 = {'response' : 400};
var ok = {'response' : 201};

exports.getRegistro = function(req, res){
    Registro.find(function(err, registro){
        if(!err){
            res.render('registro', {registro : registro});
        }else{
            console.log(err);
            response.send(error);
        }
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
// var logs = null;
// var refLogs = db.ref("/logs");
// refLogs.once("value", function(snapshot) {
//     logs = snapshot.val();
// });
//
// exports.getLogs = function(req, res){
//     var ref = db.ref("/intentos");
//     var valor = null;
//     ref.once("value", function(snapshot) {
//         logs = snapshot.val();
//     });
// };
//
// exports.getvariable = function(){
//     return logs;
// };
