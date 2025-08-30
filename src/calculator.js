
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
				break;
			case 'exp':
				this.state.addConstant('e');
				break;
			case 'ln':
				this.state.applyFunction('ln');
				break;
			case 'log':
				this.state.applyFunction('log');
				break;
			case 'sin':
				this.state.applyFunction('sin');
				break;
			case 'cos':
				this.state.applyFunction('cos');
				break;
			case 'tan':
				this.state.applyFunction('tan');
				break;
      case 'reciprocal':
        this.state.applyFunction('reciprocal');
        break;
      case 'abs':
        this.state.applyFunction('abs');
        break;
      case 'clear-memory':
        this.state.clearMemory();
        break; 
      case 'percent':
        this.state.applyFunction('percent');
        break;
      case 'cube':
        this.state.applyFunction('cube');
        break;
      case 'cuberoot':
        this, state, applyFunction('cuberoot');
        break;
      case 'floor':
        this.state.applyFunction('floor');
        break;
      case 'random':
        this.state.addConstant(Math.random().toString());
        break;
      case 'clear':
        this.state.clearAll();
        break; 
      case 'factorial':
        this.state.applyFunction('factorial');
        break;
			default:
				console.log('Action not implemented', action);
		}
    this.display.update();
  }
}

document.addEventListener('DOMContentLoaded', () => {
	window.calculator = new Calculator();
});