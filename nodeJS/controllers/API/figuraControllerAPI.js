var Figura = require('../../models/figuras')

exports.figura_list = function(req,res) {
    res.status(200).json({
        figuras: Figura.allFigs
    })
}

exports.figura_create = function(req,res){
    var fig = new Figura(req.body.id, req.body.marca, req.body.color, req.body.precio)

    Figura.add(fig);

    res.status(200).json({
        figura: fig
    });
}


exports.figura_delete = function(req,res) {
    Figura.removeById(req.body.id);
    res.status(204).send();
}

exports.figura_update = function(req,res) {
    var fig = Figura.findById(req.body.id)
    fig.id = req.body.id
    fig.marca = req.body.marca
    fig.color = req.body.color
    fig.precio = req.body.precio

    res.status(200).json({
        figura: fig
    })
}