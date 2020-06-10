var Figura = require('../../nodeJS/models/figuras')
var request = require('request')
var server = require('../../nodeJS/bin/www');

var base_url = "http://localhost:3000/api/figuras";


describe('Figura API', () => {
    describe('GET FIGURAS /', () => {
        it('status 200', () => {
            expect(Figura.allFigs.length).toBe(0)

            var Fig = new Figura(1, "Marvel", "Azul", "1200")
            Figura.add(Fig)

            request.get('http://localhost:3000/api/figuras', function(error, response, body){
                expect(response.statusCode).toBe(200);
            })
        })
    })

    aferEach(function(done){
        Figura.deleteMany({}, function(err, success){
            if (err) console.log(err);
        })
    })


    describe('POST FIGURAS /create', () => {
        it('status 200', (done) => {
            var headers = {'content:type' : 'application/json'};
            var aFig = '{ "id":10, "marca": "Dande", "color":"azul", "precio":"1000" }';
            request.post({
                headers: headers,
                url: 'http://localhost:3000/api/figuras/create',
                body: aFig
            }, function(error, response,body) {
                    expect(response.statusCode).toBe(200);
                    expect(Figura.findById(10).marca).toBe("Dande");
                    done();
                })
        })
    })

})