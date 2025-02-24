function greet(name) {
    console.log(`Hello ${name}`);
}

greet("Hitesh");
greet("Piyush");

let globalVar = "I am global";

function modifyGlobal() {
    globalVar = "I am modified";
    let blockScopedVariable = "I am block scoped";
    console.log(blockScopedVariable);
}

modifyGlobal();

let config = function () {
    let settings = {
        theme: "dark",
    };

    return settings;
}(); // IIFE: Immediately invoked function expression

let person1 = {
    name: "Ravi",
    greet: function () {
        console.log(`Hello ${this.name}`);
    }
};

// this refers to the context of the variable

let person2 = {
    name: "Hitesh",
};

// person1.greet.call(person2);
const bindGreet = person1.greet.bind(person2);
bindGreet();
// console.log(bindGreet());

// call and bind:
// To change/pass the context to original function we use call or bind
// call: Call just calls the function
// bind: Bind returns a new function