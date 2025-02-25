// const obj = {
//     personsName: "Mukul",
//     greet: function () {
//         console.log(`Hello ${this.personsName}`);
//     }
// };


// console.log("Hello from JS");

// const a = 1;
// const b = 2;
// console.log('SUM', a + b);

// setTimeout(obj.greet, 2 * 1000);
// console.log('Bye Bye');

const obj = {
    personName: "Akash",
    greet: function () {
        console.log(`Hello ${this.personName}`);
    }
};

console.log('Hi');

// setTimeout(obj.greet, 2 * 1000); // context of this fades/gets deleted in first call stack so after event //loop pushes from callback queue to call stack the function does not remember the context of this and hence we need to use bind in order to bind the context of this to the function call.

setTimeout(obj.greet.bind(obj), 0);

Promise.resolve().then(() => {
    console.log("1.Promise is resolved");

    Promise.resolve().then(() => {
        console.log("2.Promise is resolved");

        Promise.resolve().then(() => {
            console.log("3.Promise is resolved");

            Promise.resolve().then(() => {
                console.log("4.Promise is resolved");
            });
        });
    });
});


console.log('Bye');