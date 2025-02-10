const person = {
    x: 10,
    firstName: "Shahbaz",
    lastName: "Ansari",
    getFullName: () => {
        return `${person.firstName} ${person.lastName}`;
    },
    isMarried: false,
    hobbies: ["Coding", "Gym", "Gaming"],
    address: {
        hno: 1,
        street: 1,
        countryCode: "IN",
        state: "MH",
    }
};


console.log(person);
console.log(person.x);
console.log(person.getFullName());
console.log(person.firstName);
console.log(person.lastName);
console.log(person.isMarried);
console.log(person.hobbies);
console.log(person.address);
console.log(person.address.state);


const remote = {
    color: "black",
    brand: "xyz",
    dimensions: {
        height: 20,
        width: 10,
        depth: 5,
    },
    turnOff: () => {
        return "Turn Off";
    }
};


let p1 = {
    fname: "Hitesh",
    lname: "Ch",
    address: {
        h: 1,
        s: 1,
    }
};

let p2 = {
    ...p1, // Spread Operator
    address: {
        ...p1.address,
    }
};

const p1KaString = JSON.stringify(p1);
console.log(p1KaString);

let newp2 = JSON.parse(p1KaString);
console.log(newp2);

p2.fname = 'Piyush';
p2.lname = "Garg";

console.log(p2);
console.log(p1);