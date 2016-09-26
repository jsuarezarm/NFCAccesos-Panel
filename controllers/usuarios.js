var firebase = require('firebase');

firebase.initializeApp({
    databaseURL: "https://nfcpruebas-b3738.firebaseio.com/"
});
var db = firebase.database();

var users = null;
var refUsers = db.ref("/users");
refUsers.once("value", function(snapshot) {
    users = snapshot.val();
});

exports.getUsers = function(req, res){
    var ref = db.ref("/users");
    var valor = null;
    ref.once("value", function(snapshot) {
        users = snapshot.val();
    });
};

exports.getvariable = function(){
    return users;
};

exports.getUsuario = function(id, fn){
    var ref = db.ref("/users/" + id);
    ref.once("value", function(snapshot) {
        fn(snapshot.val());
    });
}

exports.getUser = function(id){
    var ref = db.ref("/users/" + id);

};

exports.existsUser = function(id){
    var ref = db.ref("/users/" + id);
    ref.on("value", function(snapshot) {
        console.log(snapshot.exists());
    });
};

exports.addUser = function(id, us, nom, ape, pass){
    var ref = db.ref("/users/" + id);
    ref.on("value", function(snapshot) {
        if(!snapshot.exists()){
            ref.set({
                username: us,
                nombre: nom,
                apellidos: ape,
                contrasena: pass
            });
        }else{
            console.log("el usuario ya existe");
        }
    });
};

exports.delUser = function(id){
    var ref = db.ref("/users/" + id);
    ref.remove();
};

exports.editUsuario = function(id, us, nom, ape, pass){
    var ref = db.ref("/users/" + id);
    ref.on("value", function(snapshot) {
        ref.set({
            username: us,
            nombre: nom,
            apellidos: ape,
            contrasena: pass
        });
    });
};

exports.editPermissions = function(id, perm){
    var tmp = {};
    for(var i = 0; i < perm.length; i++){
        tmp[perm[i]] = "si";
    }

    var ref = db.ref("/users/" + id + "/permisos/");
    ref.on("value", function(snapshot) {
        ref.set(tmp);
    });
};
