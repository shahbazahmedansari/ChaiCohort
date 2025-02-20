// You just need to implement the deepClone function
function deepClone(obj) {
    // Return a deep copy of obj
    const stringifiedObj = JSON.stringify(obj);

    const copiedObj = JSON.stringify(stringifiedObj);

    return copiedObj;
}
