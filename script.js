// state variables
let currentNumber = '0';
let previousNumber = null;
let operator = null;
let pendingInput = false;

//Get DOM elements
const display = document.getElementById('display');
const calculator = document.querySelector('.calculator');

//Helper functions
function updateDisplay() {
  display.value = currentNumber;
}

function calculate(strNum1, strNum2, operator) {
  num1 = parseFloat(strNum1);
  num2 = parseFloat(strNum2);

  switch (operator) {
    case 'add':
      return (num1 + num2).toString();
  }
}

//Button 'click' event listener
calculator.addEventListener('click', function (event) {
  const button = event.target;
  if(button.matches('button')){
    if (button.dataset.number) {
			handleNumbers(button.dataset.number);
		} else if (button.dataset.action) {
			handleActions(button.dataset.action);
		}
  }
    
});

// handle number buttons
function handleNumbers(num) {
  if (pendingInput || currentNumber === '0') {
    currentNumber = num;
    pendingInput = false;
  } else {
    currentNumber += num; 
  }
  updateDisplay()
}



function handleActions(action) {
  switch (action) {
    case 'clear': //reset clear
      currentNumber = '0';
      previousNumber = null;
      operator = null;
      pendingInput = false;
      break;
    case 'decimal': //add decimal if one not already used
      if (!currentNumber.includes('.')) {
        currentNumber += '.';
      }
      break;
    // case 'equals':
    //   if (operator && previousNumber !== null) {

    //   }
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      previousNumber = currentNumber;
      operator = action;
      pendingInput = true;
      break;
  }
}




/* 
ON button click - 
  if click data-number
    if currentNumber = 0 or data-number = 0, add to current number
    if currentNumber is a number > 0, append to current number
  if click data-action
    if action = decimal
      if decimal already exists in currentNumber - don't add
      else append decimal to current number 
    if action = 'enter'
      do the math
      display the result
    if action is an operator 
      store current number as previous number
      store which operation they want 
      clear display for next number input
*/
  

//how to handle action 
  //operator
  //equals
  //clear
  