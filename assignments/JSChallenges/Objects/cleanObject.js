// You just need to implement the cleanObject function
function cleanObject(obj) {
    // Remove all properties with null or undefined values
    let cleanObj = {};

    for (let key in obj) {
        if (obj[key] !== undefined && obj[key] !== null) {
            cleanObj[key] = obj[key];
        }
    }

    return cleanObj;
}
