let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

describe("Registro y autenticación de usuarios", () => {

    describe("Registro de usuario", () =>{
        
        it("Debe registrar nuevo usuario", (done) =>{
            chai.request(url)
            .post('/users')
            .send({
                name: "Wanda",
                lastname: "Fernandez",
                email: "FerWA@gmail.com",
                password: "1234",
            })
            .end(function(err, res) {
                //console.log(res);
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('user');
                expect(res.body).to.have.property('message');
                done();
            });
        });
        
       
        it("Debe rechazar el registro de usuario existente", (done) => {
            chai.request(url)
            .post('/users')
            .send({
                name: "Laura",
                lastname: "Escobar",
                email: "laura66@gmail.com",
                password: "1234",
            })
            .end( function(err, res) {
                //console.log(res);
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error');
                expect(res.body).to.have.property('message');
                done();
            });
        });
    });
    
    describe("Autenticar usuario", () => {
        it("Debe autenticar un usuario", (done) => {
                chai.request(url)
                .post('/login')
                .send({
                  email: "tania.martinez@gmail.com",
                  password: "1234",
                })
                .end(function(err, res) {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('user');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
            it("No debe autenticar un usuario con credencial inválida", (done) => {
                    chai.request(url)
                    .post('/login')
                    .send({
                      email: "tania.martinez@gmail.com",
                      password: "1234f",
                    })
                    .end(function(err, res) {
                        expect(res).to.have.status(400)
                        expect(res.body).to.have.property('message');
                        done();
                    });
            });
    
    });
    
});