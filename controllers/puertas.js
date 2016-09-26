var firebase = require('firebase');

// firebase.initializeApp({
//     databaseURL: "https://nfcpruebas-b3738.firebaseio.com/"
// });
var db = firebase.database();

var puertas = null;
var refPuertas = db.ref("/puertas");
refPuertas.once("value", function(snapshot) {
    puertas = snapshot.val();
});

exports.getPuertas = function(req, res){
    var ref = db.ref("/puertas");
    var valor = null;
    ref.once("value", function(snapshot) {
        users = snapshot.val();
    });
};

exports.getvariable = function(){
    return puertas;
};

exports.getPuerta = function(id, fn){
    var ref = db.ref("/puertas/" + id);
    ref.once("value", function(snapshot) {
        fn(snapshot.val());
    });
}

exports.addPuerta = function(id, des, loc){
    var ref = db.ref("/puertas/" + id);
    ref.on("value", function(snapshot) {
        if(!snapshot.exists()){
            ref.set({
                descripcion: des,
                localizacion: loc
            });
        }else{
            console.log("la puerta ya existe");
        }
    });
};

exports.delPuerta = function(id){
    var ref = db.ref("/puertas/" + id);
    ref.remove();
};

exports.editPuerta = function(id, des, loc){
    var ref = db.ref("/puertas/" + id);
    ref.on("value", function(snapshot) {
        ref.set({
            descripcion: des,
            localizacion: loc
        });
    });
};
