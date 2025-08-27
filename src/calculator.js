
class Calculator {
  constructor() {
    this.state = window.calculatorState;
    this.display = window.displayManager; 
    this.setupEventListeners()
    this.display.update(); 
  }

  setupEventListeners() {
    document.querySelector('.calculator').addEventListener('click', (event) => {
      const button = event.target; 
      if (!button.matches('button')) return; //only handle button clicks

      const number = button.dataset.number; 
      const action = button.dataset.action; 

      if (number !== undefined) {
        this.handleNumber(number);
      } else if (action) {
        this.handleAction(action);
      }
    })
  }

  handleNumber(num) {
    this.state.addNum(num);
    this.display.update();
  }

  handleAction(action) {
    switch (action) {
      case 'clear':
        this.state.clear();
        break;
      case 'decimal':
        this.state.addDecimal();
        break;
      case 'add':
        this.state.addOperator('+');
        break;
      case 'subtract':
        this.state.addOperator('-');
        break;
      case 'divide':
        this.state.addOperator('÷');
        break;
      case 'multiply':
        this.state.addOperator('×');
        break;
      case 'equals':
        this.state.calculate();
        break;
      case 'pi':
        this.state.addConstant('π');
        break;
      case 'sqrt':
        this.state.applyFunction('sqrt');
        break;
      case 'square':
        this.state.applyFunction('square');
        break;
      case 'paren-open':
        this.state.addOperator('(');
        break;
      case 'paren-close':
        this.state.addOperator(')');
        break;
      case 'negative':
        this.state.addOperator('-');
      default:
        console.log('Action not implemented', action);
    }
    this.display.update();
  }
}

document.addEventListener('DOMContentLoaded', () => {
	window.calculator = new Calculator();
});