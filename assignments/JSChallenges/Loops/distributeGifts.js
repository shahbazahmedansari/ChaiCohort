// You just need to implement the distributeGifts function
function distributeGifts(totalGifts, friends) {
    // write your code here
    let giftsGiven = 0;
    for (let i = 0; i < friends; i++) {
        if (totalGifts > 0) {
            giftsGiven++;
            totalGifts--;
        }
    }
    return giftsGiven;
}

console.log(distributeGifts(10, 5));
console.log(distributeGifts(2, 4));
