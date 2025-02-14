// You just need to implement the countBoxes function
function countBoxes(totalBars, barsPerBox) {
    let totalBoxes = 0;
    for (let i = 0; i < totalBars; i++) {
        totalBoxes = totalBars / barsPerBox;
    }
    return Math.floor(totalBoxes);
}

console.log(countBoxes(20, 4));
console.log(countBoxes(17, 5));