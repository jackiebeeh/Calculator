// JavaScript for the Calculator project

// Query Selectors:
let previousOperandElement = 
    document.querySelector("[data-previous-operand]");
let currentOperandElement = 
    document.querySelector("[data-current-operand]");
let allClearButton = 
    document.querySelector("[data-all-clear]");
let deleteButton = 
    document.querySelector("[data-delete]");
let equalsButton = 
    document.querySelector("[data-equals]");
let numberButtons = document.querySelectorAll("[data-number]");
let operatorButtons = document.querySelectorAll("[data-operator]");

// Calculator:
class Calculator {
    constructor(
        previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.allClear();
    }
    allClear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operator = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) {
            return;
        } 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperator(operator) {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "") {
            this.calculate();
        }
        this.operator = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    calculate() { 
        let calculation;
        const a = +(this.previousOperand);
        const b = +(this.currentOperand);
        if (isNaN(a) || isNaN(b)) return;
        switch (this.operator) {
            case "-" : calculation = a - b; break;
            case "+" : calculation = a + b; break;
            case  "*" : calculation = a * b; break;
            case "/" : calculation = a / b; break;
            case "**" : calculation = a ** b; break;
            default: return;
        }
        this.currentOperand = calculation;
        this.operator = undefined;
        this.previousOperand = "";
    }
    updateDisplay() {
        this.currentOperandElement.innerText = 
        this.getDisplayNumber(this.currentOperand);
        if (this.operator != null) {
            this.previousOperandElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`;
        } else {
            this.previousOperandElement.innerText = "";
        }
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        console.log(typeof(decimalDigits));
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
    updateOperator() {
        this.currentOperand = this.previousOperand;
        this.previousOperand = "";
    }
}
const calculator = 
    new Calculator(previousOperandElement, currentOperandElement);
// Event Listeners:
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        let previous = previousOperandElement.innerText;
        let lastChar = previous.charAt(previous.length -1);
        if (isNaN(lastChar) && currentOperandElement.innerText === "") {
            calculator.updateOperator();
            calculator.updateDisplay();
        }
        calculator.chooseOperator(button.getAttribute("value"));
        calculator.updateDisplay();
    });
});
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.getAttribute("value"));
        calculator.updateDisplay();
    });
});
allClearButton.addEventListener("click", () => {
    calculator.allClear();
    calculator.updateDisplay();
});
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});
equalsButton.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
});