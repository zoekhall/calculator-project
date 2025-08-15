class calculatorState {
  constructor() {
    this.expression = ''; // current expression/input
    this.result = ''; // calculated result
    this.showResult = false; //whether to show the result or the expression
    this.error = null; // current error state
    this.cursor = 0; // cursor position
  }

  //determine what should be displayed
  getDisplayState() {
    if (this.error) return { top: '', bottom: this.error };
    if (this.showResult) return { top: this.expression, bottom: this.result };
    return { top: this.getTopLineExp(), bottom: this.getCurrentEntry() || 0 };
    
  }

  getTopLineExp() {
    if (!this.result) return ''
    if (/[+\-×÷]$/.test(this.expression)) return this.expression;
  }
}