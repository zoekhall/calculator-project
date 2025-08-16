class calculatorState {
	constructor() {
		this.expression = ''; // current expression/input
		this.result = ''; // calculated result
		this.error = null; // current error state
    this.cursor = 0; // cursor position
    this.operators = ['+', '-', 'x', '/'];

		// TI-30X IIS specific features
		this.memory = { A: 0, B: 0, C: 0, D: 0, E: 0, ANS: 0 }; // 5 memory variables + ANS
		this.history = []; // Previous entries (up/down arrows)
		this.historyIndex = -1; // Current position in history
		this.angleMode = 'DEG'; // DEG, RAD, GRAD
		this.displayMode = 'FLO'; // FLO, SCI, ENG, FIX0-FIX9
		this.constantMode = false; // K constant operations
		this.constantOperation = ''; // Stored constant operation
	}

	//determine what should be displayed
	getDisplayState() {
		if (this.error) {
			return { top: '', bottom: this.error };
		} else {
			return { top: this.expression || '', bottom: this.result || '0' };
		}
  }

  getCurrentNumber() {
    
  }
  
  addDigit(digit) {
    if (this.error) {
			this.error = null;
		}
    this.expression += digit; //add digit to expression string
    this.cursor = this.expression.length; 
  }
}
