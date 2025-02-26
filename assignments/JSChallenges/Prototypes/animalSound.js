// You need to implement the Animal constructor function and its prototype method

function Animal(name) {
    // Initialize name property
    this.name = name;
}

// class Animal {
//     constructor(name) {
//         this.name = name;
//     }
// }

// Define makeSound method on Animal's prototype
Animal.prototype.makeSound = function () {
    return "Some generic sound";
};

const animal = new Animal("Leo");
console.log(animal);
console.log(JSON.stringify(animal.makeSound()));
