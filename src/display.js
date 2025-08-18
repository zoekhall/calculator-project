class DisplayManager {
  constructor() {
    this.topDisplay = document.getElementById('display-operation');
    this.bottomDisplay = document.getElementById('display-result');
  }

  update() {
    const displayState = window.calculatorState.getDisplayState();
    this.topDisplay.textContent = displayState.top;
    this.bottomDisplay.textContent = displayState.bottom;
  }

  
}