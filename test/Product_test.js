let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2MjkwMDA1NjgsImV4cCI6MTYyOTE3MzM2OH0.ZNYHdt7p_JMYVJAgDwBP4S8TPGyN8oOyFOqqB0OGapM";

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


    describe("Eliminar producto", () =>{
        let idCategory = 8;
        let IdProduct = 10;

        it("Debe rechazar eliminar un producto si sus credenciales son inválidas", (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/product/${IdProduct}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        }); 

        it("Debe rechazar eliminar un producto si la ruta es incorrecta", (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/productd/${IdProduct}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        }); 

        it('Debe eliminar un producto', (done) => {
            chai.request(url)
            .delete(`/category/${idCategory}/product/${IdProduct}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        

    });
})