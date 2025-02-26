// You just need to implement the totalPrice function
function totalPrice(prices) {
    let totalAmount = 0;
    for (let i = 0; i < prices.length; i++) {
        totalAmount += prices[i];
    }
    return totalAmount;
}

console.log(totalPrice([1.5, 2.3, 3.7]));
console.log(totalPrice([5, 10, 15]));