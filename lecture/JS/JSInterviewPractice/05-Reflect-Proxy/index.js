const p1 = {
    fname: "Piyush",
    lname: "Garg",
    age: 18,
};

const p1Proxy = new Proxy(p1, {
    get(target, property) {
        // if (property in target) return target[property];
        if (property in target) return Reflect.get(target, property);
        return false;
    },
    set(target, property, value) {
        if (!(property in target)) {
            throw new Error(`${property} does not exists`);
        }

        switch (property) {
            case 'fname':
            case 'lname':
                if (typeof value !== "string") {
                    throw new Error(`${property} must be a string`);
                }
                break;
            case "age":
                if (typeof value !== "number") {
                    throw new Error(`${property} must be a string`);
                }
                if (value <= 0) {
                    throw new Error(`${property} must be > zero`);
                }
        }
        // Default Behaviour can be handled by Reflect
        Reflect.set(target, property, value);
        // Default Behaviour
        target[property] = value;
    }
});

p1Proxy.age = 100;

console.log(p1Proxy.fname);
console.log(p1Proxy.lname);
console.log(p1Proxy.xyz);