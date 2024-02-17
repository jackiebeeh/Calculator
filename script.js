// JavaScript for the Calculator project


// Calculator

let calc = new Calculator 

function Calculator() {
    this.methods = {
        "-" : (a , b) => a - b,
        "+" : (a , b) => a + b,
        "*" : (a, b) => a * b,
        "/" : (a, b) => a / b,
        "**" : (a, b) => a ** b

    }
    this.calculate = function (string) { 
        let split = string.split(" "),
                a = +split[0],
                op = split[1],
                b = +split[2];
        return this.methods[op](a, b);
    }
    this.addMethod = function(operator, does) {
        this.methods[operator] = does;
    }
}


// let powerCalc = new Calculator;
// powerCalc.addMethod("*", (a, b) => a * b);
// powerCalc.addMethod("/", (a, b) => a / b);
// powerCalc.addMethod("**", (a, b) => a ** b);