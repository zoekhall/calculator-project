class CalculatorState {
	constructor() {
		this.expression = ''; // current expression/input
		this.result = ''; // calculated result
		this.error = null; // current error state
		this.cursor = 0; // cursor position
		this.operators = ['+', '-', '×', '÷'];
		this.justCalculated = false;
		// TI-30X IIS specific features
		this.memory = { A: 0, B: 0, C: 0, D: 0, E: 0, ANS: 0 }; // 5 memory variables + ANS
		this.history = []; // Previous entries (up/down arrows)
		this.historyIndex = -1; // Current position in history
		this.angleMode = 'DEG'; // DEG, RAD, GRAD
		this.displayMode = 'FLO'; // FLO, SCI, ENG, FIX0-FIX9
		this.constantMode = false; // K constant operations
		this.constantOperation = ''; // Stored constant operation
	}

/* ------------------------- DISPLAY/STATE QUERIES ------------------------ */
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

/* ------------------------------ INPUT METHODS ----------------------------- */
	addNum(num) {
		if (this.error) {
			this.error = null;
		} else if (this.justCalculated) {
			this.expression = num;
			this.result = '';
			this.justCalculated = false;
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

		if (this.justCalculated) {
			this.expression = this.result + op; //if exp is empty, start with previous result (ANS)
			this.justCalculated = false;
		} else if (this.expression === '') {
			this.expression = this.memory.ANS + op;
		} else if (this.operators.includes(this.expression.slice(-1))) {
			this.expression = this.expression.slice(0, -1) + op; //replace last op with new op
		} else {
			this.expression += op;
		}

		this.cursor = this.expression.length;
	}

	addConstant(constant) {
		if (this.error) {
			this.error = null;
		}

		if (this.justCalculated) {
			this.expression = constant;
			this.result = '';
			this.justCalculated = false;
		} else {
			this.expression += constant;
		}

		this.cursor = this.expression.length;
	}

/* ------------------------------- CALCULATING ------------------------------ */
	calculate() {
		if (this.error || this.expression === '') {
			return;
		}

		try {
			const tokens = window.expressionParser.tokenize(this.expression);
			const result = window.expressionParser.evaluate(tokens);

			if (!isFinite(result)) {
				this.error = 'MATH ERROR';
				return;
			}

			this.result = result.toString();
			this.memory.ANS = result;
			this.justCalculated = true;
		} catch (error) {
			this.error = 'SYNTAX ERROR';
		}
	}

	clear() {
		this.expression = '';
		this.result = '';
		this.error = null;
		this.cursor = 0;
		this.historyIndex = -1;
  }
  
  /* ----------------------------- PRIVATE HELPERS ---------------------------- */
  _clearError() {
    if (this.error) {
      this.error = null;
    }
  }
}

window.calculatorState = new CalculatorState();