// Normal Function - camelCasing
// e.g.: getAge(), printThis(), addSum()

// Constructor Function: PascalCasing

// function Person(fname, lname, contact) {
//     this.fname = fname;
//     this.lanme = lname;
//     this.contact = contact;

//     this.getName = function () {
//         console.log(this.fname, this.lname);
//     };

//     this.getContact = function () {
//         console.log(this.contact);
//     };
// }

class Person {
    constructor(fname, lname, contact) {
        this.fname = fname;
        this.lname = lname;
        this.contact = contact;
    }

    getName() {
        console.log(this.fname, this.lname);
    }

    getContact() {
        console.log(this.contact);
    }

}

const person1 = new Person('Piyush', 'Garg', '9999999999');
const p2 = new Person('John', 'Doe', '8888888888');
const p3 = new Person('Jane', 'Doe', '7777777777');
console.log(person1);
console.log(p2);
console.log(p3);
p2.getName();
p3.getName();
person1.getContact();

// const person = {
//     fname: "Piyush",
//     lname: "Garg",
//     contact: "999999999",
//     getName: () => {
//         console.log(`${fname} ${lname}`);
//     }
// };

// console.log(person);
// console.log(person.getName());

// const p2 = {
//     fname: "John",
//     lname: "Doe",
//     contact: "8888888888",
//     getName: () => {
//         console.log(`${fname} ${lname}`);
//     }
// };

// console.log(p2);
// console.log(p2.getName());

