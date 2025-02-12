Object.prototype.chai = function () {
    console.log("Chai");
};

const obj = { x: 1, length: 1 };

obj.chai();

const arr = [1, 2, 3, 4, 5, 6];

if (!Array.prototype.fill) {
    // Fallback - Polyfill funciton - Backup Function
    Array.prototype.fill = function () {

    };
}

arr.fill();

// Error: .forEach function does not exist on arr variable.

// Understand real signature of the function - No return, function input -> value and index
// Calls my function for every value.

if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (userFn) {
        const originalArr = this; // Current Object ki taraf point karta hai

        for (let i = 0; i < originalArr.length; i++) {
            userFn(originalArr[i], i);
        }
    };
}

const ret = arr.myForEach(function (value, index) {
    console.log(`Value at index ${index} is ${value}`);
});

console.log(`Ret is`, ret);

// Signature: returns a new array, iterates over each element, iterates according to userFn and returns the new modified array.

if (!Array.prototype.myMap) {
    Array.prototype.myMap = function (userFn) {
        const result = [];

        for (let i = 0; i < this.length; i++) {
            const newValue = userFn(this[i], i);
            result.push(newValue);
        }

        return result;
    };
}

const arr2 = [1, 2, 3, 4, 5, 6];

const n = arr2.map((e) => e * 2);
const n2 = arr2.myMap((e) => e * 3);
console.log(n);
console.log(n2);

// Signature: returns a new array, iterates over each element, input: userFn, if userFn returns true then it includes curretnValue in newArray.

if (!Array.prototype.myFilter) {
    Array.prototype.myFilter = function (userFn) {
        const result = [];

        for (let i = 0; i < this.length; i++) {
            if (userFn(this[i])) {
                result.push(this[i]);
            }
        }

        return result;
    };
}

const n3 = arr2.filter((e) => e % 2 === 0);
const n4 = arr2.myFilter((e) => e % 2 === 0);
console.log(n3);
console.log(n4);