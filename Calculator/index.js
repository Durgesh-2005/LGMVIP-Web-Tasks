const display = document.getElementById('display');

function addNumber(number) {
    const currentNumber = display.value;
    display.value = currentNumber + number;
}

function addOperator(operator) {
    const currentNumber = display.value;
    display.value = currentNumber + operator;
}

function clearDisplay() {
    display.value = '';
}

function calculate() {
    const currentExpression = display.value;
    try {
        const result = eval(currentExpression);
        display.value = result;
    } catch (error) {
        display.value = 'Error';
    }
}

// Event listener for key presses
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (/[0-9+\-*/=a-z]/.test(key)) {
        event.preventDefault(); // Prevents default key behavior

        if (key === '=') {
            calculate();
        } else if (key === 'Backspace') {
            const currentExpression = display.value;
            display.value = currentExpression.slice(0, -1);
        } else if (key === 'c' || /[a-z]/.test(key)) {
            clearDisplay();
        } else {
            display.value += key;
        }
    }
});
