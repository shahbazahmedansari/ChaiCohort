console.log('Global execution context starts');

var globalVariable = "I am global variable";

function globalFunction() {
    console.log("Inside global function");
}

console.log(globalVariable);
globalFunction();

console.log('Global execution context ends');