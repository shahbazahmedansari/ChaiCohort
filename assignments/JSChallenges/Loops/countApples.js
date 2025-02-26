// You just need to implement the countApples function
function countApples(apples) {
    let appleCount = 0;
    for (let i = 0; i < apples; i++) {
        appleCount++;
    }
    return appleCount;
}

console.log(countApples(5));
console.log(countApples(3));