// You just need to implement the addCarColor function
function addCarColor(car, color) {
    // Add color property to the car object
    if (typeof color !== "string" || color === "") {
        return "Invalid color";
    }

    if (Object.hasOwn(car, "brand") && Object.hasOwn(car, "model")) {
        car.color = color;
        return car;
    }
}

console.log(
    addCarColor(
        {
            brand: "Toyota",
            model: "Corolla",
        },
        "Red"
    )
);
