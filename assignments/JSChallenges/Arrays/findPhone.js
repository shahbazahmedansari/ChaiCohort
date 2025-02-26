// You just need to implement the findPhone function
function findPhone(items) {
    // Return the index of "Phone" in the items array
    const index = items.findIndex(el => el.includes("Phone"));
    return index;
}

console.log(findPhone(["Wallet", "Keys", "Phone", "Glasses"]));
console.log(findPhone(["Bag", "Shoes", "Hat", "Phone"]));
console.log(findPhone(["Phone", "Notebook", "Pen"]));