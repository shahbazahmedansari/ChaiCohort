if (!Array.prototype.myForEach) {
    Array.prototype.myForEach = function (cb) {
        for (let i = 0; i < this.length; i++) {
            cb(this[i], i);
        }
    };
}

const arr = [1, 2, 3, 4, 5];
arr.myForEach((value, index) => {
    console.log(`Value: ${value} at index: ${index}`);
});

if (!Array.prototype.myMap) {
    Array.prototype.myMap = function (cb) {
        let mappedArr = [];
        for (let i = 0; i < this.length; i++) {
            const value = cb(this[i], i);
            mappedArr.push(value);
        }
        return mappedArr;
    };
}

const res = arr.myMap(e => e * 2);
const res2 = arr.myMap(e => e * 3);
console.log(res);
console.log(res2);

if (!Array.prototype.myReduce) {
    Array.prototype.myReduce = function (cb, initialValue = undefined) {

        let acc = initialValue || this[0];
        let startIndex = initialValue ? 0 : 1;

        for (let i = startIndex; i < this.length; i++) {
            acc = cb(acc, this[i]);
        }

        return acc;

    };
}

const result = arr.myReduce((acc, currentIndex) => {
    return acc + currentIndex;
}, 12);
console.log(result);