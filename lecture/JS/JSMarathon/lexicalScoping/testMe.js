function test() {
    let obj = { value: 10 }; // 10 MB
    // return true;
    return function () {
        console.log(obj);
    };
}

// 0 MB
const innerFn = test(); // 10 MB
// 10 MB
innerFn();
innerFn();
// -10 MB (Garbage Collector)
// 0 MB


function createInstance() {
    let store = {
        value: 100,
    }; // 100 MB
    return function () {
        console.log(store);
    };
}

let logger = createInstance();

logger();
logger();
logger();
logger();
logger();

logger = null;