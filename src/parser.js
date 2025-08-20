class ExpressionParser {
  tokenize(expression) { //split expression
    const tokens = [];
    let currentNumber = '';

    for (let i = 0; i < expression.length; i++){
      const char = expression[i];

      if ('0123456789.'.includes(char)) {
        currentNumber += char; //building the number
      } else if ('+-×÷'.includes(char)) {
				if (currentNumber) {
					//if currentNumber is truthy
					tokens.push(currentNumber); //push it as a token
					currentNumber = ''; //reset number
				}
				tokens.push(char); //then push the operator
			}
    }

    if (currentNumber) {
      tokens.push(currentNumber); //add final number
    }

    return tokens;
  }

  // evaluate(tokens) {
  //   if (tokens.length === 1) return parseFloat(tokens[0]);
  
  //   let current = [...tokens];

  //   while (current.includes('×') || current.includes('÷')) {
  //     for (let i = 0; i < cu)
  //   }
  
  // }
}

window.expressionParser = new ExpressionParser();