class calculatorState {
  constructor() {
    this.expression = ''; // current expression/input
    this.result = ''; // calculated result
    this.showResult = false; //whether to show the result or the expression
    this.error = null; // current error state
    this.cursor = 0; // cursor position
  }
}