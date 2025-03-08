// In JS everything is an object

// const person = {
//     fname: "Piyush",
//     lname: "Garg",
//     getFullName: () => {
//         return `${this.fname} ${this.lname}`;
//     }
// };

// const p2 = {
//     fname: "John",
//     lname: "Doe",
//     getFullName: () => {
//         return `${this.fname} ${this.lname}`;
//     }
// };

// const p2 = Object.create(person); // New object created which has properties inherited from person object.

// const p2 = {
// __proto__: p1, hence we can access properties of person from p2
// }

// console.log(person.fname);
// console.log(person.lname);
// console.log(person.getFullName());

// console.log(person);
// console.log(p2.fname);
// console.log(p2.lname);

// p2.__proto__.fname = "Hack";
// console.log(person);
// console.log(p2.fname);


const p1 = {
    xp1: "I am inside p1 object",
};

const p2 = {
    xp2: "I am inside p2 object",
    __proto__: p1,
};

const p3 = {
    xp3: "I am inside p3 object",
    __proto__: p2,
};

// __proto__ of Object class is null

class Student {
    constructor() {
        this.fname = "Piyush";
    }

    getFullName() {
        return `I am inside getFullName`;
    }
}

const s1 = new Student();

const s2 = { __proto__: Student.prototype };

console.log(s2.getFullName());

// __proto__ of created Object points towards prototype of the base class