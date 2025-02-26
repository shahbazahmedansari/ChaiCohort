// let numberOfGuests = 4;
let numberOfGuests = -1;

let pizzaSize;
// small <=2
// medium <= 5
// large > 5

if (numberOfGuests <= 2) {
  pizzaSize = "small";
} else if (numberOfGuests <= 5 && numberOfGuests > 2) {
  pizzaSize = "medium";
} else if (numberOfGuests > 5) {
  pizzaSize = "large";
}

console.log(pizzaSize);
