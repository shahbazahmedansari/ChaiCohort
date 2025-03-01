// Sabr karo concept, Bottleneck:

const ptaNhi = (fn, delay) => {
    let myId = null;
    // console.log(parameters);
    return (...args) => {
        // console.log(args);
        if (myId === null) {
            fn(...args);
            myId = setTimeout(() => {
                myId = null;
            }, delay);
        }
    };
};
function greet(name) {
    console.log(`Hello ${name}`);
}

const sahiMeNahiPta = ptaNhi(() => greet("Hitesh"), 3000);
sahiMeNahiPta();
sahiMeNahiPta();
sahiMeNahiPta();

// Only one reuest will be called for same multiple requests
