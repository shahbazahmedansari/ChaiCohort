// You just need to implement the totalStars function
function totalStars(starLevels) {
    let total = 0;
    for (let i = 0; i < starLevels.length; i++) {
        total += starLevels[i].length;
    }
    return total;
}


console.log(totalStars([["*", "*", "*"], ["*"], ["*", "*"]]));