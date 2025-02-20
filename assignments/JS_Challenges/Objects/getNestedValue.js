// You just need to implement the getNestedValue function
function getNestedValue(obj, keyPath) {
    // Return the value from the nested object based on keyPath
    let keys = keyPath.split(".");
    let current = obj;

    for (let key of keys) {
        if (current[key] === undefined) {
            return "Key not found";
        }
        current = current[key];
    }

    return current;
}
