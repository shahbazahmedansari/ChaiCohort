// Problem: Create an object representing a type of tea with properties of name, type, and caffiene content.

const teas = {
    name: "Lemon Tea",
    type: "Green Tea",
    caffiene: "low",
};

// Problem: Access and print the name and type properties of the tea object.

console.log(teas.name);
console.log(teas["type"]);

// Problem: Add a new property origin to the tea object.

teas.origin = "Assam";
console.log(teas);

// Problem: Change the caffiene level of the tea object to "Medium".

teas.caffiene = "Medium";
console.log(teas);

// Problem: Remove the type property from the tea object.

delete teas.type;
console.log(teas);

// Problem: Check if the tea object has a property origin.

console.log(teas.hasOwnProperty("origin"));
console.log("origin" in teas);

// Problem: Use a for...in loop to print all properties of the tea object.

for (const property in teas) {
    console.log(`${property}: ${teas[property]}`);
}

// Problem: Create a nested object representing different types of teas and their properties.

const myTeas = {
    greenTea: {
        name: "Green Tea",
        type: "Green Tea",
    },
    blackTea: {
        name: "Black Tea",
        type: "Black Tea",
    },

};
console.log(myTeas);

// Problem: Create a copy of tea object.

const teaCopy = {
    ...teas
};

console.log(teaCopy);

// Problem: Add a custom method to describe the tea object that returns a description string.



// Problem: Merge two objects representing different teas into one.

let mergedTeas = { ...teas, ...myTeas };
console.log(mergedTeas);
