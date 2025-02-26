// You just need to implement the totalWater function
function totalWater(waterAmounts) {
    let totalAmountOfWater = 0;
    for (let i = 0; i < waterAmounts.length; i++) {
        totalAmountOfWater += waterAmounts[i];
    }
    return totalAmountOfWater;
}

console.log(totalWater([1, 2, 3, 4]));