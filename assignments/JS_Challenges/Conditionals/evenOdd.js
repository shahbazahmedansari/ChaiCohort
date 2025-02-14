// You just need to implement the checkEvenOdd function
function checkEvenOdd(num) {
    // Return "Even" if num is even, otherwise return "Odd"
    if (num % 2 === 0) {
        return "Even";
    } else {
        return "Odd";
    }
}

console.log(checkEvenOdd(4));
console.log(checkEvenOdd(7));
console.log(checkEvenOdd(0));