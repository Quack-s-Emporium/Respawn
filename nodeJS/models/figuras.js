var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var figuraSchema = new Schema({
    code: Number,
    marca: String,
    color: String,
    precio: Number
})

figuraSchema.statics.createInstance = function(code, marca, color, precio){
    return new this({
        code: code,
        marca: marca,
        color: color,
        precio: precio
    })
}

figuraSchema.methods.toString = function() {
    return 'code: ' + this.code + "| marca: " + this.marca;
}

figuraSchema.statics.allFigs = function(cb){
    return this.find({}, cb);
}

figuraSchema.statics.add = function(aFig, cb){
    this.create(aFig, cb);
}

figuraSchema.statics.findByCode = function(aCode, cb){
    return this.findOne({code: aCode}, cb);
}

figuraSchema.statics.removeByCode = function(aCode, cb){
    return this.deleteOne({code: aCode}, cb);
}

module.exports = mongoose.model('Figura', figuraSchema)

/*
var Figura = function(id, marca, color, precio) {
    this.id = id;
    this.marca = marca;
    this.color = color;
    this.precio = precio;
}

Figura.prototype.toString = function () {
    return 'id' + this.id + "| marca: " + this.marca;
}

Figura.allFigs = [];
Figura.add = function(aFig){
Figura.allFigs.push(aFig);
}

Figura.findById = function(aFigId){
    var aFig = Figura.allFigs.find(x => x.id == aFigId);
    if(aFig){
        return aFig;
    }else{
        throw new Error(`No existe una figura con el id ${aFigId}`);
    }
}

Figura.removeById = function(aFigId){
    for(var i = 0; i < Figura.allFigs.length; i++){
        if (Figura.allFigs[i].id == aFigId){
            Figura.allFigs.splice(i,1);
            break;
        }
    }
}


var Fig1 = new Figura(1, 'Marvel', 'Rojo', '1200')
var Fig2 = new Figura(2, 'DC Comics', 'Azul', '900')


Figura.add(Fig1);
Figura.add(Fig2);


module.exports = Figura;
*/