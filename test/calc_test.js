var assert = require('assert');
const calc = require('../samples/calc');

describe("Calculadora", () => {
    //se describen los casos de prueba
    before(() => {
        console.log("Probando las funciones calculadora");
    });

    after(() => {
        console.log("Fin del test de calculadora");
    });

    describe("Escenarios de Sumar", () => {
        it("Debe retornar 5 cuando: 3 + 2", () =>{
            assert.equal(calc.add(3, 2), 5);
        });

        it("Debe retornar 0 cuando: 0 + 0", () =>{
            assert.equal(calc.add(0, 0), 0);
        });

        it("Debe retornar Error cuando: 5 + 'hola'", () => {
            assert.throws(
                function() {
                    calc.add(5, 'hola');
                },
                {
                    name: "Error",
                    message: "Valores inválidos"
                }
            );
        });
    });

    describe("Función restar", () => {
        it("Debe retornar 2 cuando: 5 - 3", () => {
            assert.equal(calc.sustraction(5, 3), 2);
        });

        it("Debe retornar -10 cuando: 10 - 20", () => {
            assert.equal(calc.sustraction(10, 20), -10);
        });
        
        it("Debe retornar Error cuando: 'abc' - 8", () => {
            assert.throws(
                function() {
                    calc.sustraction('abc', 8);
                },
                {
                    name: "Error",
                    message: "Valores inválidos"
                }
            );
        });
    });

    describe("Escenarios de Multiplicar", () => {
        it("Debe retornar 15 cuando: 5 * 3", () => {
            assert.equal(calc.multiplication(5, 3), 15);
        });

        it("Debe retornar 0 cuando: 0 * 0", () => {
            assert.equal(calc.multiplication(0, 0), 0);
        });

        it("Debe retornar Error cuando: 8 * 'bgh'", () => {
            assert.throws(
                function() {
                    calc.multiplication(8, 'bgh');
                },
                {
                    name: "Error",
                    message: "Valores inválidos"
                }
            );
        });
    });
    
    describe("Escenarios de Dividir", () => {
        it("Debe retornar 5 cuando: 15 / 3", () => {
            assert.equal(calc.division(15, 3), 5);
        });

        it("Debe retornar 0 cuando: 0 / 50", () => {
            assert.equal(calc.division(0, 50), 0);
        });

        it("Debe retornar Error cuando: '50' / 0", () => {
            assert.throws(
                function(){
                    calc.division(50, 0);
                },
                {
                    name: "Error",
                    message: "División por cero"
                }
            );
        });
        it("Debe retornar Error cuando: 'efg' / 0", () => {
            assert.throws(
                function(){
                    calc.division('efg', 0);
                },
                {
                    name: "Error",
                    message: "Valores inválidos"
                }
            );
        });
    });

    describe("Escenarios de Sumar Arreglo", () => {
        it("Debe retornar 21 cuando: [1, 2, 3, 4, 5, 6]", () => {
            assert.equal(calc.sumArray([1, 2, 3, 4, 5, 6]), 21);
        });

        it("Debe retornar Error cuando: [2, 6, 1, 'hola']", () => {
            assert.throws(
                function(){
                    calc.sumArray([2, 6, 1, 'hola']);
                },
                {
                    name: "Error",
                    message: "Valores inválidos"
                }
            );
        });

    });

});