var mongoose = require ('mongoose');
var Figura = require('../../models/figuras')

describe('Testing Figuras', function() {
    beforeEach(function(done) {
        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error de conexion'))
        db.once('open', function() {
            console.log("Estamos conectados a la base de datos de testeo")
            done();
        })
    });
    
    afterEach(function(done) {
        Figura.deleteMany({}, function(err, success){
            if (err) console.log(err);
            done();
        })
    })

    describe('Figura.createInstance', () => {
        it('Crea instancia de figura', () => {
            var fig = Figura.createInstance(1,"Marvel", "Azul", 2300)
            
            expect(fig.code).toBe(1);
            expect(fig.marca).toBe("Marvel")
            expect(fig.color).toBe("Azul")
            expect(fig.precio).toBe(2300)
        })
    })

    describe('Figura.allFigs', () => {
        it("Comienza vacia", (done) => {
            Figura.allFigs(function(err, figs){
                expect(figs.length).toBe(0);
                done();
            })
        })
    })

    describe('Figura.add', () => {
        it('Agrega una figura', (done) => {
            var aFig = new Figura({code:1, marca:"Marvel", color:"azul", precio:2200})
            Figura.add(aFig, function(err, newFig){
                if (err) console.log(err);
                Figura.allFigs(function(err, figs){
                    expect(figs.length).toEqual(1);
                    expect(figs[0].code).toEqual(aFig.code);

                    done();
                })
            })
        })
    })


    describe('Figura.findByCode', () => {
        it('Debolver la fig con code 1', (done) => {
            Figura.allFigs(function(err,figs){
                expect(figs.length).toBe(0);

                var aFig = new Figura({code:1, marca:"Marvel", color:"Azul", precio:2200})
                Figura.add(aFig, function(err, newFig) {
                    if (err) console.log(err);

                    var aFig2 = new Figura({code:2, marca:"DC Comics", color:"Amazul", precio:2100})
                    Figura.add(aFig2, function(err, newFig){
                        if (err) console.log(err);
                        Figura.findByCode(1, function (error, targetFig){
                            expect(targetFig.code).toBe(aFig.code);
                            expect(targetFig.marca).toBe(aFig.marca);
                            expect(targetFig.color).toBe(aFig.color);
                            expect(targetFig.precio).toBe(aFig.precio);

                            done()
                        })
                    })
                })
            })
        })
    })


})

/*
beforeEach(() => {Figura.allFigs=[]}); 

describe('Figura.allFigs', () => {
    it('comienza vacio', () => {
        expect(Figura.allFigs.length).toBe(0);
    })
})

describe('Figura.add', () =>{
    it('agregar una', () => {
        expect(Figura.allFigs.length).toBe(0);

        var Fig1 = new Figura(1, 'Marvel', 'Rojo', '1200')
        Figura.add(Fig1)

        expect(Figura.allFigs.length).toBe(1);
        expect(Figura.allFigs[0]).toBe(Fig1);
    })
})

describe('Figura.findById', () => {
    it('debe devolver la figura con la id 1', () =>{
        expect(Figura.allFigs.length).toBe(0);
        var aFig = new Figura(1, "Marvel", "Azul", "1200")
        var aFig2 = new Figura(2, "DC Comics", "Verde", "3000")
        Figura.add(aFig)
        Figura.add(aFig2)

        var targetFig = Figura.findById(1);
        expect(targetFig.id).toBe(1);
        expect(targetFig.marca).toBe(aFig.marca);
        expect(targetFig.color).toBe(aFig.color);
        expect(targetFig.precio).toBe(aFig.precio);
    })
})

describe('Figura.removeById', () => {
    it('debe eliminar la figura con la id 1', () =>{
        expect(Figura.allFigs.length).toBe(0);
        var aFig = new Figura(1, "Hot Toys", "Rojo", "1234")
        Figura.add(aFig)
        expect(Figura.allFigs.length).toBe(1)

        Figura.removeById(1);
        expect(Figura.allFigs.length).toBe(0)
    })
})

*/