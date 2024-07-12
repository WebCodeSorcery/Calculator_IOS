const display = document.getElementById('display');
let firstOperand = null;
let secondOperand = null;
let currentOperator = null;
let shouldResetDisplay = false;

function clearDisplay() {
    display.textContent = '0';
    firstOperand = null;
    secondOperand = null;
    currentOperator = null;
}

function inputDigit(digit) {
    if (shouldResetDisplay) {
        display.textContent = digit;
        shouldResetDisplay = false;
    } else {
        display.textContent = display.textContent === '0' ? digit : display.textContent + digit;
    }
}

function inputDecimal() {
    if (shouldResetDisplay) {
        display.textContent = '0.';
        shouldResetDisplay = false;
    } else if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function handleOperator(operator) {
    if (currentOperator && !shouldResetDisplay) {
        secondOperand = parseFloat(display.textContent);
        display.textContent = calculate(firstOperand, secondOperand, currentOperator);
    }
    firstOperand = parseFloat(display.textContent);
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case 'add':
            return firstOperand + secondOperand;
        case 'subtract':
            return firstOperand - secondOperand;
        case 'multiply':
            return firstOperand * secondOperand;
        case 'divide':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function handleEquals() {
    if (currentOperator) {
        secondOperand = parseFloat(display.textContent);
        display.textContent = calculate(firstOperand, secondOperand, currentOperator);
        currentOperator = null;
    }
}

function handlePlusMinus() {
    display.textContent = display.textContent.startsWith('-') ? display.textContent.slice(1) : '-' + display.textContent;
}

function handlePercent() {
    display.textContent = (parseFloat(display.textContent) / 100).toString();
}

document.querySelectorAll('.number').forEach(button =>
    button.addEventListener('click', () => inputDigit(button.id))
);

document.querySelectorAll('.operator').forEach(button =>
    button.addEventListener('click', () => handleOperator(button.id))
);

document.getElementById('decimal').addEventListener('click', inputDecimal);
document.getElementById('clear').addEventListener('click', clearDisplay);
document.getElementById('equals').addEventListener('click', handleEquals);
document.getElementById('plus-minus').addEventListener('click', handlePlusMinus);
document.getElementById('percent').addEventListener('click', handlePercent);