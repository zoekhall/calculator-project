
class Calculator {
  constructor() {
    this.state = window.calculatorState;
    this.display = window.displayManager; 
    this.setupEventListeners()
    this.display.update(); 
  }
}