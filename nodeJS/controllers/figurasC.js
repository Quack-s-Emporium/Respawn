var Figura = require('../models/figuras');

exports.figura_list = function(req, res){
    res.render('figuras/index', {figs: Figura.allFigs})
}

exports.figuras_create_get = function(req, res){
    res.render('figuras/create');
}

exports.figuras_create_post = function(req, res){
    var newfig = new Figura(req.body.id, req.body.marca, req.body.color, req.body.precio)
    Figura.add(newfig);

    res.redirect('/figuras');
}

exports.figuras_update_get = function(req, res){
    var fig = Figura.findById(req.params.id)
    res.render('figuras/update', {fig});
}

exports.figuras_update_post = function(req, res){
    var fig = Figura.findById(req.params.id)
    fig.id= req.body.id;
    fig.marca= req.body.marca;
    fig.color= req.body.color;
    fig.precio= req.body.precio;
    
    res.redirect('/figuras');
}

exports.figuras_delete_post = function(req,res){
    Figura.removeById(req.body.id)
    
    res.redirect('/figuras')
}
