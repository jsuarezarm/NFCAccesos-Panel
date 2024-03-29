exports.new = function(req, res){
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render('login', { errors : errors });
};

exports.create = function(req, res){
    var login = req.body.login;
    var password = req.body.password;

    var userController = require('./user_controller.js');
    userController.autenticar(login, password, function(error, user){
        if(error){
            req.session.errors = [{"message": 'Se ha producido un error:' + error}];
            res.redirect('/login');
            return;
        }

        // req.session.user = { id : user.id, username : user.username };
        req.session.user = {username : user};

        res.redirect(req.session.redir.toString()); // Redirección a path anterior a login
    });
};

exports.destroy = function(req, res){
    delete req.session.user;
    // res.redirect(req.session.redir.toString()); // Redirección a path anterior a login
    res.redirect('/');
};

exports.loginRequired = function(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/login');
    }
};
