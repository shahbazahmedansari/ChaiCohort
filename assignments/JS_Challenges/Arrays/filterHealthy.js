// You just need to implement the filterHealthy function
function filterHealthy(foodList) {
    // Remove unhealthy food and return updated list
    const filteredFoodList = foodList.filter((el) => !el.toLowerCase().includes("burger"));
    return filteredFoodList;
}

console.log(filterHealthy(["Salad", "Burger", "Apple", "Pizza", "Banana"]));
console.log(filterHealthy(["Burger", "Fries", "Salad"]));
console.log(filterHealthy(["Tomato", "Carrot", "Burger"]));