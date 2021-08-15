let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:5000';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJlbWFpbCI6InRhbmlhLm1hcnRpbmV6QGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlciJ9LCJpYXQiOjE2Mjg2NTk0MjcsImV4cCI6MTYyODgzMjIyN30.VLBJa2fLPE_LsAv-MF4Tx7G75qb7Vx8Hp5tzVcResSY';


describe('Test de establisment', () => {
    describe('Agregar establisment', () => {
        
        it('Debe crear establecimiento', (done) => {
            chai.request(url)
            .post('/establishment') 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Nuevo establecimiento 2',
                description: 'Creando establecimiento para prueba',
                address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('establishment');  
                done();
            })
        });
    
        
       
        it('Debe rechazar crear establecimiento cuando el token sea inválido', (done) => {
            chai.request(url)
            .post('/establishment') 
            .set({ 'Authorization': `jwt ${token}x` })
            .send({
                name: 'Nuevo establecimiento',
                description: 'Creando establecimiento para prueba',
                address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                expect(res).to.have.status(401); 
                done();
            })
        });
    

        it('Debe rechazar crear establecimiento sin dirección', (done) => {
            chai.request(url)
            .post('/establishment') 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Nuevo establecimiento 2',
                description: 'Creando establecimiento para prueba',
                //address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                expect(res).to.have.status(503);
                expect(res.body).to.have.property('error').to.be.equal(true);
                done();
            })
        });


    });
    describe("Leer establecimientos", () => {
        let idEstablisment = 0;
        it("Debe devolver los establecimientos", (done) => {
            chai.request(url)
            .get('/establishment') 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                if(res.body.length > 0) {
                    idEstablisment = res.body[0].id;
                }
                expect(res).to.have.status(200)
                done();
            });
        });
    

        it("Debe devolver establecimiento de un usuario", (done) => {
            chai.request(url)
            .get(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200)
                expect(res.body).to.have.property('name');
                done();
            });
        });
    
    

        it("No debe devolver datos de establecimiento que no son de un usuario", (done) => {
            chai.request(url)
            .get(`/establishment/${idEstablisment * 50}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.have.property('error').to.be.equal(true);
                expect(res.body).to.have.property('message').to.be.equal('No se encontró el establecimiento.');
                done();
            });
        });
    });
    describe("Actualizar establecimiento", () => {
        let idEstablisment = 2;
        it("Debe actualizar un establecimiento", (done) => {
            chai.request(url)
            .put(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Nuevo establecimiento actualizado',
                description: 'Creando establecimiento para prueba',
                address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
        });

        it("Debe rechazar actualizar un establecimiento si el token es inválido", (done) => {
            chai.request(url)
            .put(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}x` })
            .send({
                name: 'Nuevo establecimiento actualizado',
                description: 'Creando establecimiento para prueba',
                address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                    expect(res).to.have.status(401); 
                    done();
            });
        });

    

        it("Debe rechazar actualizar un establecimiento si no corresponde al id", (done) => {
            chai.request(url)
            .put(`/establishment/${idEstablisment + 3}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
                name: 'Nuevo establecimiento actualizado g',
                description: 'Creando establecimiento para prueba',
                address: '#456 Calle del bosque',
                phoneNumber: '2431235789',
                available: true,
            })
            .end((err, res) => {
                expect(res).to.have.status(404)
                expect(res.body).to.have.property('error').to.be.equal(true);
                expect(res.body).to.have.property('message').to.be.equal('No se encontró el establecimiento.');
                done();
            });
            
        });
    

        it("No debe actualizar establecimiento con campos nulos", (done) => {
            chai.request(url)
            .put(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .send({
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    });

    describe("Eliminar establecimiento", () => {
        let idEstablisment = 5;

        it('No debe eliminar establecimiento si no tiene permisos', (done) => {
            chai.request(url)
            .delete(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(403);
                done();
            })
        });
        
        it('Debe eliminar establecimiento', (done) => {
            chai.request(url)
            .delete(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
        
       
        it('No debe eliminar establecimiento si no existe', (done) => {
            chai.request(url)
            .delete(`/establishment/${idEstablisment}`) 
            .set({ 'Authorization': `jwt ${token}` })
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.have.property('error').to.be.equal(true);
                expect(res.body).to.have.property('message').to.be.equal('No se encontró el establecimiento.');
                done();
            });
        });
    
    });

});
