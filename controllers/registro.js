var firebase = require('firebase');

// firebase.initializeApp({
//     databaseURL: "https://nfcpruebas-b3738.firebaseio.com/"
// });
var db = firebase.database();

var logs = null;
var refLogs = db.ref("/logs");
refLogs.once("value", function(snapshot) {
    logs = snapshot.val();
});

exports.getLogs = function(req, res){
    var ref = db.ref("/intentos");
    var valor = null;
    ref.once("value", function(snapshot) {
        logs = snapshot.val();
    });
};

exports.getvariable = function(){
    return logs;
};
