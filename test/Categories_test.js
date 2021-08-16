let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2MjkwNjY5MjYsImV4cCI6MTYyOTIzOTcyNn0.dARkAVguFSJv45xeDhVhc51GQrH22WFC3dGC3ZFkB28";

describe('Test de categorías', () => {
    
    describe('Agregar categoría', () => {
        
        it('Debe crear una categoría', (done) => {
            
            chai.request(url)
            .get('/menu')
            .set({ 'Authorization': `jwt ${token}`})
            .end((err, res) => {

                let idMenu = 1;
                //idMenu = res.body[res.body.length - 1].idMenu;

                chai.request(url)
                .post(`/menu/${idMenu}/category`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    name: "Categoria de prueba",
                    description: "Encuentre las mejores comidas",
                    active: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('category');  
                    done();
                });
            });
        });
        
        it('No debe dejar crear una categoría si un campo es nulo', (done) => {
                
            let idMenu = 4;

                chai.request(url)
                .post(`/menu/${idMenu}/category`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    name: "",
                    description: "Encuentre las mejores comidas",
                    active: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);  
                    done();
                });
            
        })

        it('No debe dejar crear una categoría si no cumple con el mínimo de carácteres', (done) => {
                
            let idMenu = 4;

                chai.request(url)
                .post(`/menu/${idMenu}/category`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    name: "Ab",
                    description: "Encuentre las mejores comidas",
                    active: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);  
                    done();
                });
            
        })
        it('No debe dejar crear una categoría si el tipo de dato no corresponde', (done) => {
                
                let idMenu = 4;

                chai.request(url)
                .post(`/menu/${idMenu}/category`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    name: false,
                    description: "Encuentre las mejores comidas",
                    active: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);  
                    done();
                });
           
        })
    });

    describe("Leer categorías", () => {
        let IdCategoria = 0;
        let idMenu = 2;
        it("Debe devolver las categorías", (done) => {
            chai.request(url)
            .get(`/menu/${idMenu}/category`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                if(res.body.length > 0) {
                    IdCategoria = res.body[0].id;
                }
                expect(res).to.have.status(200);
                done();
            });
        });

        it("No debe devolver datos de una categoría que no pertenecen a un menu", (done) => {
            chai.request(url)
            .get(`/menu/${idMenu * 55}/category`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200)
                done();
            });
        });

        it("Debe rechazar leer las categorías si sus credenciales son inválidas", (done) => {
            chai.request(url)
            .get(`/menu/${idMenu}/category`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        });
    });
     
    describe('Actualizar categorías', () => {
        let idMenu = 1;
        let idCategoria = 103;
        
        it("Debe actualizar una categoría", (done) => {
            chai.request(url)
            .put(`/menu/${idMenu}/category/${idCategoria}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                    name: "Categoria de prueba actualizada",
                    description: "Encuentre las mejores comidas",
                    active: true
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        
        it('Debe rechazar actualizar una categoría si un campo esta vacio', (done) => {
            chai.request(url)
            .put(`/menu/${idMenu}/category/${idCategoria}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                    name: "",
                    description: "Encuentre las mejores comidas",
                    active: true
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error').to.be.equal(true);
                done();
            })
        });

        it('Debe rechazar actualizar una categoría si no corresponde al id', (done) => {
            chai.request(url)
            .put(`/menu/${idMenu}/category/${idCategoria * 200}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                    name: "Categoria de prueba actualizada",
                    description: "Encuentre las mejores comidas",
                    active: true
            })
            .end((err, res) => {
                expect(res).to.have.status(404)
                done();
            })
        });


    });
    
    describe("Eliminar categoría", () => {
        let idMenu = 1;
        let idCategoria = 108;

        it("Debe rechazar eliminar las categorías si sus credenciales son inválidas", (done) => {
            chai.request(url)
            .delete(`/menu/${idMenu}/category/${idCategoria}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        }); 
        
        it('Debe eliminar una categoría', (done) => {
            chai.request(url)
            .delete(`/menu/${idMenu}/category/${idCategoria}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });


        it('No debe eliminar una categoría si no existe', (done) => {
            chai.request(url)
            .delete(`/menu/${idMenu}/category/${idCategoria}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error').to.be.equal(true);
                expect(res.body).to.have.property('message').to.be.equal('No se encontro la categoría.');
                done();
            });
        });

    });

});


