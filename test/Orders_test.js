let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp)
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2Mjg5ODU3NjMsImV4cCI6MTYyOTE1ODU2M30.SX7tYSA_BVlP19W0nfYAeLAiQn6NL-YgY6K2KQF6VdE';

describe('Test de Orders', () => {
    
    describe('Agregar orden', () => {
       
        it('Debe crear un nueva pedido', (done) => {
            chai.request(url)
            .post('/order')
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: 'Pedido de ejemplo',
                total: '134.50',
                paymentMethod: 'Efectivo'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('order');
                done();
            })
        });

        it('Debe rechazar la creación del pedido (el número total solo acepta números enteros o decimales)', (done) => {
            chai.request(url)
            .post('/order')
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: 'Pedido de ejemplo',
                total: 'Barato',
                paymentMethod: 'Efectivo'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error').to.be.equal(true);
                done();
            })
        });

        it('Debe rechazar la creación del pedido (el nombre no puede quedar vacio)', (done) => {
            chai.request(url)
            .post('/order')
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: '',
                total: '340.9',
                paymentMethod: 'Efectivo'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error').to.be.equal(true);
                done();
            })
        });
    });
    
    describe('Leer ordenes', () => {
        let idOrden = 0;
        
        it('Debe devolver todas los pedidos de un usuario', (done) => {
            chai.request(url)
            .get('/order')
            .set({ 'Authorization' : `jwt ${token}` })
            .end((err, res) => {
                if(res.body.length > 0) {
                    idOrden = res.body[0].id;
                }
                expect(res).to.have.status(200);
                done();
            });
        });
        
        it('Debe devolver los datos de un pedido del usuario', (done) => {
            chai.request(url)
            .get(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('name')
                done();
            });
        });

        it('No se debe devolver los datos de un pedido que no es del usuario o no existe', (done) => {
            chai.request(url)
            .get(`/order/${idOrden * 200}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error').to.be.equal(true);
                expect(res.body).to.have.property('message').to.be.equal('No se encontro el pedido.')
                done();
            });
        });
    });

    describe('Actualizar pedido', () => {
        let idOrden = 10;
    
        it('Debe actualizar los datos del pedidos de un usuario', (done) => {
            chai.request(url)
            .put(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: 'Pedido actualizado 1',
                total: '340.9',
                paymentMethod: 'Efectivo'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });

        it('No debe actualizar los datos del pedidos de un usuario cuando el total contiene caracteres incorrectos', (done) => {
            chai.request(url)
            .put(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: 'Pedido actualizado 2',
                total: 'NaN',
                paymentMethod: 'Efectivo'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                done();
            });
        });

        it('No debe actualizar los datos del pedidos de un usuario cuando tiene un nombre invalido', (done) => {
            chai.request(url)
            .put(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .send({
                name: 'A',
                total: '129.20',
                paymentMethod: 'Tarjeta de credito'
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                done();
            });
        });
    }); 

    describe('Eliminar pedido', () => {
        let idOrden = 7;
        
        it('Debe eliminar el pedido que se espefico de un usuario', (done) => {
            chai.request(url)
            .delete(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        
        it('No debe eliminar el pedido que se espefico de un usuario invalido', (done) => {
            chai.request(url)
            .delete(`/order/${idOrden}`)
            .set({ 'Authorization' : `jwt ${token}A` })
            .end((err, res) => {
                expect(res).to.have.status(401);
                done();
            });
        });

        it('No debe eliminar el pedido que se espefico de un usuario con un id invalido', (done) => {
            chai.request(url)
            .delete(`/order/AOA`)
            .set({ 'Authorization' : `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
        });
    });
});