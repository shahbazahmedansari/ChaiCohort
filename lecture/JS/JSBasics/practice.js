Function.prototype.describe = function () {
    console.log(`Function name is ${this.name}`); // function name is printed
};

function greet(name) {
    return `Hello ${name}`;
}

greet.describe(); // output => Function name is greet


function add(a, b) {
    return a + b;
}

const substract = function (a, b) {
    return a - b;
};

const multiply = (a, b) => {
    return a * b;
};


// First-Class Function:
function applyOperation(a, b, operation) {
    return operation(a, b);
}

const result = applyOperation(5, 4, (x, y) => x / y);


// Closure:
function creatCounter() {
    let count = 0;
    return function () {
        count++;
        return count;
    };
}

function onef() {
    let myName = "hitesh";
}

console.log(myName);

// IIFE: Immediately invoked function expression
(function () {
    console.log("hitesh");
})();

