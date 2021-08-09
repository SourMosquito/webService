//ejemplo de funciones

module.exports = {
    add: (num1, num2) => {
       if(isNaN(num1) || isNaN(num2)) {
           throw new Error("Valores inválidos");
       }
        return num1 + num2;
    },
    sustraction: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos");
        }
        return num1 - num2;
    },
    multiplication: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos");
        }
        return num1 * num2;
    },
    division: (num1, num2) => {
        if(isNaN(num1) || isNaN(num2)) {
            throw new Error("Valores inválidos");
        }
        return num1 / num2;
    },
    sumArray: (num1, num2, num3, num4, num5, num6) => {
        if(isNaN(num1) || isNaN(num2) || isNaN(num3) || isNaN(num4) || isNaN(num5) || isNaN(num6)) {
            throw new Error("Valores inválidos");
        }
        return num1 + num2 + num3 + num4 + num5 + num6
    }
};