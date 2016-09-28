var Usuario = require('../models/usuario');

exports.autenticar = function(login, password, callback){
    Usuario.findOne({usuario: login}, function(err, usuario){
        console.log(usuario);
        if(usuario){
            if(password === usuario.contrasena && usuario.paneladmin){
                callback(null, usuario.nombre);
            }else{
                callback(new Error('Password erróneo.'));
            }
        }else{
            callback(new Error('No existe el usuario'));
        }
    });
};

// var users = {
//     admin: {id:1, username:"admin", password:"1234"},
//     pepe: {id:2, username:"pepe", password:"5678"}
// };
//
// exports.autenticar = function(login, password, callback){
//     console.log(users[login]);
//
//     if(users[login]){
//         if(password === users[login].password){
//             console.log(users[login]);
//             callback(null, users[login]);
//
//         }else{
//             callback(new Error('Password erróneo.'));
//         }
//     }else{
//         callback(new Error('No existe el usuario'));
//     }
// };
