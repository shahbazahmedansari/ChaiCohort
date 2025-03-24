const firstNumber = document.getElementById("number1");
const secondNumber = document.getElementById("number2");
const result = document.getElementById("result");

function calculate(operator) {
    const num1 = parseInt(firstNumber.value);
    const num2 = parseInt(secondNumber.value);

    if (isNaN(num1) || isNaN(num2)) {
        result.innerText = `Please enter a valid number`;
        return;
    }

    switch (operator) {
        case '+': {
            result.innerText = `Sum: ${num1 + num2}`;
        }
            break;
        case '-': {
            result.innerText = `Subtract: ${num1 - num2}`;
        }
            break;
        case '*': {
            result.innerText = `Multiply: ${num1 * num2}`;
        }
            break;
        case '/': {
            if (num2 === 0) {
                result.innerHTML = `Cannot divide by 0`;
            } else {
                result.innerText = `Divide: ${num1 / num2}`;
            }
        }
            break;
        default: {
            result.innerText = `Invalid Operator`;
        }
    }
}