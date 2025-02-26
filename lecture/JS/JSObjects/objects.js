const obj1 = {
    fname: "Shahbaz",
    lname: "Ansari",
    getFullName: function () {
        return `${this.fname} ${this.lname}`;
    }
};

const obj2 = {
    fname: "Piyush",
    lname: "Garg",

};

// Prototypes are meant that it is handled by JS internally. Never mess with it
// obj2.__proto__ = obj1;

// Prototype chaining (Prototype inheritance)
// obj1.__proto__.__proto__ = null

console.log(obj1);
console.log(obj1.getFullName());
console.log(obj2);
console.log(obj2.getFullName());
console.log(obj2.toString());