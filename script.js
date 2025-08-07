// state variables
let currentNumber = 0;
let previousNumber = 0;
let operator = null;
let pendingInput = false;

// variables
const display = document.getElementById('display').value;
const calculator = document.querySelector('.calculator');

// event listener
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

//function
function handleNumbers(num) {
  
}

function handleActions(action) {
  
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
  