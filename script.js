let currentNumber = '0';
let previousNumber = null;
let operator = null;
let pendingInput = false;

const displayResult = document.getElementById('display-result');
const displayOperation = document.getElementById('display-operation');
const calculator = document.querySelector('.calculator');

function updateDisplay() {
	displayResult.textContent = currentNumber;

	if (previousNumber && operator) {
		displayOperation.textContent = `${previousNumber} ${getOperatorSymbol(
			operator
		)}`;
	} else {
		displayOperation.textContent = '';
	}
}

function getOperatorSymbol(op) {
	switch (op) {
		case 'add':
			return '+';
		case 'subtract':
			return '−';
		case 'multiply':
			return '×';
		case 'divide':
			return '÷';
		default:
			return '';
	}
}

function calculate(num1, num2, op) {
	const n1 = parseFloat(num1);
	const n2 = parseFloat(num2);

	switch (op) {
		case 'add':
			return n1 + n2;
		case 'subtract':
			return n1 - n2;
		case 'multiply':
			return n1 * n2;
		case 'divide':
			return n2 !== 0 ? n1 / n2 : 'ERROR';
	}
}

function handleNumbers(num) {
	if (pendingInput || currentNumber === '0') {
		currentNumber = num;
		pendingInput = false;
	} else {
		currentNumber += num;
	}
	updateDisplay();
}

function handleActions(action) {
	switch (action) {
		case 'clear':
			currentNumber = '0';
			previousNumber = null;
			operator = null;
			pendingInput = false;
			break;

		case 'decimal':
			if (!currentNumber.includes('.')) {
				currentNumber += '.';
			}
			break;

		case 'equals':
			if (operator && previousNumber !== null) {
				const result = calculate(previousNumber, currentNumber, operator);
				currentNumber = result.toString();
			}
			operator = null;
			previousNumber = null;
			pendingInput = true;
			break;

		case 'add':
		case 'subtract':
		case 'multiply':
		case 'divide':
			if (operator && previousNumber !== null && !pendingInput) {
				const result = calculate(previousNumber, currentNumber, operator);
				currentNumber = result.toString();
			}
			previousNumber = currentNumber;
			operator = action;
			pendingInput = true;
			break;
	}
	updateDisplay();
}

calculator.addEventListener('click', function (event) {
	const button = event.target;
	if (button.matches('button')) {
		if (button.dataset.number) {
			handleNumbers(button.dataset.number);
		} else if (button.dataset.action) {
			handleActions(button.dataset.action);
		}
	}
});

updateDisplay();
