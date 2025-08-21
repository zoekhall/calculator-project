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

  evaluate(tokens) {
    if (tokens.length <= 1) return parseFloat(tokens[0] || 0);

    let current = [...tokens];

    const calculateResult = (left, op, right) => {
      switch (op) {
        case '×': return left * right;
        case '÷': return right !== 0 ? left / right : Infinity;
        case '+': return left + right;
        case '-': return left - right;
        default:
          console.warn(`Unknown operator: ${op}`);
          return NaN;
      }
    };
    
    const applyOperation = (operators) => {
      for (let i = 0; i < current.length; i += 2) {
        if (operators.includes(current[i])) {
          const left = parseFloat(current[i - 1]);
          const right = parseFloat(current[i + 1]);
          const op = current[i];

          const result = calculateResult(left, op, right);
          current.splice(i - 1, 3, result.toString());
        }
      }
    };

    while (current.includes('×') || current.includes('÷')) {
			applyOperation(['×', '÷']);
		}

		while (current.includes('+') || current.includes('-')) {
			applyOperation(['+', '-']);
    }
    
    return parseFloat(current[0])
  }
}

window.expressionParser = new ExpressionParser();