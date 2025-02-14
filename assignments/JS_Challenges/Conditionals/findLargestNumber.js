// You just need to implement the findLargest function
function findLargest(a, b, c) {
    // Return the largest among a, b, and c
    if (a >= b && a >= c) {
        return a;
    } else if (b >= c && b >= a) {
        return b;
    } else {
        return c;
    }
}

console.log(findLargest(10, 20, 15));
console.log(findLargest(50, 30, 40));
console.log(findLargest(5, 3, 4));