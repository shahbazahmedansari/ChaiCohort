// I should have a function increment (). On call of function it should increment the number and return the current count.

// Lexical scope in Javascript is a convention that determines how variables are accessible in a block of code.

// In Javascript, a closure is a function that can access to the variables of its outer function, even after the outer function has finished executing.

// A function returning a function with its lexical scope binded is known as Closure function.

// let count = 0;

function increment() {
    let count = 0;

    // Closure function: (Function binded by its lexical scope)
    return function () {
        // this function holds the reference to the count variable even after the increment function has stopped executing
        count++;
        return count;
    };
}

const x = increment();
const y = increment();

console.log(x());
console.log(x());
console.log(y());
console.log(y());
console.log(x());
console.log(y());
console.log(y());
console.log(x());

function createCounter(stepSize = 1, initialValue = 0) {
    return function () {
        initialValue = initialValue + stepSize;
        return initialValue;
    };
}

const i1 = createCounter(1, 0);

console.log(i1());
console.log(i1());
console.log(i1());
console.log(i1());
console.log(i1());


function createDebouncedDelay(fn, delay) {
    let timerId = null;

    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(fn, delay);
    };
}

function apiCall() { }

const apiCallWDebounce = createDebouncedDelay(apiCall, 5 * 1000);
apiCallWDebounce();