var mongoose = require ('mongoose');
var Figura = require('../../models/figuras')
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva')

describe('Testing Usuarios', function() {
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


    afterEach(function(done){
        Reserva.deleteMany({}, function(err, success){
            if(err) console.log(err);
        
            Usuario.deleteMany({}, function(err, success){
                if(err) console.log(err);

                Figura.deleteMany({}, function(err, success){
                    if (err) console.log(err);
                    done();
                })
            });

                    
        })
    })


    describe('Cuando un Usuario reserva una figura', () => {
        it ('debe existir la reserva', (done) => {
            const usuario = new Usuario({nombre: 'Antonio'})
            usuario.save()
            const figura = new Figura({code: 1, marca: 'Marvel', color: 'azul' , precio: 1200})
            figura.save()

            var hoy = new Date()
            var mañana = new Date()
            mañana.setDate(hoy.getDate()+1);
            usuario.reservar(figura.id, hoy, mañana, function(err, reserva){
                Reserva.find({}).populate('figura').populate('usuario').exec(function(err, reservas){
                    console.log(reservas[0]);
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasDeReserva()).toBe(2);
                    expect(reservas[0].figura.code).toBe(1);
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done(); 
                })
            })
        })
    })



});