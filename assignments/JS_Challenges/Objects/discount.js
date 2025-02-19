// You just need to implement the hasDiscount function
function hasDiscount(product) {
    // Check if product has discount property
    if (Object.hasOwn(product, "discount")) {
        return true;
    } else {
        return false;
    }
}
