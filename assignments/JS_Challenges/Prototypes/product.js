// You need to implement the Product constructor function and its prototype methods

function Product(name, price, stock) {
    // Initialize name, price, and stock properties
    this.name = name;
    this.price = price;
    this.stock = stock;
}

// Define applyDiscount method on Product's prototype
Product.prototype.applyDiscount = function (percent) {
    this.price = Math.round(this.price - this.price * (percent / 100));
};

// Define purchase method on Product's prototype
Product.prototype.purchase = function (quantity) {
    if (this.stock >= quantity) {
        this.stock -= quantity;
        return this.stock;
    }

    return "Not enough stock";
};
