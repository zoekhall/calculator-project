class CalculatorState {
	constructor() {
		this.expression = ''; // current expression/input
		this.result = ''; // calculated result
		this.error = null; // current error state
		this.cursor = 0; // cursor position
		this.operators = ['+', '-', '×', '÷'];

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
		} else if (this.expression && this.result) {
			return { top: this.expression, bottom: this.result };
		} else {
			return { top: '', bottom: this.expression || '0' }; 
		}
	}

	getCurrentNum() {
		const lastOpIndex = Math.max(
			...this.operators.map((op) => this.expression.lastIndexOf(op))
		);
		return this.expression.substring(lastOpIndex + 1);
	}

	addNum(num) {
		if (this.error) {
			this.error = null;
		} else if (this.result && this.expression) {
			this.expression = num;
			this.result = '';
		} else {
			this.expression += num; //add num to expression string
		}
		this.cursor = this.expression.length;
	}

	addDecimal() {
		if (this.error) {
			this.error = null;
		}

		if (!this.getCurrentNum().includes('.')) {
			this.expression += '.';
			this.cursor = this.expression.length;
		}
	}

	addOperator(op) {
		if (this.error) {
			this.error = null;
		}

		if (this.expression === '') {
			this.expression = this.memory.ANS + op; //if exp is empty, start with previous result (ANS)
		} else if (this.operators.includes(this.expression.slice(-1))) {
			this.expression = this.expression.slice(0, -1) + op; //replace last op with new op
		} else {
			this.expression += op;
		}

		this.cursor = this.expression.length;
	}

	calculate() {
		if (this.error || this.expression === '') {
			return;
		}

		const mathExp = this.expression.replace(/×/g, '*').replace(/÷/g, '/');
		let result;

		try {
			const tokens = window.expressionParser.tokenize(this.expression);
			const result = window.expressionParser.evaluate(tokens);
    
      
      if (!isFinite(result)) {
        this.error = 'MATH ERROR';
        return;
      }
      
      this.result = result.toString(); //revert result back to a string
      this.memory.ANS = result; //assign result to memory
    
    } catch (error) {
      this.error = 'SYNTAX ERROR';
      return;
    }
  }

	clear() {
		this.expression = '';
		this.result = '';
		this.error = null;
		this.cursor = 0;
		this.historyIndex = -1;
	}
}

window.calculatorState = new CalculatorState();