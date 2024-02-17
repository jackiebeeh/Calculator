// JavaScript for the Calculator project

let buttons = document.querySelectorAll(".button");
let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
submit.addEventListener("click", () => {
    input.value = calc.calculate(input.value);
    input.focus();
});

let empty = document.querySelector(".delete");

empty.addEventListener("click", () => {
    input.value = "";
    input.focus();
});



for (let button of buttons) {
    button.addEventListener("click", () => {
        input.value += button.getAttribute("value");
        input.focus();
    })
}

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
        let split = string.split(""),
                a = +split[0],
                op = split[1],
                b = +split[2];
        return this.methods[op](a, b);
    }
    this.addMethod = function(operator, does) {
        this.methods[operator] = does;
    }
}

// console.log(calc.calculate());


// let powerCalc = new Calculator;
// powerCalc.addMethod("*", (a, b) => a * b);
// powerCalc.addMethod("/", (a, b) => a / b);
// powerCalc.addMethod("**", (a, b) => a ** b);