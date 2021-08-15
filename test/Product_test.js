let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2MjkwNjY5MjYsImV4cCI6MTYyOTIzOTcyNn0.dARkAVguFSJv45xeDhVhc51GQrH22WFC3dGC3ZFkB28";

describe("Test de productos", () => {
    
    describe("Agregar producto", () => {

        it('Debe crear un producto', (done) => {
           let idCategory = 8;
                chai.request(url)
                .post(`/category/${idCategory}/product`)
                .set({ 'Authorization': `jwt ${token}`})
                .send({ 
                    name: "Producto de prueba",
                    description: "Ejemplo de producto",
                    price: 44,
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('product');  
                    done();
                
            });

        });

        it('No debe dejar crear un producto si un dato se envia un campo', (done) => {
                
            let idCategory = 8;

                chai.request(url)
                .post(`/category/${idCategory}/product`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    //name: false,
                     description: "Ejemplo de producto",
                    price: 44,
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    done();
                });
            
        })

        it('No debe dejar crear un producto si la ruta no es la correcta', (done) => {
                
            let idCategory = 8;

                chai.request(url)
                .post(`/category/${idCategory}/productd`)
                .set({ 'Authorization': `jwt ${token}` })
                .send({
                    name: "Ejemplo",
                     description: "Ejemplo de producto",
                    price: 44,
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    done();
                });
            
        })
    });

    
    describe("Lee productos", () => {
        let idCategory = 2;

        it('Debe devolver todos los productos de la categoría especifica', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .get(`/category/${idCategory}/product`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe devolver los productos de una categoría que no existe', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .get(`/category/${idCategory * 200}/product`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe devolver los productos de una categoría de un usuario invalido', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .get(`/category/${idCategory}/product`)
                .set({ 'Authorization':`jwt ${token}A` })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });

            });
        });
    });

    describe("Actualizar producto", () => {

        it('Debe actualizar un producto ya existente', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .put(`/category/${3}/product/${12}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: "Producto actualizado",
                    description: "Descripción actualizada",
                    price: 120,
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
            });
        });

        it('No debe actualizar los datos de un producto que contenga caracteres invalidos en el precio', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .put(`/category/${3}/product/${12}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: "Producto actualizado",
                    description: "Descripción actualizada",
                    price: "Caro",
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);
                    done();
                });
            });
        });

        it('No debe actualizar los datos de un producto que no tenga nombre (campo vacio)', (done) => {

            chai.request(url)
            .get('/category')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {

                chai.request(url)
                .put(`/category/${3}/product/${12}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: "",
                    description: "Descripción actualizada",
                    price: "85.5",
                    available: true
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);
                    done();
                });
            });
        });
    });
    
    describe("Eliminar producto", () =>{
        let idCategory = 8;
        let idProduct = 10;

        it("Debe rechazar eliminar un producto si sus credenciales son inválidas", (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/product/${idProduct}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        }); 

        it("Debe rechazar eliminar un producto si la ruta es incorrecta", (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/productd/${idProduct}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        }); 

        it('Debe eliminar un producto', (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/product/${idProduct}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        

    });
    
});