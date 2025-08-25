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
    this._clearError();

    if (this.justCalculated) {
      this._startFresh(num);
    } else {
      this._appendToExpression(num);
    }
	}

	addDecimal() {
		this._clearError();

		if (!this.getCurrentNum().includes('.')) {
			this._appendToExpression('.')
		}
	}

	addOperator(op) {
    this._clearError();

		if (this.justCalculated) {
      this._startFresh(this.result + op);
		} else if (this.expression === '') {
			this._startFresh(this.memory.ANS + op);
		} else if (this.operators.includes(this.expression.slice(-1))) {
      this.expression = this.expression.slice(0, -1) + op;
      this.cursor = this.expression.length; 
		} else {
      this._appendToExpression(op);
		}
	}

	addConstant(constant) {
    this._clearError();

		if (this.justCalculated) {
      this._startFresh(constant);
		} else {
      this._appendToExpression(constant);
		}
  }
  
  applyFunction(func) {
    this._clearError();
    
    //apply to previous result
    if (this.expression === '' || this.justCalculated) {
      const value = this.result || this.memory.ANS;
      this._startFresh(this._calculateFunction(func, parseFloat(value)).toString());
    } else { //apply to current number
      const currentNum = this.getCurrentNum();
      if (currentNum) {
        const result = this._calculateFunction(func, parseFloat(currentNum));
        const beforeNum = this.expression.substring(0, this.expression.lastIndexOf(currentNum));
        this.expression = beforeNum + result.toString();
      }
		}
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

  _startFresh(newExpression) {
    this.expression = newExpression; 
    this.result = '';
    this.justCalculated = false; 
    this.cursor = this.expression.length; 
  }

  _appendToExpression(text) {
    this.expression += text; 
    this.cursor = this.expression.length; 
  }
}

window.calculatorState = new CalculatorState();