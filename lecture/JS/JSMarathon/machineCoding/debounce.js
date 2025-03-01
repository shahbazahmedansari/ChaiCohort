// Debounce: bounce off when it is called again before the delay is completed.

function ptaNhi(fn, delay) {
    let myId;
    return function (...args) {
        clearTimeout(myId);
        myId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

function greet(name) {
    console.log(`Hello ${name}`);
}

const sachMeinPtaNahi = ptaNhi(() => greet("Hitesh"), 3000); // call karna hai with callback expression
sachMeinPtaNahi();
sachMeinPtaNahi();
sachMeinPtaNahi();

// ptaNhi(greet("Hitesh"), 3000);    //direct call kar rhe hai

// remove past request => keep a reference of it
// fire a new request
// userRequest() => debouncedUserRequest()
