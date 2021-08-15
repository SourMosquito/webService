let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp)
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2Mjg5ODU3NjMsImV4cCI6MTYyOTE1ODU2M30.SX7tYSA_BVlP19W0nfYAeLAiQn6NL-YgY6K2KQF6VdE';

describe('Test de menus', () => {
    
    describe('Agregar menú', () => {

        it('Debe crear menú en un establecimiento especifico', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .post(`/establishment/${3}/menu`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: 'Menu de ejemplo'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('menu');
                    done();
                });

            });
        });

        it('Debe rechazar crear menú en un establecimiento especifico con un usuario inválido', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .post(`/establishment/${3}/menu`)
                .set({ 'Authorization':`jwt ${token}A` })
                .send({
                    name: 'Menu de ejemplo'
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });

            });
        });

        it('Debe rechazar crear menú en un establecimiento especifico con un nombre inválido', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .post(`/establishment/${3}/menu`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: '1'
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    expect(res.body).to.have.property('error').to.be.equal(true);
                    done();
                });

            });
        });

    });
    
    describe('Leer menus', () => {

        it('Debe devolver todos los menús del establecimiento especificado', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .get(`/establishment/${3}/menu`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe devolver los menús de un establecimiento que no existe', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .get(`/establishment/${3 * 50}/menu`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe devolver los menús de un establecimiento de un usuario invalido', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .get(`/establishment/${3}/menu`)
                .set({ 'Authorization':`jwt ${token}X` })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });

            });
        });

    });

    describe('Actualizar menú', () => {

        it('Debe actualizar un menú ya existente', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .put(`/establishment/${3}/menu/${19}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: 'Menú de ejemplo actualizado 1'
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe de actualizar el menú con un nombre menor a 3 caracteres', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .put(`/establishment/${3}/menu/${19}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                    name: 'Me'
                })
                .end((err, res) => {
                    expect(res).to.have.status(503);
                    done();
                });

            });
        });

        it('No debe de actualizar el menú sin el campo nombre', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .put(`/establishment/${3}/menu/${19}`)
                .set({ 'Authorization':`jwt ${token}` })
                .send({
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });
    });

    describe('Eliminar menú', () => {

        it('Debe eliminar un menú especifico existente en el establecimiento especificado', (done) => {
    
            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                    
                idEstablecimiento = res.body[res.body.length - 1].id;
    
                chai.request(url)
                .delete(`/establishment/${3}/menu/${33}`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });

            });
        });

        it('No debe de eliminar un menú especifico no existente en el establecimiento especificado', (done) => {
    
            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                    
                idEstablecimiento = res.body[res.body.length - 1].id;
    
                chai.request(url)
                .delete(`/establishment/${3}/menu/${33}`)
                .set({ 'Authorization':`jwt ${token}` })
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error').to.be.equal(true);
                    expect(res.body).to.have.property('message').to.be.equal('No se encontro el menú.')
                    done();
                });

            });
        });

        it('No debe de eliminar el menú de un establecimiento de un usuario invalido', (done) => {

            chai.request(url)
            .get('/establishment')
            .set({ 'Authorization':`jwt ${token}` })
            .end((err, res) => {
                
                idEstablecimiento = res.body[res.body.length - 1].id;

                chai.request(url)
                .delete(`/establishment/${3}/menu/${34}`)
                .set({ 'Authorization':`jwt ${token}X` })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    done();
                });

            });
        });

    });
    
});