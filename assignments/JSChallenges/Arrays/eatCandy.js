// You just need to implement the eatCandy function
function eatCandy(candyJar) {
    // Remove the last candy from the jar and return the updated jar
    const updatedCandyJar = candyJar.pop();
    return candyJar;
}

console.log(eatCandy(["Lollipop", "Gum", "Chocolate"]));
console.log(eatCandy(["Mint", "Jellybean"]));
console.log(eatCandy(["Toffee"]));
