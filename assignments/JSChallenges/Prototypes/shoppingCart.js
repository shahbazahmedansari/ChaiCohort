// You need to implement the ShoppingCart constructor function and its prototype methods

function ShoppingCart() {
    // Initialize items property
    this.items = [];
}

// Define addItem method on ShoppingCart's prototype
ShoppingCart.prototype.addItem = function (price) {
    this.items.push(price);
};

// Define getTotalPrice method on ShoppingCart's prototype
ShoppingCart.prototype.getTotalPrice = function () {
    let totalPrice = 0;
    for (let i = 0; i < this.items.length; i++) {
        totalPrice += this.items[i];
    }
    return totalPrice;
};

const shoppingCart = new ShoppingCart();
// const prices = [10, 20, 30];
const prices = [5, 10, 15, 20, 25];
for (let price of prices) {
    shoppingCart.addItem(price);
}
console.log(shoppingCart.getTotalPrice());
