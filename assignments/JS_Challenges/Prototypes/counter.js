// You need to implement the Counter constructor function and its prototype methods

function Counter() {
    // Initialize count property
    this.count = 0;
}

// Define increment method on Counter's prototype
Counter.prototype.increment = function () {
    return this.count++;
};

// Define decrement method on Counter's prototype
Counter.prototype.decrement = function () {
    return this.count--;
};
