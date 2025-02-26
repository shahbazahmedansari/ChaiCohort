// Problem: Create an array containing different types of teas.
const teas = ["green tea", "black tea", "lemon tea", "oolong tea", "white tea", "herbal tea"];
console.log(teas);

// Problem: Add "Chamomile Tea" to the existing list of teas.

teas.push("chamomile tea");
console.log(teas);

// Problem: Remove "Oolong Tea" from the list of teas.

const index = teas.indexOf("oolong tea");
console.log(index);
if (index > -1) {
    teas.splice(index, 1);
}

console.log(teas);

// Problem: Filter the list to only include teas that are caffeinated.

const caffeinatedTeas = teas.filter(t => t !== "herbal tea");
console.log(caffeinatedTeas);

// Problem: Sort the list of teas in alphabetical order.

const sortedList = teas.sort();
console.log(sortedList);

const test = ["🐓", "🥚", "🐣"];
console.log(test.sort());

// Problem: Use a for loop to print each type of tea in the array.

for (let i = 0; i < teas.length; i++) {
    console.log(teas[i]);
}

// Problem: Use a for loop to count how many teas are caffeinated (excludign "herbal tea").

let caffeinatedTea = 0;
for (let i = 0; i < teas.length; i++) {
    if (teas[i] !== "herbal tea") {
        caffeinatedTea++;
    }
}

console.log(caffeinatedTea);

// Problem: Use a for loop to create a new array with all the tea names in uppercase.

const uppercaseTeas = [];
for (let i = 0; i < teas.length; i++) {
    uppercaseTeas.push(teas[i].toUpperCase());
}
console.log(uppercaseTeas);

// Problem: Use a for loop to find the tea name with the most characters.

let longestTea = "";

for (let i = 0; i < teas.length; i++) {
    if (teas[i].length > longestTea.length) {
        longestTea = teas[i];
    }
}
console.log(longestTea);

// Problem: Use a for loop to reverse the order of teas in the array.

let reversedArray = [];
for (let i = teas.length - 1; i >= 0; i--) {
    reversedArray.push(teas[i]);
}
console.log(reversedArray);