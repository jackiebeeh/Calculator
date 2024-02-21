// // JavaScript for the Calculator project

// Query Selectors:
const numberButtons = document.querySelectorAll(
    "[data-number]");
const operationButtons = document.querySelectorAll(
    "[data-operation]");
const equalsButton = document.querySelector(
    "[data-equals]");
const deleteButton = document.querySelector(
    "[data-delete]");
const allClearButton = document.querySelector(
    "[data-all-clear]");
const previousOperandTextElement = 
    document.querySelector("[data-previous-operand]");
const currentOperandTextElement = 
    document.querySelector("[data-current-operand]");

// Calculator:
const calculator = new Calculator(
    previousOperandTextElement, currentOperandTextElement);
class Calculator {
    constructor(previousOperandTextElement, 
        currentOperandTextElement) {
        this.previousOperandTextElement = 
        previousOperandTextElement
        this.currentOperandTextElement = 
        currentOperandTextElement
        this.clear();
    }
    clear () {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = 
        this.currentOperand.toString().slice(0, -1);

    }
    appendNumber(number) {
        if (number === "." && 
        this.currentOperand.includes(".")) return;
        this.currentOperand = 
        this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case "+" :
                computation = prev + current;
                break;
            case "-" :
                computation = prev - current;
                break;
            case "*" :
                computation = prev * current;
                break;
            case "/" :
                computation = prev / current;
                break;
            default: 
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString(
                "en", {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }
    
    updateDisplay() {
        this.currentOperandTextElement.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = "";
        }
    }   
}

// Event Listeners:
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => { 
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => { 
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => { 
    calculator.delete();
    calculator.updateDisplay();
});


// *****************************************************
// // Button functions
// let buttons = document.querySelectorAll(".button");
// let input = document.querySelector(".input");
// let submit = document.querySelector(".submit");
// let empty = document.querySelector(".delete");

// for (let button of buttons) {
//     button.addEventListener("click", () => {
//         input.value += button.getAttribute("value");
//         input.focus();
//         console.log(`input value is ${input.value}`);
//     })
// }
// submit.addEventListener("click", () => {
//     input.value = calc.calculate(input.value);
//     input.focus();
//     console.log(`input value is ${input.value}`);
// });
// empty.addEventListener("click", () => {
//     input.value = "";
//     input.focus();
//     console.log(`input value is ${input.value}`);
// });

// // Calculator

// let calc = new Calculator 
// function Calculator() {
//     this.methods = {
//         "-" : (a , b) => a - b,
//         "+" : (a , b) => a + b,
//         "*" : (a, b) => a * b,
//         "/" : (a, b) => a / b,
//         "**" : (a, b) => a ** b
//     }
//     this.calculate = function (string) { 
//         let split = string.split(" "),
//                 a = +split[0],
//                 op = split[1],
//                 b = +split[2];
//         return this.methods[op](a, b);
//     }
//     this.addMethod = function(operator, does) {
//         this.methods[operator] = does;
//     }
// }


