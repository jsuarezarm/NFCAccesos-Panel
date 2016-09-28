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
